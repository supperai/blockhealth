package com.example.blockhealthDEMO.controller;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

import com.Computedemo.Compute_sol_Compute;

import okhttp3.OkHttpClient;

@Controller
@EnableAutoConfiguration
public class samplecontroller {
	
	@RequestMapping("/index")
    public void home() {
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
		Compute_sol_Compute compute_sol_compute = null;
		try {
			compute_sol_compute = Compute_sol_Compute.deploy(web3j, credentials, BigInteger.valueOf(200000), BigInteger.valueOf(20000000)).send();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		//部署完成后打印合约地址
		String address=compute_sol_compute.getContractAddress();
		System.out.println(compute_sol_compute.getContractAddress());
		
		//加载智能合约
		Compute_sol_Compute cso = Compute_sol_Compute.load(address,web3j,credentials,BigInteger.valueOf(200000),BigInteger.valueOf(20000000));
		
		//查看合约是否可用
		try {
			System.out.println(cso.isValid());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		//调用合约中getLCM方法
		Uint256 first = new Uint256(2);
		Uint256 second = new Uint256(3);
		TransactionReceipt transactionReceipt = null;
		try {
			transactionReceipt = cso.getLCM(first, second).send();
			//打印本次交易的信息
			System.out.println(transactionReceipt);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//打印本次交易的信息
		
		//使用监听事件，获取合约结果
		Compute_sol_Compute.GetLCMEventResponse result = cso.getGetLCMEvents(transactionReceipt).get(0);
		System.out.println(result.first.getValue());
		System.out.println(result.second.getValue());
		System.out.println(result.result.getValue());
		
		//调用 getRecord 方法
		Uint256 index = new Uint256(0);
		List<Uint256> result1 = null;
		try {
			result1 = cso.getRecord(index).send().getValue();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (Uint256 uint256 : result1) {     
			System.out.println(uint256.getValue());
		}
		
	}
}
