import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {

  handleClick() {
    const email = this.emailRef;
    const username = this.usernameRef;
    const password = this.passwordRef;

    const newUserData = {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value.trim(),
    };
    this.props.onRegisterClick(newUserData);
  }

  render() {
    const { isRegistered, isAuthenticated } = this.props;

    console.log(isRegistered) // eslint-disable-line
    console.log(isAuthenticated) // eslint-disable-line

    return (
      <div className="column is-half is-offset-one-quarter">
        { (!isRegistered && !isAuthenticated) &&
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
        { (isAuthenticated || isRegistered) &&
          <Redirect to="/" />
        }
      </div>
    );
  }
}

Register.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { registration, auth } = state;

  const isRegistered = registration.isRegistered;
  const isAuthenticated = auth.isAuthenticated;

  return {
    isRegistered,
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(Register);
