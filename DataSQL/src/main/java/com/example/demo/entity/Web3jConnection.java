package com.example.demo.entity;

import com.example.demo.SmartContact.KCliteWithToken2_sol_KCliteWithToken2;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;

@Component
public class Web3jConnection implements ApplicationListener<ContextRefreshedEvent> {

    private KCliteWithToken2_sol_KCliteWithToken2 smartContract;
    private Credentials credentials;
    private Web3j web3j;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        String URL = "http://127.0.0.1:8080/";
        web3j = Web3j.build(new HttpService(URL));

        //加载账户信息
        try {
            credentials = WalletUtils.loadCredentials("123","D:/Blockchain/node6/keystore/UTC--2019-01-08T13-47-49.609770800Z--a16be9d29747ea312030b13b21cc50b59f1af997");
            System.out.println("credentials=" + credentials.getAddress());
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (CipherException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //合约地址
        String address1="0xe696d0d3ac6f059fb35db2a05b1a3326b665544d";
        smartContract = KCliteWithToken2_sol_KCliteWithToken2.load(address1,web3j,credentials, BigInteger.valueOf(200000),BigInteger.valueOf(20000000));
    }

    public KCliteWithToken2_sol_KCliteWithToken2 getSmartContract() {
        return smartContract;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public Web3j getWeb3j() {
        return web3j;
    }
}
