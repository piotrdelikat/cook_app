import { createStore, combineReducers } from 'redux';

import ingredientsReducer from './reducers/ingredientsReducer';
import dishesReducer from './reducers/dishesReducer';
import searchReducer from './reducers/searchReducer';


const reducers = combineReducers({
  ingredientsReducer,
  dishesReducer,
  searchReducer
});

const store = createStore(reducers, {});

export default store;
