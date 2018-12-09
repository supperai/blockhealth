import store from "../../store";
import KernelContract from '../../../build/contracts/KernelContract.json'
import {message} from "antd";
var request = require('superagent');

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
                                    if (addressList[i] !== '') {
                                        request.get(addressList[i] + '/getEhr')
                                            .query(param)
                                            .end(function (err, res) {
                                                if(err){
                                                    alert(err);
                                                } else {
                                                    dispatch({
                                                        type: 'QUERY_EHR',
                                                        data: res.body,
                                                    });
                                                }
                                            });
                                    }
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

export function queryEhrById(param) {

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
                    listRequestInstance.getAllHpst(param.diseaseName)
                        .then(function(result) {
                            let addressList = result.split(',');

                            return dispatch(() => {
                                for (let i=0; i<addressList.length; i++) {
                                    if (addressList[i] !== '') {
                                        request.get(addressList[i] + '/getEhrById')
                                            .query(param)
                                            .end(function (err, res) {
                                                if(err){
                                                    alert(err);
                                                } else {
                                                    dispatch({
                                                        type: 'QUERY_EHR',
                                                        data: res.body,
                                                    });
                                                }
                                            });
                                    }
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
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }

                var account = accounts[0];
                listRequest.deployed().then(function (instance) {
                    listRequestInstance = instance;
                    listRequestInstance.getAllDssName({from: account})
                        .then(function (result) {
                            return dispatch({
                                    type: 'GET_DISEASE_LIST',
                                    data: result,
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
            const listRequest = contract(KernelContract);
            listRequest.setProvider(web3.currentProvider);
            let listRequestInstance;
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log(error);
                }

                var account = accounts[0];
                listRequest.deployed().then(function (instance) {
                    listRequestInstance = instance;
                    // listRequestInstance.getToken({from: account})
                    //     .then(function () {
                    //         message.info("登录成功");
                    //     });
                    listRequestInstance.whatIsMyToken()
                        .then(function (result) {
                            return dispatch({
                                type: 'LOGIN',
                                data: result,
                            })
                        });
                })

            })
        }

    } else {
        console.error('Web3 is not initialized.');
    }
}
