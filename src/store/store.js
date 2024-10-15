import { createStore, combineReducers } from 'redux';
import polls from '../reducers/polls';
import middleware from '../middleware'
import users from '../reducers/users';

export const rootReducer = combineReducers({
  polls,
  users,
});

const store = createStore(rootReducer, middleware);

export default store;