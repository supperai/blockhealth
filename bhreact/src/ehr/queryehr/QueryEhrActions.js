import request from '../../util/httpRequest';
import store from "../../store";
import ListRequestContract from '../../../build/contracts/ListRequest.json'
import AuthenticationContract from '../../../build/contracts/Authentication.json'

const contract = require('truffle-contract')

export function queryEhr(param) {

    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const listRequest = contract(ListRequestContract);
            listRequest.setProvider(web3.currentProvider);
            let listRequestInstance;

            web3.eth.getCoinbase((error, coinbase) => {

                if (error) {
                    console.error(error);
                }

                listRequest.deployed().then(function(instance) {
                    listRequestInstance = instance;
                    listRequestInstance.getHpstFromDss(param.diseaseName)
                        .then(function(result) {
                            let addressList = result.split(',');

                            return dispatch(() => {
                                for (let i=0; i<addressList.length; i++) {
                                    request(addressList[i] + '/queryEhr',
                                        'GET',
                                        param,
                                        function (rep) {
                                            dispatch({
                                                type: 'QUERY_EHR',
                                                data: rep,
                                            });
                                        },
                                        dispatch);
                                }
                            })
                        })
                })

            })

        }
    } else {
        console.error('Web3 is not initialized.');
    }

}

export function getToken() {
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const authentication = contract(AuthenticationContract);
            authentication.setProvider(web3.currentProvider);
            let authenticationInstance;

            web3.eth.getCoinbase((error, coinbase) => {

                if (error) {
                    console.error(error);
                }

                authentication.deployed().then(function(instance) {
                    authenticationInstance = instance;
                    authenticationInstance.login()
                        .then(function(result) {

                            return {
                                type: 'GET_TOKEN',
                                data: result,
                            }
                        })
                })

            })

        }
    } else {
        console.error('Web3 is not initialized.');
    }
}