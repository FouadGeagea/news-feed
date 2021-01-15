import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './store/reducers'
import NewsNavigator from './navigations/NewsNavigator'
import ReduxThunk from 'redux-thunk'
import {SafeAreaProvider} from 'react-native-safe-area-context'


const rootReducer = combineReducers({
  news: reducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <SafeAreaProvider >
    <Provider store={store}>
      <NewsNavigator />
    </Provider>
    </SafeAreaProvider>
  )
}

