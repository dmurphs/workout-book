import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

class Login extends Component {

  constructor(props) {
    super(props);

    this.defaultState = {
      username: '',
      password: '',
    };

    this.state = this.defaultState;

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleClick() {
    const username = this.state.username;
    const password = this.state.password;
    const creds = {
      username: username.trim(),
      password: password.trim(),
    };
    this.props.onLoginClick(creds);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { isAuthenticated, usernameErrors, passwordErrors, nonFieldErrors } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        { !isAuthenticated &&
          <div>
            <h1 className="title">Login</h1>
            <div className="field">
              <input
                className={usernameErrors ? 'input is-danger' : 'input'}
                type="text"
                onChange={this.handleUsernameChange}
                value={this.state.username}
                placeholder="Username"
              />
              {usernameErrors &&
                <Errors errors={usernameErrors} />
              }
            </div>
            <div className="field">
              <input
                className={passwordErrors ? 'input is-danger' : 'input'}
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                placeholder="Password"
              />
              {passwordErrors &&
                <Errors errors={passwordErrors} />
              }
            </div>
            <div className="field">
              <button className="button is-success" onClick={() => this.handleClick()} >
                Login
              </button>
            </div>
            { nonFieldErrors &&
              <Errors errors={nonFieldErrors} />
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
  usernameErrors: PropTypes.array, // eslint-disable-line
  passwordErrors: PropTypes.array, // eslint-disable-line
  nonFieldErrors: PropTypes.array, // eslint-disable-line
  // dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { auth } = state;

  const { isAuthenticated, errors } = auth;

  const usernameErrors = errors ? errors.username : null;
  const passwordErrors = errors ? errors.password : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isAuthenticated,
    usernameErrors,
    passwordErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(Login);
