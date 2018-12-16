import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CacheProvider } from 'ui/contexts/cache';
import { ProfileProvider } from 'ui/contexts/profile';
import OverwolfLayout from 'ui/layouts/Overwolf';
import Main from 'ui/pages/Main';
import GamesProvider from 'ui/providers/GamesProvider';
import ThemeProvider from 'ui/providers/ThemeProvider';

const Root = (
  <ThemeProvider>
    <ProfileProvider>
      <HashRouter>
        <CacheProvider>
          <OverwolfLayout>
            <GamesProvider />
            <Main />
          </OverwolfLayout>
        </CacheProvider>
      </HashRouter>
    </ProfileProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
