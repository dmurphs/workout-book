import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@/containers/App';
import store from '@/store';

const NODE = document.getElementById('app');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    NODE,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('@/containers/App', () => {
    render(App);
  });
}
