import React from 'react';
import { normalize } from '../utils/filter';
import './highlightContent.css';

interface HighlightContentProps {
  content: string;
  highlight: string;
}

const HighlightContent: React.FC<HighlightContentProps> = ({ content, highlight }) => {
  let fromIndex = 0;
  return (
    <>
      {normalize(content)
        .split(new RegExp(`(${normalize(highlight)})`, 'g'))
        .filter((part) => part)
        .map((part, idx) => {
          const partLength = part.length;
          const matchingPart = content.substring(fromIndex, fromIndex + partLength);
          fromIndex = fromIndex + partLength;
          return (
            <span
              key={idx}
              className={`${
                normalize(matchingPart) === normalize(highlight) ? 'highlight ' : ''
              }no-pointer no-select`}
            >
              {matchingPart}
            </span>
          );
        })}
    </>
  );
};

export default HighlightContent;
