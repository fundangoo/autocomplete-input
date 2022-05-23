import React, { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import './searchInput.css';

interface SearchInputProps {
  searchTerm: string;
  placeHolder?: string;
  icon?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  autoComplete?: 'on' | 'off';
  spellCheck?: true | false;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  placeHolder,
  icon,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  autoComplete = 'off',
  spellCheck = false,
}) => {
  return (
    <div className="search-input">
      <input
        value={searchTerm}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
      />
      {icon && <img src={`./icons/${icon}.svg`} alt="searchIcon" className="svg-icon no-pointer" />}
    </div>
  );
};

export default SearchInput;
