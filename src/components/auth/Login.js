import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Login extends Component {

  handleClick() {
    const username = this.usernameRef;
    const password = this.passwordRef;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    return (
      <div>
        <Link to={'/'}>Dashboard</Link>
        <div>
          <input type="text" ref={(el) => { this.usernameRef = el; }} placeholder="Username" />
          <input type="password" ref={(el) => { this.passwordRef = el; }} placeholder="Password" />
          <button onClick={() => this.handleClick()} >
            Login
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};
