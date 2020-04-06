import React from 'react';
import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';
import MealsNavigator from './navigation/MealNavigator';
import mealsReducer from './store/reducers/meals';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
