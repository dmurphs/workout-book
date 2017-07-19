// middleware/api.js

// import { REFRESH_TOKEN_URL } from '@/settings';
import { LOGIN_FAILURE } from '@/store/actions';

function getRequestDataString(data) {
  return Object
    .keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
  ;
}

// function refreshToken() {
//   const token = localStorage.getItem('token') || null;
//   if (!token) {
//     const err = 'No token saved!';
//     throw err;
//   }

//   const config = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: `token=${token}`,
//   };

//   fetch(REFRESH_TOKEN_URL, config)
//     .then(response =>
//       response.json()
//         .then(responseData => ({ responseData, response })))
//           .then(({ responseData, response }) => {
//             if (response.ok) {
//               localStorage.setItem('token', responseData.token);
//             } else {
//               const errors = responseData.non_field_errors; // eslint-disable-line
//             }
//           });
// }

function callApi(endpointURL, requestMethod, requestData = {}) {
  let config = {}; //eslint-disable-line

  config.headers = {};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  config.method = requestMethod;

  let requestURL = '';
  if (requestMethod === 'GET' && requestData !== {}) {
    requestURL = `${endpointURL}?${getRequestDataString(requestData)}`;
  } else {
    requestURL = endpointURL;
  }

  const token = localStorage.getItem('token') || null;
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  } else {
    const err = 'No token saved!';
    throw err;
  }

  if (requestMethod === 'POST' || requestMethod === 'PUT') {
    config.body = getRequestDataString(requestData);
  }

  return fetch(requestURL, config)
    .then(response =>
      response.json().then(responseData => ({ responseData, response })),
    ).then(({ responseData, response }) => {
      if (!response.ok) {
        return Promise.reject(responseData);
      }

      // refreshToken();
      return responseData;
    });
}

export const CALL_API = Symbol('Call API');

export default () => next => (action) => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, requestMethod, requestData, parentID } = callAPI;

  const [requestType, successType, errorType] = types; // eslint-disable-line no-unused-vars

  next({
    type: requestType,
  });

  return callApi(endpoint, requestMethod, requestData).then(
    response =>
      next({
        response,
        type: successType,
        parentID,
      }),
    (error) => {
      next({
        errors: error || 'There was an error.',
        type: errorType,
      });

      if (error.detail === 'Signature has expired.') {
        next({
          type: LOGIN_FAILURE,
        });
      }
    },
  );
};
