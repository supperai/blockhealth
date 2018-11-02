import request from '../../util/httpRequest';
import store from "../../store";

// const contract = require('truffle-contract')

export function queryEhr(param) {

    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    //todo
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {

        }
    } else {
        console.error('Web3 is not initialized.');
    }

    return dispatch => {
        request('/queryEhr',
            'GET',
            param,
            function (rep) {
                dispatch({
                    type: 'QUERY_EHR',
                    data: rep,
                });
            },
            dispatch);
    };
}