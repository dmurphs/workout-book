import { LOGIN_URL,
  WORKOUT_LIST_URL, CREATE_WORKOUT_URL, UPDATE_WORKOUT_URL, WORKOUT_DETAIL_URL,
  LIFT_ENTRY_LIST_URL, CREATE_LIFT_ENTRY_URL, UPDATE_LIFT_ENTRY_URL,
  LIFT_LIST_URL,
  SET_LIST_URL, CREATE_SET_URL, UPDATE_SET_URL,
  RUN_ENTRY_LIST_URL, CREATE_RUN_ENTRY_URL, UPDATE_RUN_ENTRY_URL } from '@/settings';

import { CALL_API } from '@/middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const WORKOUT_LIST_REQUEST = 'WORKOUT_LIST_REQUEST';
export const WORKOUT_LIST_SUCCESS = 'WORKOUT_LIST_SUCCESS';
export const WORKOUT_LIST_FAILURE = 'WORKOUT_LIST_FAILURE';

export const CREATE_WORKOUT_REQUEST = 'CREATE_WORKOUT_REQUEST';
export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const CREATE_WORKOUT_FAILURE = 'CREATE_WORKOUT_FAILURE';

export const UPDATE_WORKOUT_REQUEST = 'UPDATE_WORKOUT_REQUEST';
export const UPDATE_WORKOUT_SUCCESS = 'UPDATE_WORKOUT_SUCCESS';
export const UPDATE_WORKOUT_FAILURE = 'UPDATE_WORKOUT_FAILURE';

export const WORKOUT_DETAIL_REQUEST = 'WORKOUT_DETAIL_REQUEST';
export const WORKOUT_DETAIL_SUCCESS = 'WORKOUT_DETAIL_SUCCESS';
export const WORKOUT_DETAIL_FAILURE = 'WORKOUT_DETAIL_FAILURE';

export const LIFT_ENTRY_LIST_REQUEST = 'LIFT_ENTRY_LIST_REQUEST';
export const LIFT_ENTRY_LIST_SUCCESS = 'LIFT_ENTRY_LIST_SUCCESS';
export const LIFT_ENTRY_LIST_FAILURE = 'LIFT_ENTRY_LIST_FAILURE';

export const LIFT_LIST_REQUEST = 'LIFT_LIST_REQUEST';
export const LIFT_LIST_SUCCESS = 'LIFT_LIST_SUCCESS';
export const LIFT_LIST_FAILURE = 'LIFT_LIST_FAILURE';

export const CREATE_LIFT_ENTRY_REQUEST = 'CREATE_LIFT_ENTRY_REQUEST';
export const CREATE_LIFT_ENTRY_SUCCESS = 'CREATE_LIFT_ENTRY_SUCCESS';
export const CREATE_LIFT_ENTRY_FAILURE = 'CREATE_LIFT_ENTRY_FAILURE';

export const UPDATE_LIFT_ENTRY_REQUEST = 'UPDATE_LIFT_ENTRY_REQUEST';
export const UPDATE_LIFT_ENTRY_SUCCESS = 'UPDATE_LIFT_ENTRY_SUCCESS';
export const UPDATE_LIFT_ENTRY_FAILURE = 'UPDATE_LIFT_ENTRY_FAILURE';

export const SET_LIST_REQUEST = 'SET_LIST_REQUEST';
export const SET_LIST_SUCCESS = 'SET_LIST_SUCCESS';
export const SET_LIST_FAILURE = 'SET_LIST_FAILURE';

export const CREATE_SET_REQUEST = 'CREATE_SET_REQUEST';
export const CREATE_SET_SUCCESS = 'CREATE_SET_SUCCESS';
export const CREATE_SET_FAILURE = 'CREATE_SET_FAILURE';

export const UPDATE_SET_REQUEST = 'UPDATE_SET_REQUEST';
export const UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
export const UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';

export const RUN_ENTRY_LIST_REQUEST = 'RUN_ENTRY_LIST_REQUEST';
export const RUN_ENTRY_LIST_SUCCESS = 'RUN_ENTRY_LIST_SUCCESS';
export const RUN_ENTRY_LIST_FAILURE = 'RUN_ENTRY_LIST_FAILURE';

export const CREATE_RUN_ENTRY_REQUEST = 'CREATE_RUN_ENTRY_REQUEST';
export const CREATE_RUN_ENTRY_SUCCESS = 'CREATE_RUN_ENTRY_SUCCESS';
export const CREATE_RUN_ENTRY_FAILURE = 'CREATE_RUN_ENTRY_FAILURE';

export const UPDATE_RUN_ENTRY_REQUEST = 'UPDATE_RUN_ENTRY_REQUEST';
export const UPDATE_RUN_ENTRY_SUCCESS = 'UPDATE_RUN_ENTRY_SUCCESS';
export const UPDATE_RUN_ENTRY_FAILURE = 'UPDATE_RUN_ENTRY_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token,
  };
}

