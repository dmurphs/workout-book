import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Errors from '@/components/global/Errors';

import { registerUser } from '@/store/actions';

class Register extends Component {

  constructor(props) {
    super(props);

    this.defaultState = {
      email: '',
      username: '',
      password: '',
    };

    this.state = this.defaultState;

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;

    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;

    const newUserData = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    };

    dispatch(registerUser(newUserData));
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const {
      isAuthenticated,
      isRegistered,
      isFetching,
      emailErrors,
      usernameErrors,
      passwordErrors,
      nonFieldErrors,
    } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        { (!isAuthenticated && !isFetching) &&
          <div>
            <h1 className="title">Register</h1>
            <div className="field">
              <input
                className={emailErrors ? 'input is-danger' : 'input'}
                type="email"
                onChange={this.handleEmailChange}
                value={this.state.email}
                placeholder="Email"
              />
              {emailErrors &&
                <Errors errors={emailErrors} />
              }
            </div>
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
                Register
              </button>
            </div>
            { nonFieldErrors &&
              <Errors errors={nonFieldErrors} />
            }
          </div>
        }
        { isFetching &&
          <h1>Registering...</h1>
        }
        { (isAuthenticated || isRegistered) &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  emailErrors: PropTypes.object, // eslint-disable-line
  usernameErrors: PropTypes.array, // eslint-disable-line
  passwordErrors: PropTypes.object, // eslint-disable-line
  nonFieldErrors: PropTypes.object, // eslint-disable-line
};

function mapStateToProps(state) {
  const { auth, registration } = state;

  const isAuthenticated = auth.isAuthenticated;
  const { isFetching, isRegistered, errors } = registration;

  const emailErrors = errors ? errors.email : null;
  const usernameErrors = errors ? errors.username : null;
  const passwordErrors = errors ? errors.password : null;
  const nonFieldErrors = errors ? errors.non_field_errors : null;

  return {
    isAuthenticated,
    isFetching,
    isRegistered,
    emailErrors,
    usernameErrors,
    passwordErrors,
    nonFieldErrors,
  };
}

export default connect(mapStateToProps)(Register);
