package com.example.demo.GetAuth;

import com.example.demo.SmartContract.KCliteWithToken2_sol_KCliteWithToken2;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

public class getAuth {
    private KCliteWithToken2_sol_KCliteWithToken2 smartContract = null;
    private Credentials credentials = null;
    Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:8080/"));
    public boolean get() {
        //建立以太坊连接
//        String URL = "";
//        Web3j web3j = Web3j.build(new HttpService(URL));

        //加载账户信息
        try {
            credentials = WalletUtils.loadCredentials("123", "H:/app/Ethereum/Blockchain Env/node5/keystore/UTC--2018-12-22T07-27-09.853000000Z--ce64c933e5570ba77b7825f97804b7dcecb184ae");
            System.out.println("credentials=" + credentials.getAddress());
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (CipherException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //合约地址
        String address1 ="0xe696d0d3ac6f059fb35db2a05b1a3326b665544d";

        //加载合约
        smartContract = KCliteWithToken2_sol_KCliteWithToken2.load(address1, web3j, credentials, BigInteger.valueOf(2000000), BigInteger.valueOf(50000000));

        return true;

    }
    public String getToken(){
        String token="";
        try {
            Function function=new Function("getToken", Lists.newArrayList(),Lists.newArrayList());
            String encodedFunction = FunctionEncoder.encode(function);

            EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(credentials.getAddress(), DefaultBlockParameterName.LATEST).sendAsync().get();
            BigInteger nonce = ethGetTransactionCount.getTransactionCount();

            Transaction transaction = Transaction.createFunctionCallTransaction( "0xce64c933e5570ba77b7825f97804b7dcecb184ae", nonce, smartContract.GAS_PRICE,smartContract.GAS_LIMIT, "0xe696d0d3ac6f059fb35db2a05b1a3326b665544d", encodedFunction);

            org.web3j.protocol.core.methods.response.EthSendTransaction transactionResponse = web3j.ethSendTransaction(transaction).sendAsync().get();
            String transactionHash = transactionResponse.getTransactionHash();
            if (StringUtils.isEmpty(transactionHash)){
                throw new RuntimeException("token failed");
            }
            token=smartContract.whatIsMyToken().send().toString();
            System.out.println(token);
            return token;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("failed get token");
            throw new RuntimeException(e);
        }
    }

    public List<String> split(){
        String hsptname = null;
        try {
            hsptname = smartContract.getHpstIp().send().toString();
            System.out.println(hsptname);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        List<String> addr= Arrays.asList(hsptname.split(","));
        return addr;
    }



}

