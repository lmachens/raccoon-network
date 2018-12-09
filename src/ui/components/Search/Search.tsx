import { IconButton, InputAdornment, Tab, Tabs, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import React, { useRef, useState } from 'react';
import SearchResults from './SearchResults';

const useStyles = makeStyles(theme => ({
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
  tabMinWidth: {
    [theme.breakpoints.up('md')]: {
      minWidth: 'inherit'
    }
  }
}));

const tabs = ['all', 'people', 'games'];
const Search = ({ children }) => {
  const classes = useStyles({});
  const inputElement = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState(0);

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // @ts-ignore
    inputElement.current.focus();
  };

  const handleClearInput = () => {
    setSearchQuery('');
  };

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const isSearching = searchQuery.length > 0;

  return (
    <>
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          onChange={handleChange}
          value={searchQuery}
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
          <Tab classes={{ root: classes.tabMinWidth }} label="All" />
          <Tab classes={{ root: classes.tabMinWidth }} label="People" />
          <Tab classes={{ root: classes.tabMinWidth }} label="Games" />
        </Tabs>
      )}
      {isSearching && <SearchResults search={tabs[tab]} query={searchQuery} />}
      {!isSearching && children}
    </>
  );
};

export default Search;
