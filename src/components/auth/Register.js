import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { registerUser } from '@/store/actions';

class Register extends Component {

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

    registerUser(newUserData).then(
      () => {
        dispatch(push('/login'));
      });
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="column is-half is-offset-one-quarter">
        { !isAuthenticated &&
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
          </div>
        }
        { isAuthenticated &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { auth } = state;

  const isAuthenticated = auth.isAuthenticated;

  return {
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(Register);
