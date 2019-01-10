import store from "../../store";
import KernelContract from '../../../build/contracts/KClite.json';
import {message} from "antd";
var request = require('superagent');

const contract = require('truffle-contract');

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
                    listRequestInstance.getHpstIp()
                        .then(function(result) {
                            let addressList = result.split(',');

                            return dispatch(() => {
                                for (let i=0; i<addressList.length; i++) {
                                    if (addressList[i] !== '') {
                                        request.post(addressList[i] + '/getByVid')
                                            .send(param)
                                            .end(function (err, res) {
                                                if(err){
                                                    message.error("节点"+i+"查询失败！");
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

export function login() {

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
                    listRequestInstance.getToken({from: account})
                        .then(function () {
                            message.info("登录成功");
                            listRequestInstance.whatIsMyToken()
                                .then(function (result) {
                                    return dispatch({
                                        type: 'LOGIN',
                                        data: result,
                                    })
                                });
                        });
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

                listRequest.deployed().then(function (instance) {
                    listRequestInstance = instance;
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