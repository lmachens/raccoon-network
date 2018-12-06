import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { GamesProvider } from 'ui/contexts/games';
import { LoadingProvider } from 'ui/contexts/loading';
import { ProfileProvider } from 'ui/contexts/profile';
import OverwolfLayout from 'ui/layouts/Overwolf';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <LoadingProvider>
      <ProfileProvider>
        <HashRouter>
          <OverwolfLayout>
            <GamesProvider>
              <Main />
            </GamesProvider>
          </OverwolfLayout>
        </HashRouter>
      </ProfileProvider>
    </LoadingProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
