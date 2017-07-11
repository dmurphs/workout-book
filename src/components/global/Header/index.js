import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

/*eslint-disable*/
export default class Header extends Component {
  render() {

    const { isAuthenticated } = this.props;

    return (
      <header className={styles.header}>
        <Link to="/">Dashboard</Link>

        { isAuthenticated &&
          <Link to="/logout">Logout</Link>
        }

        { !isAuthenticated &&
          <Link to="/login">Login</Link>
        }

      </header>
    );
  }
}
/*eslint-enable*/
