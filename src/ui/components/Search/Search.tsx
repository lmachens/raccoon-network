import {
  createStyles,
  Divider,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  withStyles,
  WithStyles
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import React, { SFC, useRef, useState } from 'react';
import Friends from '../Friends';
import SearchResults from './SearchResults';

interface SearchProps extends WithStyles<typeof styles> {
  selectedUser: any;
  onSelectUser(user: any): void;
}

const styles = createStyles({
  root: {
    margin: 10
  },
  textField: {
    height: 40,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  button: {
    borderRadius: 0
  },
  grow: {
    flexGrow: 1,
    overflow: 'auto'
  }
});

const tabs = ['all', 'contacts', 'games'];
const Search: SFC<SearchProps> = ({ classes, selectedUser, onSelectUser }) => {
  const inputElement = useRef(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(0);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    // @ts-ignore
    inputElement.current.focus();
  };

  const handleClearInput = () => {
    setSearch('');
  };

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const isSearching = search.length > 0;

  return (
    <>
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          onChange={handleChange}
          value={search}
          inputRef={inputElement}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" onClick={handleSearchClick}>
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearInput} className={classes.button}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          fullWidth
          placeholder="People, games & more"
          variant="outlined"
        />
      </div>

      {isSearching && (
        <Tabs value={tab} onChange={handleTabChange} fullWidth>
          <Tab label="All" />
          <Tab label="Contacts" />
          <Tab label="Games" />
        </Tabs>
      )}
      <Divider />
      {isSearching && <SearchResults query={tabs[tab]} />}
      {!isSearching && (
        <Friends className={classes.grow} selectedUser={selectedUser} onSelectUser={onSelectUser} />
      )}
    </>
  );
};

export default withStyles(styles)(Search);
