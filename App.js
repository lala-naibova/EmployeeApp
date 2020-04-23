import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Navigation from './src/navigation/EmployeeNavigation'
import { reducer } from './src/store/reducers/EmployeeReducer'

const store = createStore(reducer)

export default function App() {

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
        
  );
}


