import React from 'react';
import ReactDOM from 'react-dom';
import Overlay from 'ui/pages/Overlay';
import ThemeProvider from 'ui/providers/ThemeProvider';

const Root = (
  <ThemeProvider>
    <Overlay />
  </ThemeProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
