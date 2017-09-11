import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logoutUser } from '@/store/actions';

/*eslint-disable*/
export default class Header extends Component {
  render() {

    const { isAuthenticated, dispatch } = this.props;

    return (
      <div className="container">
        <nav className="nav">
          <div className="nav-left">
            <Link className="nav-item " to="/">Home</Link>
          </div>
          <div>
            { isAuthenticated &&
              <div className="nav-right">
                <button className="nav-item button is-link" onClick={() => dispatch(logoutUser())}>Logout</button>
              </div>
            }
            { !isAuthenticated &&
              <div className="nav-right">
                <Link className="nav-item" to="/register">Register</Link>
                <Link className="nav-item" to="/login">Login</Link>
              </div>
            }
          </div>
        </nav>
      </div>
    );
  }
}
/*eslint-enable*/
