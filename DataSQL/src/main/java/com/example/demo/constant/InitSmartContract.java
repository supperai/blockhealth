package com.example.demo.constant;

import com.example.demo.SmartContact.KernalContract_sol_KernalContract;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;

public class InitSmartContract {
    private static KernalContract_sol_KernalContract kernalContract_sol_kernalContract;

    public InitSmartContract() {
        //建立以太坊连接
        String URL = "http://127.0.0.1:4444/";
        Web3j web3j = Web3j.build(new HttpService(URL));

        //加载账户信息
        Credentials credentials = null;
        try {
            credentials = WalletUtils.loadCredentials("112233","H:/app/Ethereum/Blockchain Env/keystore/UTC--2018-11-16T04-33-59.589600000Z--0c4480d8dfa01b8bd5cea3d04321be6965f676a9");
            System.out.println("credentials=" + credentials.getAddress());
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (CipherException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //部署 Compute_sol_Compute.java （智能合约）
        KernalContract_sol_KernalContract kernalContract_sol_KernalContract = null;
        try {
            kernalContract_sol_KernalContract = KernalContract_sol_KernalContract.deploy(web3j, credentials, BigInteger.valueOf(200000), BigInteger.valueOf(20000000)).send();
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //部署完成后打印合约地址
        String address=kernalContract_sol_KernalContract.getContractAddress();
        System.out.println(kernalContract_sol_KernalContract.getContractAddress());

        kernalContract_sol_kernalContract=KernalContract_sol_KernalContract.load(address,web3j,credentials,BigInteger.valueOf(200000),BigInteger.valueOf(20000000));
    }

    public KernalContract_sol_KernalContract getKernalContract_sol_kernalContract() {
        return kernalContract_sol_kernalContract;
    }
}
