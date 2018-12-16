import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from 'ui/contexts/cache';
import { ProfileProvider } from 'ui/contexts/profile';
import WebLayout from 'ui/layouts/Web';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/providers/ThemeProvider';

const Root = (
  <ThemeProvider>
    <ProfileProvider>
      <BrowserRouter>
        <CacheProvider>
          <WebLayout>
            <Main />
          </WebLayout>
        </CacheProvider>
      </BrowserRouter>
    </ProfileProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
