package com.example.demo.service;

import com.example.demo.entity.Web3jConnection;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;


@Service
public class EhrService {

    @Autowired DataSqlService dataSqlService;

    public List<Object[]> getByVid(String name,String token,List<String> list1) {
        if(authVert(token)) {
            return dataSqlService.getInfoByVid(name, list1);
        } else {
            throw new RuntimeException("无权限！");
        }
    }

    public List<String> getColumn(String token,List<String> list2){
        //权限验证
        if(authVert(token)) {
            return dataSqlService.getColumn(list2);
        } else {
            throw new RuntimeException("无权限！");
        }
    }

    public List<Object[]> getColumnBySQL(String token, List<String> SQLColumn){
        if(authVert(token)) {
            return dataSqlService.getColumnBySQL(SQLColumn);
        } else {
            throw new RuntimeException("无权限！");
        }
    }

    @Autowired
    private Web3jConnection web3jConnection;

    public String solveRequest(String name,int auth){

        try {
            //对要调用的方法名转码
            Function function=new Function("solveRqst", Arrays.asList(new Utf8String(name)), Lists.newArrayList());
            String encodedFunction = FunctionEncoder.encode(function);

            //获取nonce,用作此次交易的标识
            EthGetTransactionCount ethGetTransactionCount = web3jConnection.getWeb3j().ethGetTransactionCount(web3jConnection.getCredentials().getAddress(), DefaultBlockParameterName.LATEST).sendAsync().get();
            BigInteger nonce = ethGetTransactionCount.getTransactionCount();

            //发起调用方法的交易
            Transaction transaction = Transaction.createFunctionCallTransaction( "0xa16be9d29747ea312030b13b21cc50b59f1af997", nonce, web3jConnection.getSmartContract().GAS_PRICE,web3jConnection.getSmartContract().GAS_LIMIT, "0xe696d0d3ac6f059fb35db2a05b1a3326b665544d", encodedFunction);

            //获得TransactionResponse
            org.web3j.protocol.core.methods.response.EthSendTransaction transactionResponse = web3jConnection.getWeb3j().ethSendTransaction(transaction).sendAsync().get();
            String transactionHash = transactionResponse.getTransactionHash();
            if (StringUtils.isEmpty(transactionHash)) {
                throw new RuntimeException("交易失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return "SUCCESS";
    }


    public Boolean authVert(String token){
        Bool result = null;
        try {
            System.out.println(token);
            result=web3jConnection.getSmartContract().tokenVerification(new Utf8String(token)).send();
            System.out.println(result.getValue());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return result.getValue();
    }
}
