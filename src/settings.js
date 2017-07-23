// URL Constants
const BASE_URL = 'http://localhost:8000/';

export const LOGIN_URL = `${BASE_URL}api-token-auth/`;
export const LOGOUT_URL = `${BASE_URL}logout/`;
export const REGISTER_URL = `${BASE_URL}register/`;
export const REFRESH_TOKEN_URL = `${BASE_URL}api-token-refresh/`;

export const API_BASE_URL = `${BASE_URL}api/`;

export const CREATE_WORKOUT_URL = `${API_BASE_URL}workout_create/`;
export const UPDATE_WORKOUT_URL = `${API_BASE_URL}workout_update/`;
export const WORKOUT_DETAIL_URL = `${API_BASE_URL}workout_detail/`;
export const WORKOUT_LIST_URL = `${API_BASE_URL}workouts_list/`;

export const LIFT_ENTRY_LIST_URL = `${API_BASE_URL}lift_entries_list/`;
export const CREATE_LIFT_ENTRY_URL = `${API_BASE_URL}lift_entry_create/`;
export const UPDATE_LIFT_ENTRY_URL = `${API_BASE_URL}lift_entry_update/`;

export const LIFT_LIST_URL = `${API_BASE_URL}lifts_list/`;
export const CREATE_LIFT_URL = `${API_BASE_URL}lift_create/`;
export const UPDATE_LIFT_URL = `${API_BASE_URL}lift_update/`;

export const SET_LIST_URL = `${API_BASE_URL}sets_list/`;
export const CREATE_SET_URL = `${API_BASE_URL}set_create/`;
export const UPDATE_SET_URL = `${API_BASE_URL}set_update/`;

export const RUN_ENTRY_LIST_URL = `${API_BASE_URL}run_entries_list/`;
export const CREATE_RUN_ENTRY_URL = `${API_BASE_URL}run_entry_create/`;
export const UPDATE_RUN_ENTRY_URL = `${API_BASE_URL}run_entry_update/`;

// JWT Constants
export const JWT_REFRESH_TIME_THRESHOLD = 300; // in seconds
