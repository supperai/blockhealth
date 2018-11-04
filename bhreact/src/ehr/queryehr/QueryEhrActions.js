import request from '../../util/httpRequest';
import store from "../../store";
import ListRequestContract from '../../../build/contracts/ListRequest.json'

const contract = require('truffle-contract')

export function queryEhr(param) {

    let web3 = store.getState().web3.web3Instance;

    // Double-check web3's status.
    //todo
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const listRequest = contract(ListRequestContract);
            listRequest.setProvider(web3.currentProvider);
            var listRequestInstance;

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                listRequest.deployed().then(function(instance) {
                    listRequestInstance = instance;
                    listRequestInstance.getHpstFromDss(param.diseaseName)
                        .then(function(result) {
                            var addressList = web3.toUtf8(result).split(',');
                            // addressList

                        })


                })
            })

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