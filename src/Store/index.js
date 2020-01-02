import { createStore } from 'redux';
import Reducers from './Ducks';

const store = createStore(Reducers);

export default store;
