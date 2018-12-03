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
import Contacts from '../Contacts';
import SearchResults from './SearchResults';

interface SearchProps extends WithStyles<typeof styles> {}

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
  }
});

const tabs = ['all', 'contacts', 'games'];
const Search: SFC<SearchProps> = ({ classes }) => {
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
          <Tab label="All" />
          <Tab label="Contacts" />
          <Tab label="Games" />
        </Tabs>
      )}
      <Divider />
      {isSearching && <SearchResults search={tabs[tab]} query={searchQuery} />}
      {!isSearching && <Contacts />}
    </>
  );
};

export default withStyles(styles)(Search);
