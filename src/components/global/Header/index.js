import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logoutUser } from '@/store/actions';

import styles from './index.css';

/*eslint-disable*/
export default class Header extends Component {
  render() {

    const { isAuthenticated, dispatch } = this.props;

    return (
      <header className={styles.header}>
        <Link to="/">Dashboard</Link>

        { isAuthenticated &&
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        }

        { !isAuthenticated &&
          <Link to="/login">Login</Link>
        }

      </header>
    );
  }
}
/*eslint-enable*/
