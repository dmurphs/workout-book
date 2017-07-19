import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser, registerReset } from '@/store/actions';

class Register extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(registerReset());
  }

  handleClick() {
    const { dispatch } = this.props;

    const email = this.emailRef;
    const username = this.usernameRef;
    const password = this.passwordRef;

    const newUserData = {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value.trim(),
    };

    dispatch(registerUser(newUserData));
  }

  render() {
    const { isAuthenticated, isRegistered, isFetching, errors } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        { (!isAuthenticated && !isFetching) &&
          <div>
            <h1 className="title">Register</h1>
            <div className="field">
              <input className="input" type="email" ref={(el) => { this.emailRef = el; }} placeholder="Email" />
            </div>
            <div className="field">
              <input className="input" type="text" ref={(el) => { this.usernameRef = el; }} placeholder="Username" />
            </div>
            <div className="field">
              <input className="input" type="password" ref={(el) => { this.passwordRef = el; }} placeholder="Password" />
            </div>
            <div className="field">
              <button className="button is-success" onClick={() => this.handleClick()} >
                Register
              </button>
            </div>
            { errors &&
              <div className="notification is-danger">
                <ul>
                  {Object.keys(errors).map(errorKey => (
                    <li key={errorKey}>{errorKey} - {errors[errorKey]}</li>
                  ))}
                </ul>
              </div>
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
  errors: PropTypes.object, // eslint-disable-line
  isFetching: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { auth, registration } = state;

  const isAuthenticated = auth.isAuthenticated;
  const { isFetching, isRegistered, errors } = registration;

  return {
    isAuthenticated,
    isFetching,
    isRegistered,
    errors,
  };
}

export default connect(mapStateToProps)(Register);
