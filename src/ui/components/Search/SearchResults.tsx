import { ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { findGames, IGame } from 'api/games';
import { findProfiles, IUserProfile } from 'api/stitch/profile';
import React, { SFC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Contact from '../Contact';
import Game from '../Game';
import Link from '../Link';
import Loading from '../Loading';

interface ISearchResultsProps extends RouteComponentProps<{}> {
  search: string;
  query: string;
}

const useStyles = makeStyles({
  container: {
    position: 'relative',
    height: '100%'
  }
});

interface ISearchResultsState {
  profiles?: IUserProfile[];
  games?: IGame[];
}

const SearchResults: SFC<ISearchResultsProps> = ({ search, query, location }) => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<ISearchResultsState>({});

  useEffect(
    () => {
      setLoading(true);
      if (search === 'all') {
        Promise.all([findProfiles(query, { limit: 5 }), findGames(query)]).then(
          ([foundProfiles, foundGames]) => {
            setSearchResults({
              profiles: foundProfiles,
              games: foundGames
            });
            setLoading(false);
          }
        );
      } else if (search === 'people') {
        findProfiles(query, { limit: 30 }).then(foundProfiles => {
          setSearchResults({
            profiles: foundProfiles
          });
          setLoading(false);
        });
      } else if (search === 'games') {
        findGames(query).then(foundGames => {
          setSearchResults({
            games: foundGames
          });
          setLoading(false);
        });
      }
    },
    [search, query]
  );

  return (
    <div className={classes.container}>
      {loading && <Loading />}
      {searchResults.games && (
        <>
          <ListSubheader>Games</ListSubheader>
          {searchResults.games.map(game => (
            <Game key={game.id} game={game} />
          ))}
        </>
      )}
      {searchResults.profiles && (
        <>
          <ListSubheader>People</ListSubheader>
          {searchResults.profiles.map(profile => (
            <Link key={profile.userId} to={`/users/${profile.userId}`}>
              <Contact
                profile={profile}
                selected={location.pathname === `/users/${profile.userId}`}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default withRouter(SearchResults);
