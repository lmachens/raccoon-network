import React, { SFC } from 'react';

interface SearchResultsProps {
  query: string;
}

const SearchResults: SFC<SearchResultsProps> = ({ query }) => {
  return <div>{query}</div>;
};

export default SearchResults;
