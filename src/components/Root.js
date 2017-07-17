import React, { Component } from 'react';

import Header from './global/Header';

import styles from './Root.css'; // eslint-disable-line

/*eslint-disable*/
export default class Root extends Component {
  render() {
    const { isAuthenticated, dispatch } = this.props;

    return (
      <div>
        <Header isAuthenticated={isAuthenticated} dispatch={dispatch} />
      </div>
    );
  }
}
/*eslint-enable*/
