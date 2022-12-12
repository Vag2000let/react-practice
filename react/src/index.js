import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import "bootstrap/dist/css/bootstrap.min.css"
import {injectStoreToServer} from "./actions/server";
// import createSagaMiddleWare from 'redux-saga'
// import { rootSaga } from './sagas/rootSaga';
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './epics/rootEpic'

// const sagaMiddleWare = createSagaMiddleWare()
const epicMiddleWare = createEpicMiddleware()

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(epicMiddleWare)))
    epicMiddleWare.run(rootEpic)

injectStoreToServer(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);