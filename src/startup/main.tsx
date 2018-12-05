import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { GamesProvider } from 'ui/contexts/games';
import { LoadingProvider } from 'ui/contexts/loading';
import { ProfileProvider } from 'ui/contexts/profile';
import MainLayout from 'ui/layouts/Main';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <LoadingProvider>
      <ProfileProvider>
        <HashRouter>
          <MainLayout>
            <GamesProvider>
              <Main />
            </GamesProvider>
          </MainLayout>
        </HashRouter>
      </ProfileProvider>
    </LoadingProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
