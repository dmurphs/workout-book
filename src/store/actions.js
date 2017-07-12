import { LOGIN_URL, WORKOUT_LIST_URL, CREATE_WORKOUT_URL, WORKOUT_DETAIL_URL,
  LIFT_ENTRY_LIST_URL, SET_LIST_URL, RUN_ENTRY_LIST_URL } from '@/settings';

import { CALL_API } from '@/middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const WORKOUT_LIST_REQUEST = 'WORKOUT_LIST_REQUEST';
export const WORKOUT_LIST_SUCCESS = 'WORKOUT_LIST_SUCCESS';
export const WORKOUT_LIST_FAILURE = 'WORKOUT_LIST_FAILURE';

export const CREATE_WORKOUT_REQUEST = 'CREATE_WORKOUT_REQUEST';
export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const CREATE_WORKOUT_FAILURE = 'CREATE_WORKOUT_FAILURE';

export const WORKOUT_DETAIL_REQUEST = 'WORKOUT_DETAIL_REQUEST';
export const WORKOUT_DETAIL_SUCCESS = 'WORKOUT_DETAIL_SUCCESS';
export const WORKOUT_DETAIL_FAILURE = 'WORKOUT_DETAIL_FAILURE';

export const LIFT_ENTRY_LIST_REQUEST = 'LIFT_ENTRY_LIST_REQUEST';
export const LIFT_ENTRY_LIST_SUCCESS = 'LIFT_ENTRY_LIST_SUCCESS';
export const LIFT_ENTRY_LIST_FAILURE = 'LIFT_ENTRY_LIST_FAILURE';

export const SET_LIST_REQUEST = 'SET_LIST_REQUEST';
export const SET_LIST_SUCCESS = 'SET_LIST_SUCCESS';
export const SET_LIST_FAILURE = 'SET_LIST_FAILURE';

export const RUN_ENTRY_LIST_REQUEST = 'RUN_ENTRY_LIST_REQUEST';
export const RUN_ENTRY_LIST_SUCCESS = 'RUN_ENTRY_LIST_SUCCESS';
export const RUN_ENTRY_LIST_FAILURE = 'RUN_ENTRY_LIST_FAILURE';

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

export function getWorkoutDetail(workoutID) {
  return {
    [CALL_API]: {
      endpoint: `${WORKOUT_DETAIL_URL}${workoutID}/`,
      types: [WORKOUT_DETAIL_REQUEST, WORKOUT_DETAIL_SUCCESS, WORKOUT_DETAIL_FAILURE],
      requestMethod: 'GET',
      requestData: {},
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
    },
  };
}

export function getRunEntries(runEntryID) {
  return {
    [CALL_API]: {
      endpoint: `${RUN_ENTRY_LIST_URL}${runEntryID}/`,
      types: [RUN_ENTRY_LIST_REQUEST, RUN_ENTRY_LIST_SUCCESS, RUN_ENTRY_LIST_FAILURE],
      requestMethod: 'GET',
      requestData: {},
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
