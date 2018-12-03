import { findProfiles } from 'api/stitch/profile';
import React, { SFC, useEffect, useState } from 'react';
import Contact from '../Contacts/Contact';

interface SearchResultsProps {
  search: string;
  query: string;
}

const SearchResults: SFC<SearchResultsProps> = ({ search, query }) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(
    () => {
      if (search === 'all') {
        findProfiles(query, { limit: 5 }).then(result => {
          setProfiles(result);
        });
      } else if (search === 'contacts') {
        findProfiles(query, { limit: 30 }).then(result => {
          setProfiles(result);
        });
      }
    },
    [search, query]
  );
  return (
    <div>
      {profiles.map(profile => (
        <Contact key={profile.userId} profile={profile} />
      ))}
    </div>
  );
};

export default SearchResults;
