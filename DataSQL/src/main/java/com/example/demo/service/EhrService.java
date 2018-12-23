package com.example.demo.service;
import com.example.demo.SmartContact.KCwithoutTime_sol_KernalContract;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;


@Service
public class EhrService {

    @Autowired DataSqlService dataSqlService;

    public Object getByVid(String name,String token,List<String> list1) {
        // TODO: 2018/12/14  补权限验证
        return dataSqlService.getInfoByVid(name,list1);
    }

    public List<List<Object>> getColumn(String token,List<String> list2){
        //权限验证
        if(authVert(token)) {
            return dataSqlService.getColumn(list2);
        } else {
            throw new RuntimeException("无权限！");
        }
    }

    public Boolean authVert(String token){
        //建立以太坊连接
        String URL = "http://127.0.0.1:8080/";
        Web3j web3j = Web3j.build(new HttpService(URL));

        //加载账户信息
        Credentials credentials = null;
        try {
            credentials = WalletUtils.loadCredentials("123","/home/jhb/privateBlockchain/node2/keystore/UTC--2018-12-20T13-01-53.934478721Z--68ea2e08d9c085020388d72c1d5b72b3f85dc82a");
            System.out.println("credentials=" + credentials.getAddress());
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (CipherException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String address1="0x906c2c7f637e34f0194806731d347b8875f93174";
        KCwithoutTime_sol_KernalContract kCwithoutTime_sol_kernalContract=KCwithoutTime_sol_KernalContract.load(address1,web3j,credentials,BigInteger.valueOf(200000),BigInteger.valueOf(20000000));

        Bool result = null;
        try {
            result=kCwithoutTime_sol_kernalContract.tokenVerification(new Utf8String(token)).send();
            System.out.println(result.getValue());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return result.getValue();
    }
}
