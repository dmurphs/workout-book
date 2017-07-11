import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, // LOGOUT_SUCCESS,
  CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE, CREATE_WORKOUT_RESET,
  WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE,
} from './actions';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false, // eslint-disable-line no-unneeded-ternary
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.errors,
      });
    // case LOGOUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false,
    //   });
    default:
      return state;
  }
}

function workoutCreation(state = {
  isFetching: false,
  created: false,
  data: {},
}, action) {
  switch (action.type) {
    case CREATE_WORKOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        created: false,
        data: action.workoutData,
      });
    case CREATE_WORKOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        created: true,
        data: action.response,
      });
    case CREATE_WORKOUT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        created: false,
        errors: action.errors,
      });
    case CREATE_WORKOUT_RESET:
      return Object.assign({}, state, {
        isFetching: false,
        created: false,
        data: {},
      });
    default:
      return state;
  }
}

function workoutDetail(state = {
  isFetching: false,
  received: false,
  data: {},
}, action) {
  switch (action.type) {
    case WORKOUT_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: {},
      });
    case WORKOUT_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        received: true,
        data: action.response,
      });
    case WORKOUT_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        received: false,
        errors: action.errors,
      });
    default:
      return state;
  }
}

// We combine the reducers here so that they
// can be left split apart above
export default combineReducers({
  auth,
  workoutCreation,
  workoutDetail,
  routerReducer,
});
