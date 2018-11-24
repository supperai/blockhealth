import request from '../../util/httpRequest';
import store from "../../store";
import KernelContract from '../../../build/contracts/KernelContract.json'

const contract = require('truffle-contract');

export function queryEhrByDisease(param) {

    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const listRequest = contract(KernelContract);
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

export function clearEhrs(param) {
    return {
        type: 'CLEAR_EHRS',
        data: param
    };
}

export function getDiseaseList() {

    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const listRequest = contract(KernelContract);
            listRequest.setProvider(web3.currentProvider);
            let listRequestInstance;

            web3.eth.getCoinbase((error, coinbase) => {

                if (error) {
                    console.error(error);
                }

                listRequest.deployed().then(function(instance) {
                    listRequestInstance = instance;
                    listRequestInstance.getAllDssName()
                        .then(function(result) {

                            return dispatch(() => {
                                return {
                                    type: 'GET_DISEASE_LIST',
                                    data: result,
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
