import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CacheProvider } from 'ui/contexts/cache';
import { LoadingProvider } from 'ui/contexts/loading';
import { ProfileProvider } from 'ui/contexts/profile';
import WebLayout from 'ui/layouts/Web';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <LoadingProvider>
      <ProfileProvider>
        <HashRouter>
          <CacheProvider>
            <WebLayout>
              <Main />
            </WebLayout>
          </CacheProvider>
        </HashRouter>
      </ProfileProvider>
    </LoadingProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
