import {applyMiddleware, createStore} from 'redux'
import rootReduser from './mainReduser'
//import composeWithDevTools from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(rootReduser,applyMiddleware(thunk))

export default store