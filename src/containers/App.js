import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from '@/router/history';

import Root from '@/components/Root';
import Login from '@/components/auth/Login';
import Dashboard from '@/components/workouts/Dashboard';

import { loginUser } from '@/store/actions';

/* styles */
// base styles
import './App.css';

// sass styles (cuz many frameworks are sass based, ugh)
import '@/styles/sass/index.scss'; // eslint-disable-line
/* end styles */

/*eslint-disable*/
class App extends Component{
  render() {
    const { store, isAuthenticated } = this.props;

    const LoginWrapper = () => (
      <Login onLoginClick={creds => store.dispatch(loginUser(creds))} isAuthenticated={isAuthenticated} />
    );

    const DashboardWrapper = () => (
      <Dashboard dispatch={store.dispatch} isAuthenticated={isAuthenticated} />
    );

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Root isAuthenticated={isAuthenticated} />
            <Route exact path="/" component={DashboardWrapper} />
            <Route path="/login" component={LoginWrapper} />
          </div>
        </Router>
      </Provider>
    );
  }
}
/*eslint-enable*/

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isAuthenticated: PropTypes.bool.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps)(App);
