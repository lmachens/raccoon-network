import {
  CircularProgress,
  createStyles,
  ListSubheader,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { findGames, IGame } from 'api/games';
import { findProfiles, IUserProfile } from 'api/stitch/profile';
import React, { SFC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Contact from '../Contact';
import Game from '../Game';
import Link from '../Link';

interface ISearchResultsProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
  search: string;
  query: string;
}

const styles = createStyles({
  container: {
    position: 'relative',
    height: '100%'
  },
  loading: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)'
  }
});

interface ISearchResultsState {
  profiles?: IUserProfile[];
  games?: IGame[];
}

const SearchResults: SFC<ISearchResultsProps> = ({ classes, history, search, query, location }) => {
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
      {loading && <CircularProgress className={classes.loading} />}
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

export default compose(
  withStyles(styles),
  withRouter
)(SearchResults);
