import AppRouter from './navigation/app-router';
import history from './navigation/history';
import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/main.scss';
import './assets/styles/reset.scss';
import './assets/styles/colors.scss';
import './assets/styles/fonts.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter history={history} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
