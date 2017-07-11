import { LOGIN_URL, CREATE_WORKOUT_URL } from '@/settings';

import { CALL_API } from '@/middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const CREATE_WORKOUT_REQUEST = 'CREATE_WORKOUT_REQUEST';
export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const CREATE_WORKOUT_FAILURE = 'CREATE_WORKOUT_FAILURE';

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

// function requestCreateWorkout(workoutData) {
//   return {
//     type: CREATE_WORKOUT_REQUEST,
//     isFetching: true,
//     workoutData,
//   };
// }

// function receiveCreateWorkout(newWorkoutData) {
//   return {
//     type: CREATE_WORKOUT_SUCCESS,
//     isFetching: false,
//     newWorkoutData,
//   };
// }

// function createWorkoutError(errors) {
//   return {
//     type: CREATE_WORKOUT_FAILURE,
//     isFetching: false,
//     errors,
//   };
// }

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
/*eslint-disable*/
// export function createWorkout(workoutData) {
//   const token = localStorage.getItem('token');

//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Token ${token}`,
//     },
//     body: `name=${workoutData.workoutName}&description=${workoutData.description}&date=${workoutData.date}`,
//   };

//   return (dispatch) => {
//     dispatch(requestCreateWorkout(workoutData));

//     return fetch(CREATE_WORKOUT_URL, config)
//       .then(response =>
//         response.json()
//           .then(responseData => ({ responseData, response })))
//             .then(({ responseData, response }) => {
//               if (response.ok) {
//                 dispatch(receiveCreateWorkout(responseData));
//               } else {
//                 dispatch(createWorkoutError(responseData));
//               }
//             }).catch(err => console.log('Error: ', err)); // eslint-disable-line no-console
//   };
// }
/*eslint-enable*/
