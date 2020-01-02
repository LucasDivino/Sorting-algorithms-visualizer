import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './components/App';
import Store from './Store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#408050'
    },
    secondary: {
      main: '#fff'
    }
  }
});

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
