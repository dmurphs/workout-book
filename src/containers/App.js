import React, { Component } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from '@/router/history';

import Root from '@/components/Root';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Dashboard from '@/components/workouts/Dashboard';
import Workout from '@/components/workouts/Workout';

import { loginUser } from '@/store/actions';

/* styles */
// base styles
import styles from './App.css';

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

    const RegisterWrapper = () => (
      <Register isAuthenticated={isAuthenticated} dispatch={store.dispatch} />
    );
 
    const DashboardWrapper = () => (
      <div>
        { isAuthenticated &&
          <Dashboard isAuthenticated={isAuthenticated} dispatch={store.dispatch} />
        }
        { !isAuthenticated &&
          <Redirect to="/login" />
        }
      </div>
    );

    const WorkoutWrapper = ({ match }) => (
      <div>
        {isAuthenticated &&
          <Workout workoutID={parseInt(match.params.workoutID)} dispatch={store.dispatch} />
        }
        { !isAuthenticated &&
          <Redirect to="/login" />
        }
      </div>
    );

    return (
      <Provider store={store}>
        <Router history={history}>
          <div className={styles.container}>
            <Root isAuthenticated={isAuthenticated} dispatch={store.dispatch} />
            <Route exact path="/" component={DashboardWrapper} />
            <Route path="/register" component={RegisterWrapper} />
            <Route path="/login" component={LoginWrapper} />
            <Route path="/workout/:workoutID" component={WorkoutWrapper} />
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
