import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  // CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE, CREATE_WORKOUT_RESET,
  WORKOUT_LIST_REQUEST, WORKOUT_LIST_SUCCESS, WORKOUT_LIST_FAILURE,
  WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE,
  LIFT_ENTRY_LIST_REQUEST, LIFT_ENTRY_LIST_SUCCESS, LIFT_ENTRY_LIST_FAILURE,
  CREATE_LIFT_ENTRY_REQUEST, CREATE_LIFT_ENTRY_SUCCESS, CREATE_LIFT_ENTRY_FAILURE,
  CREATE_LIFT_ENTRY_RESET,
  UPDATE_LIFT_ENTRY_REQUEST, UPDATE_LIFT_ENTRY_SUCCESS, UPDATE_LIFT_ENTRY_FAILURE,
  UPDATE_LIFT_ENTRY_RESET,
  LIFT_LIST_REQUEST, LIFT_LIST_SUCCESS, LIFT_LIST_FAILURE,
  CREATE_LIFT_REQUEST, CREATE_LIFT_SUCCESS, CREATE_LIFT_FAILURE, CREATE_LIFT_RESET,
  UPDATE_LIFT_REQUEST, UPDATE_LIFT_SUCCESS, UPDATE_LIFT_FAILURE, UPDATE_LIFT_RESET,
  SET_LIST_REQUEST, SET_LIST_SUCCESS, SET_LIST_FAILURE,
  CREATE_SET_REQUEST, CREATE_SET_SUCCESS, CREATE_SET_FAILURE, CREATE_SET_RESET,
  UPDATE_SET_REQUEST, UPDATE_SET_SUCCESS, UPDATE_SET_FAILURE, UPDATE_SET_RESET,
  RUN_ENTRY_LIST_REQUEST, RUN_ENTRY_LIST_SUCCESS, RUN_ENTRY_LIST_FAILURE,
  CREATE_RUN_ENTRY_REQUEST, CREATE_RUN_ENTRY_SUCCESS, CREATE_RUN_ENTRY_FAILURE,
  CREATE_RUN_ENTRY_RESET,
  UPDATE_RUN_ENTRY_REQUEST, UPDATE_RUN_ENTRY_SUCCESS, UPDATE_RUN_ENTRY_FAILURE,
  UPDATE_RUN_ENTRY_RESET,
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
        errors: action.errors,
      };
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
      });
    default:
      return {
        ...state,
        errors: null,
      };
  }
}

function registration(state = {
  isFetching: false,
  isRegistered: false,
}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRegistered: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isRegistered: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        errors: action.errors,
      };
    default:
      return {
        isFetching: false,
        isRegistered: false,
      };
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

function defaultAPICreationReducer(
  requestType,
  successType,
  failureType,
  resetType,
  state,
  action) {
  switch (action.type) {
    case requestType:
      return {
        ...state,
        isFetching: true,
        isCreated: false,
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        isCreated: true,
      };
    case failureType:
      return {
        ...state,
        isFetching: false,
        isCreated: false,
        errors: action.errors,
      };
    case resetType:
      return {
        isFetching: false,
        isCreated: false,
      };
    default:
      return {
        isFetching: false,
        isCreated: false,
      };
  }
}

function defaultAPIUpdateReducer(
  requestType,
  successType,
  failureType,
  resetType,
  state,
  action) {
  switch (action.type) {
    case requestType:
      return {
        ...state,
        isFetching: true,
        isUpdated: false,
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        isUpdated: true,
      };
    case failureType:
      return {
        ...state,
        isFetching: false,
        isUpdated: false,
        errors: action.errors,
      };
    case resetType:
      return {
        isFetching: false,
        isUpdated: false,
      };
    default:
      return {
        isFetching: false,
        isUpdated: false,
      };
  }
}

// function workoutCreation(state = {
//   isFetching: false,
//   isCreated: false,
// }, action) {
//   switch (action.type) {
//     case CREATE_WORKOUT_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         isCreated: false,
//       };
//     case CREATE_WORKOUT_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         isCreated: true,
//         newWorkout: action.response,
//       };
//     case CREATE_WORKOUT_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         isCreated: false,
//         errors: action.errors,
//       };
//     case CREATE_WORKOUT_RESET:
//       return {
//         isFetching: false,
//         isCreated: false,
//       };
//     default:
//       return state;
//   }
// }

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

function liftEntryCreation(state = {
  isFetching: false,
  isCreated: false,
}, action) {
  return defaultAPICreationReducer(
    CREATE_LIFT_ENTRY_REQUEST,
    CREATE_LIFT_ENTRY_SUCCESS,
    CREATE_LIFT_ENTRY_FAILURE,
    CREATE_LIFT_ENTRY_RESET,
    state,
    action);
}

function liftEntryUpdate(state = {
  isFetching: false,
  isUpdated: false,
}, action) {
  return defaultAPIUpdateReducer(
    UPDATE_LIFT_ENTRY_REQUEST,
    UPDATE_LIFT_ENTRY_SUCCESS,
    UPDATE_LIFT_ENTRY_FAILURE,
    UPDATE_LIFT_ENTRY_RESET,
    state,
    action);
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

function liftCreation(state = {
  isFetching: false,
  isCreated: false,
}, action) {
  return defaultAPICreationReducer(
    CREATE_LIFT_REQUEST,
    CREATE_LIFT_SUCCESS,
    CREATE_LIFT_FAILURE,
    CREATE_LIFT_RESET,
    state,
    action);
}

function liftUpdate(state = {
  isFetching: false,
  isUpdated: false,
}, action) {
  return defaultAPIUpdateReducer(
    UPDATE_LIFT_REQUEST,
    UPDATE_LIFT_SUCCESS,
    UPDATE_LIFT_FAILURE,
    UPDATE_LIFT_RESET,
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

function setCreation(state = {
  isFetching: false,
  isCreated: false,
}, action) {
  return defaultAPICreationReducer(
    CREATE_SET_REQUEST,
    CREATE_SET_SUCCESS,
    CREATE_SET_FAILURE,
    CREATE_SET_RESET,
    state,
    action);
}

function setUpdate(state = {
  isFetching: false,
  isUpdated: false,
}, action) {
  return defaultAPIUpdateReducer(
    UPDATE_SET_REQUEST,
    UPDATE_SET_SUCCESS,
    UPDATE_SET_FAILURE,
    UPDATE_SET_RESET,
    state,
    action);
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

function runEntryCreation(state = {
  isFetching: false,
  isCreated: false,
}, action) {
  return defaultAPICreationReducer(
    CREATE_RUN_ENTRY_REQUEST,
    CREATE_RUN_ENTRY_SUCCESS,
    CREATE_RUN_ENTRY_FAILURE,
    CREATE_RUN_ENTRY_RESET,
    state,
    action);
}

function runEntryUpdate(state = {
  isFetching: false,
  isUpdated: false,
}, action) {
  return defaultAPIUpdateReducer(
    UPDATE_RUN_ENTRY_REQUEST,
    UPDATE_RUN_ENTRY_SUCCESS,
    UPDATE_RUN_ENTRY_FAILURE,
    UPDATE_RUN_ENTRY_RESET,
    state,
    action);
}

// We combine the reducers here so that they
// can be left split apart above
export default combineReducers({
  auth,
  registration,
  // workoutCreation,
  workoutList,
  workoutDetail,
  liftEntries,
  liftEntryCreation,
  liftEntryUpdate,
  liftList,
  liftCreation,
  liftUpdate,
  sets,
  setCreation,
  setUpdate,
  runEntries,
  runEntryCreation,
  runEntryUpdate,
  routerReducer,
});
