import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, // LOGOUT_SUCCESS,
  WORKOUT_LIST_REQUEST, WORKOUT_LIST_SUCCESS, WORKOUT_LIST_FAILURE,
  WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE,
  LIFT_ENTRY_LIST_REQUEST, LIFT_ENTRY_LIST_SUCCESS, LIFT_ENTRY_LIST_FAILURE,
  LIFT_LIST_REQUEST, LIFT_LIST_SUCCESS, LIFT_LIST_FAILURE,
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
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.errors,
      };
    // case LOGOUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false,
    //   });
    default:
      return state;
  }
}

function defaultAPIGetReducer(requestType, successType, failureType, state, action) {
  switch (action.type) {
    case requestType:
      return {
        ...state,
        isFetching: true,
        received: false,
        data: state.data,
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        received: true,
        data: action.response,
      };
    case failureType:
      return {
        ...state,
        isFetching: false,
        received: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

function workoutList(state = {
  isFetching: false,
  received: false,
  data: [],
}, action) {
  return defaultAPIGetReducer(
    WORKOUT_LIST_REQUEST,
    WORKOUT_LIST_SUCCESS,
    WORKOUT_LIST_FAILURE,
    state,
    action);
}

// function workoutCreation(state = {
//   isFetching: false,
//   created: false,
//   data: {},
// }, action) {
//   switch (action.type) {
//     case CREATE_WORKOUT_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         created: true,
//         data: action.workoutData,
//       };
//     case CREATE_WORKOUT_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         created: true,
//         data: action.response,
//       };
//     case CREATE_WORKOUT_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         created: false,
//         errors: action.errors,
//       };
//     default:
//       return state;
//   }
// }

function workoutDetail(state = {
  isFetching: false,
  received: false,
  workoutDetailByWorkoutID: {},
}, action) {
  switch (action.type) {
    case WORKOUT_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
        received: false,
      };
    case WORKOUT_DETAIL_SUCCESS: // eslint-disable-line
      const workoutID = action.parentID;
      const workoutDetailByWorkoutID = state.workoutDetailByWorkoutID;

      const updatedWorkoutDetailByWorkoutID = {
        ...workoutDetailByWorkoutID,
        [workoutID]: action.response,
      };

      return {
        ...state,
        isFetching: false,
        received: true,
        workoutDetailByWorkoutID: updatedWorkoutDetailByWorkoutID,
      };
    case WORKOUT_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        received: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

function liftEntries(state = {
  isFetching: false,
  received: false,
  liftEntriesByWorkoutID: {},
}, action) {
  switch (action.type) {
    case LIFT_ENTRY_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        received: false,
      };
    case LIFT_ENTRY_LIST_SUCCESS: // eslint-disable-line
      const workoutID = action.parentID;
      const liftEntriesByWorkoutID = state.liftEntriesByWorkoutID;

      const udpatedLiftEntriesByWorkoutID = {
        ...liftEntriesByWorkoutID,
        [workoutID]: action.response,
      };

      return {
        ...state,
        isFetching: false,
        received: true,
        liftEntriesByWorkoutID: udpatedLiftEntriesByWorkoutID,
      };
    case LIFT_ENTRY_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        received: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

function liftList(state = {
  isFetching: false,
  received: false,
  data: [],
}, action) {
  return defaultAPIGetReducer(
    LIFT_LIST_REQUEST,
    LIFT_LIST_SUCCESS,
    LIFT_LIST_FAILURE,
    state,
    action);
}

function sets(state = {
  isFetching: false,
  received: false,
  setsByLiftEntryID: {},
}, action) {
  switch (action.type) {
    case SET_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        received: false,
      };
    case SET_LIST_SUCCESS: // eslint-disable-line
      const liftEntryID = action.parentID;
      const setsByLiftEntryID = state.setsByLiftEntryID;

      const updatedSetsByLiftEntryID = {
        ...setsByLiftEntryID,
        [liftEntryID]: action.response,
      };

      return {
        ...state,
        isFetching: false,
        received: true,
        setsByLiftEntryID: updatedSetsByLiftEntryID,
      };
    case SET_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        received: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

function runEntries(state = {
  isFetching: false,
  received: false,
  runEntriesByWorkoutID: {},
}, action) {
  switch (action.type) {
    case RUN_ENTRY_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        received: false,
      };
    case RUN_ENTRY_LIST_SUCCESS: // eslint-disable-line
      const workoutID = action.parentID;
      const runEntriesByWorkoutID = state.runEntriesByWorkoutID;

      const udpatedRunEntriesByWorkoutID = {
        ...runEntriesByWorkoutID,
        [workoutID]: action.response,
      };

      return {
        ...state,
        isFetching: false,
        received: true,
        runEntriesByWorkoutID: udpatedRunEntriesByWorkoutID,
      };
    case RUN_ENTRY_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        received: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

// We combine the reducers here so that they
// can be left split apart above
export default combineReducers({
  auth,
  workoutList,
  workoutDetail,
  liftEntries,
  liftList,
  sets,
  runEntries,
  routerReducer,
});
