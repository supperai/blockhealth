import store from "../../store";
import KernelContract from '../../../build/contracts/KClite.json'
import {message} from 'antd';

const contract = require('truffle-contract');

export function signUp(param) {

    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        const listRequest = contract(KernelContract);
        listRequest.setProvider(web3.currentProvider);
        let listRequestInstance;
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            listRequest.deployed().then(function(instance) {
                listRequestInstance = instance;
                listRequestInstance.sendRqst(param.name, param.ip, {from: account})
                    .then(function() {
                        message.info("申请成功，请等待审核");
                    })
            })
        })

    } else {
        console.error('Web3 is not initialized.');
    }

}