function loginError(errors) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errors,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function getWorkouts(dateRangeData) {
  return {
    [CALL_API]: {
      endpoint: WORKOUT_LIST_URL,
      types: [WORKOUT_DETAIL_REQUEST, WORKOUT_LIST_SUCCESS, WORKOUT_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: dateRangeData,
    },
  };
}

export function createWorkout(workoutData) {
  return {
    [CALL_API]: {
      endpoint: CREATE_WORKOUT_URL,
      types: [CREATE_WORKOUT_REQUEST, CREATE_WORKOUT_SUCCESS, CREATE_WORKOUT_FAILURE],
      requestMethod: 'POST',
      requestData: workoutData,
    },
  };
}

export function updateWorkout(workoutID, workoutData) {
  return {
    [CALL_API]: {
      endpoint: `${UPDATE_WORKOUT_URL}${workoutID}/`,
      types: [UPDATE_WORKOUT_REQUEST, UPDATE_WORKOUT_SUCCESS, UPDATE_WORKOUT_FAILURE],
      requestMethod: 'PUT',
      requestData: workoutData,
    },
  };
}

export function getWorkoutDetail(workoutID) {
  return {
    [CALL_API]: {
      endpoint: `${WORKOUT_DETAIL_URL}${workoutID}/`,
      types: [WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE],
      requestMethod: 'GET',
      requestData: {},
      parentID: workoutID,
    },
  };
}

export function getLiftEntries(workoutID) {
  return {
    [CALL_API]: {
      endpoint: `${LIFT_ENTRY_LIST_URL}${workoutID}/`,
      types: [LIFT_ENTRY_LIST_REQUEST, LIFT_ENTRY_LIST_SUCCESS, LIFT_ENTRY_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: {},
      parentID: workoutID,
    },
  };
}

export function getLifts() {
  return {
    [CALL_API]: {
      endpoint: LIFT_LIST_URL,
      types: [LIFT_LIST_REQUEST, LIFT_LIST_SUCCESS, LIFT_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: {},
    },
  };
}

export function createLiftEntry(workoutID, liftEntryData) {
  return {
    [CALL_API]: {
      endpoint: `${CREATE_LIFT_ENTRY_URL}${workoutID}/`,
      types: [CREATE_LIFT_ENTRY_REQUEST, CREATE_LIFT_ENTRY_SUCCESS, CREATE_LIFT_ENTRY_FAILURE],
      requestMethod: 'POST',
      requestData: liftEntryData,
    },
  };
}

export function updateLiftEntry(liftEntryID, liftEntryData) {
  return {
    [CALL_API]: {
      endpoint: `${UPDATE_LIFT_ENTRY_URL}${liftEntryID}/`,
      types: [UPDATE_LIFT_ENTRY_REQUEST, UPDATE_LIFT_ENTRY_SUCCESS, UPDATE_LIFT_ENTRY_FAILURE],
      requestMethod: 'PUT',
      requestData: liftEntryData,
    },
  };
}

export function getSets(liftEntryID) {
  return {
    [CALL_API]: {
      endpoint: `${SET_LIST_URL}${liftEntryID}/`,
      types: [SET_LIST_REQUEST, SET_LIST_SUCCESS, SET_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: {},
      parentID: liftEntryID,
    },
  };
}

export function createSet(liftEntryID, setData) {
  return {
    [CALL_API]: {
      endpoint: `${CREATE_SET_URL}${liftEntryID}/`,
      types: [CREATE_SET_REQUEST, CREATE_SET_SUCCESS, CREATE_SET_FAILURE],
      requestMethod: 'POST',
      requestData: setData,
    },
  };
}

export function updateSet(setID, setData) {
  return {
    [CALL_API]: {
      endpoint: `${UPDATE_SET_URL}${setID}/`,
      types: [UPDATE_SET_REQUEST, UPDATE_SET_SUCCESS, UPDATE_SET_FAILURE],
      requestMethod: 'PUT',
      requestData: setData,
    },
  };
}

export function getRunEntries(workoutID) {
  return {
    [CALL_API]: {
      endpoint: `${RUN_ENTRY_LIST_URL}${workoutID}/`,
      types: [RUN_ENTRY_LIST_REQUEST, RUN_ENTRY_LIST_SUCCESS, RUN_ENTRY_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: {},
      parentID: workoutID,
    },
  };
}

export function createRunEntry(workoutID, runEntryData) {
  return {
    [CALL_API]: {
      endpoint: `${CREATE_RUN_ENTRY_URL}${workoutID}/`,
      types: [CREATE_RUN_ENTRY_REQUEST, CREATE_RUN_ENTRY_SUCCESS, CREATE_RUN_ENTRY_FAILURE],
      requestMethod: 'POST',
      requestData: runEntryData,
    },
  };
}

export function updateRunEntry(runEntryID, runEntryData) {
  return {
    [CALL_API]: {
      endpoint: `${UPDATE_RUN_ENTRY_URL}${runEntryID}/`,
      types: [UPDATE_RUN_ENTRY_REQUEST, UPDATE_RUN_ENTRY_SUCCESS, UPDATE_RUN_ENTRY_FAILURE],
      requestMethod: 'PUT',
      requestData: runEntryData,
    },
  };
}

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(LOGIN_URL, config)
      .then(response =>
        response.json()
          .then(responseData => ({ responseData, response })))
            .then(({ responseData, response }) => {
              if (response.ok) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', responseData.token);
                // Dispatch the success action
                dispatch(receiveLogin(responseData.token));
              } else {
                const errors = responseData.non_field_errors;
                dispatch(loginError(errors));
              }
            });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(receiveLogout());
  };
}

