import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga'
import { reducer } from './reducers/reducer';
import { rootSaga } from './sagas/rootSaga';


const sagaMiddleWare = createSagaMiddleWare()

export const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare)))
    sagaMiddleWare.run(rootSaga)
