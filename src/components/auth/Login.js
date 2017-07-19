import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { cleanLogin } from '@/store/actions';

class Login extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(cleanLogin());
  }

  handleClick() {
    const username = this.usernameRef;
    const password = this.passwordRef;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    const { isAuthenticated, errors } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        { !isAuthenticated &&
          <div>
            <h1 className="title">Login</h1>
            <div className="field">
              <input className="input" type="text" ref={(el) => { this.usernameRef = el; }} placeholder="Username" />
            </div>
            <div className="field">
              <input className="input" type="password" ref={(el) => { this.passwordRef = el; }} placeholder="Password" />
            </div>
            <div className="field">
              <button className="button is-success" onClick={() => this.handleClick()} >
                Login
              </button>
            </div>
            { errors &&
              <div className="notification is-danger">
                <ul>
                  {errors.map(message => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </div>
            }
          </div>
        }
        { isAuthenticated &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.array, // eslint-disable-line
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { auth } = state;

  const { isAuthenticated, errors } = auth;

  return {
    isAuthenticated,
    errors,
  };
}

export default connect(mapStateToProps)(Login);
