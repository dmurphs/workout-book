const BASE_URL = 'http://localhost:8000/';

export const LOGIN_URL = `${BASE_URL}api-token-auth/`;
export const LOGOUT_URL = `${BASE_URL}logout/`;

export const API_BASE_URL = `${BASE_URL}api/`;

export const CREATE_WORKOUT_URL = `${API_BASE_URL}create_workout/`;
export const UPDATE_WORKOUT_URL = `${API_BASE_URL}update_workout/`;
export const WORKOUT_DETAIL_URL = `${API_BASE_URL}workout_detail/`;
export const WORKOUT_LIST_URL = `${API_BASE_URL}list_workouts/`;

export const LIFT_ENTRY_LIST_URL = `${API_BASE_URL}list_lift_entries/`;
export const CREATE_LIFT_ENTRY_URL = `${API_BASE_URL}new_lift_entry/`;
export const UPDATE_LIFT_ENTRY_URL = `${API_BASE_URL}lift_entry_update/`;

export const LIFT_LIST_URL = `${API_BASE_URL}list_lifts/`;

export const SET_LIST_URL = `${API_BASE_URL}list_sets/`;
export const CREATE_SET_URL = `${API_BASE_URL}create_set/`;

export const RUN_ENTRY_LIST_URL = `${API_BASE_URL}list_run_entries/`;
export const CREATE_RUN_ENTRY_URL = `${API_BASE_URL}new_run_entry/`;
export const UPDATE_RUN_ENTRY_URL = `${API_BASE_URL}run_entry_update/`;
