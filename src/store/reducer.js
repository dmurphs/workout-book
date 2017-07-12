import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, // LOGOUT_SUCCESS,
  CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE,
  WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE,
  LIFT_ENTRY_LIST_REQUEST, LIFT_ENTRY_LIST_SUCCESS, LIFT_ENTRY_LIST_FAILURE,
  SET_LIST_REQUEST, SET_LIST_SUCCESS, SET_LIST_FAILURE,
  RUN_ENTRY_LIST_REQUEST, RUN_ENTRY_LIST_SUCCESS, RUN_ENTRY_LIST_FAILURE,
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

function liftEntryList(state = {
  isFetching: false,
  received: false,
  data: [],
}, action) {
  switch (action.type) {
    case LIFT_ENTRY_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: [],
      });
    case LIFT_ENTRY_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        received: true,
        data: action.response,
      });
    case LIFT_ENTRY_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: action.errors,
      });
    default:
      return state;
  }
}

function setList(state = {
  isFetching: false,
  received: false,
  data: [],
}, action) {
  switch (action.type) {
    case SET_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: [],
      });
    case SET_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        received: true,
        data: action.response,
      });
    case SET_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: action.errors,
      });
    default:
      return state;
  }
}

function runEntryList(state = {
  isFetching: false,
  received: false,
  data: [],
}, action) {
  switch (action.type) {
    case RUN_ENTRY_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: [],
      });
    case RUN_ENTRY_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        received: true,
        data: action.response,
      });
    case RUN_ENTRY_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        received: false,
        data: action.errors,
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
  liftEntryList,
  setList,
  runEntryList,
  routerReducer,
});
