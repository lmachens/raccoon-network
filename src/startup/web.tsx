import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CacheProvider } from 'ui/contexts/cache';
import { ProfileProvider } from 'ui/contexts/profile';
import WebLayout from 'ui/layouts/Web';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <ProfileProvider>
      <HashRouter>
        <CacheProvider>
          <WebLayout>
            <Main />
          </WebLayout>
        </CacheProvider>
      </HashRouter>
    </ProfileProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
