import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import web3Reducer from './util/web3/web3Reducer'
import queryEhrReducer from './ehr/queryehr/queryEhrReducer'
import authorizeReducer from './ehr/authorize/AuthorizeReducer';

const reducer = combineReducers({
    routing: routerReducer,
    web3: web3Reducer,
    queryEhr: queryEhrReducer,
    authorize: authorizeReducer
});

export default reducer
