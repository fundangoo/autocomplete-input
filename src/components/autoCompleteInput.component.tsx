import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { JSONArray } from '../types/json.type';
import { compareInsensitive, includeInsensitive } from '../utils/filter';
import { fetchData } from '../utils/fetch';
import './autoCompleteInput.css';
import SearchInput from './searchInput.component';
import HighlightContent from './highlightContent.component';

interface AutoCompleteInputProps {
  dataSource: string | JSONArray;
  dataKey: string;
  debounceMs?: number;
  placeHolder?: string;
}

type Completion = {
  value: string;
  selected: boolean;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  dataSource,
  dataKey,
  debounceMs = 250,
  placeHolder,
}) => {
  const [search, setSearch] = useState<string>('');
  const [completions, setCompletions] = useState<Array<Completion>>([]);
  const [showCompletions, setShowCompletions] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  const debouncedSearch: string = useDebounce<string>(search, debounceMs);

  const filterData = useCallback(
    async (data: JSONArray, searchTerm: string): Promise<Array<Completion>> => {
      return new Promise((resolve, reject) => {
        try {
          resolve(
            data
              .map((item) => {
                return item[dataKey] as string;
              })
              .filter((outer, idx, self) => self.findIndex((inner) => outer === inner) === idx)
              .filter((item) => includeInsensitive(item, searchTerm))
              .sort((first, second) => compareInsensitive(first, second))
              .map((item) => ({ value: item, selected: false }))
          );
        } catch (error) {
          reject('Error while filtering data.');
        }
      });
    },
    [dataKey]
  );

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      (typeof dataSource === 'string' ? fetchData(dataSource) : Promise.resolve(dataSource))
        .then((data) => filterData(data, debouncedSearch))
        .then((result) => setCompletions(result))
        .catch((error) => {
          console.error(error);
          setCompletions([]);
        });
    } else {
      setCompletions([]);
    }
  }, [dataSource, debouncedSearch, filterData]);

  useEffect(() => {
    setLoading(false);
  }, [completions]);

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView({ block: 'nearest' });
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
    setShowCompletions(!!event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const currentIndex = completions.findIndex((item) => item.selected);
    let nextIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        nextIndex =
          currentIndex === -1 || currentIndex === 0 ? completions.length - 1 : currentIndex - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex === completions.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Enter':
        event.preventDefault();
        const selectedIndex = completions.length === 1 ? 0 : currentIndex;
        if (selectedIndex !== -1) {
          const searchValue = completions[selectedIndex].value;
          setSearch(searchValue ? searchValue : '');
          setShowCompletions(false);
        }
        break;
      default:
        break;
    }
    setCompletions(
      completions.map((completion, idx) => {
        return idx === nextIndex
          ? { ...completion, selected: true }
          : { ...completion, selected: false };
      })
    );
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    setFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (event.relatedTarget?.parentElement !== blurRef.current) {
      setFocus(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setSearch((event as BaseSyntheticEvent).target.textContent);
    setShowCompletions(false);
  };

  return (
    <div className="autocomplete">
      <SearchInput
        searchTerm={search}
        placeHolder={placeHolder ?? `Search by ${dataKey}`}
        icon={loading ? 'spinner' : 'magnifier'}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {focus && showCompletions && completions.length !== 0 && (
        <div className="completions" ref={blurRef}>
          {completions.map((completion, idx) => (
            <div
              key={idx}
              className={`completion${completion.selected ? ' selected' : ''}`}
              onClick={(e) => handleClick(e)}
              ref={completion.selected ? scrollRef : null}
              tabIndex={-1}
            >
              <HighlightContent content={completion.value} highlight={debouncedSearch} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
