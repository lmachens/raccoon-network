import React from 'react';
import ReactDOM from 'react-dom';
import { GamesProvider } from 'ui/contexts/games';
import MainLayout from 'ui/layouts/Main';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <GamesProvider>
      <MainLayout>
        <Main />
      </MainLayout>
    </GamesProvider>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
