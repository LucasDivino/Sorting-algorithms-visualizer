import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setIsRunning: ['isRunning']
});

const INITIAL_STATE = false;

// eslint-disable-next-line no-unused-vars
const set = (_state = INITIAL_STATE, action) => action.isRunning;

export default createReducer(INITIAL_STATE, {
  [Types.SET_IS_RUNNING]: set
});
