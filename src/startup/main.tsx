import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'ui/layouts/Main';
import Main from 'ui/pages/Main';
import ThemeProvider from 'ui/themes/ThemeProvider';

const Root = (
  <ThemeProvider>
    <MainLayout>
      <Main />
    </MainLayout>
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
