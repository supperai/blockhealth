import store from "../../store";
import ListRequestContract from '../../../build/contracts/ListRequest.json'
import {message} from 'antd';

const contract = require('truffle-contract')

export function addHospital(param) {

    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {

        const listRequest = contract(ListRequestContract);
        listRequest.setProvider(web3.currentProvider);
        let listRequestInstance;
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            listRequest.deployed().then(function(instance) {
                listRequestInstance = instance;
                listRequestInstance.loadHsptInfo(param.name, param.ip, param.diseaseList, {from: account})
                    .then(function(result) {
                        if (result === 'SUCCESS') {
                            message.info("添加新节点成功！");
                        } else {
                            message.error("添加新节点失败，请重新添加！");
                        }
                    })
            })

        })


    } else {
        console.error('Web3 is not initialized.');
    }

}
