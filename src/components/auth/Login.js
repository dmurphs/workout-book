import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {

  handleClick() {
    const username = this.usernameRef;
    const password = this.passwordRef;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        { !isAuthenticated &&
          <div>
            <input type="text" ref={(el) => { this.usernameRef = el; }} placeholder="Username" />
            <input type="password" ref={(el) => { this.passwordRef = el; }} placeholder="Password" />
            <button onClick={() => this.handleClick()} >
              Login
            </button>
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
};

function mapStateToProps(state) {
  const { auth } = state;

  const isAuthenticated = auth.isAuthenticated;

  return {
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
