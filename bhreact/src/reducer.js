import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import web3Reducer from './util/web3/web3Reducer'
import queryEhrReducer from './ehr/queryehr/queryEhrReducer'

const reducer = combineReducers({
    routing: routerReducer,
    web3: web3Reducer,
    queryEhr: queryEhrReducer
});

export default reducer
