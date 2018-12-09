package GetAddress;

import SmartContact.KernalContract_sol_KernalContract;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class getAddress {
    private KernalContract_sol_KernalContract kernalContract_sol_KernalContract = null;
    public boolean get() {
        //建立以太坊连接
        String URL = "http://127.0.0.1:8080/";
        Web3j web3j = Web3j.build(new HttpService(URL));

        //加载账户信息
        Credentials credentials = null;
        try {
            credentials = WalletUtils.loadCredentials("123", "H:/app/Ethereum/Blockchain Env/node2/keystore/UTC--2018-11-25T07-09-10.097000000Z--228e8a2bf3b4005de6c9551102d2156811d41f2c");
            System.out.println("credentials=" + credentials.getAddress());
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (CipherException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //部署 Compute_sol_Compute.java （智能合约）

        try {
            kernalContract_sol_KernalContract = KernalContract_sol_KernalContract.deploy(web3j, credentials, BigInteger.valueOf(200000), BigInteger.valueOf(20000000)).send();
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        //部署完成后打印合约地址
        String address1 = kernalContract_sol_KernalContract.getContractAddress();
        System.out.println(kernalContract_sol_KernalContract.getContractAddress());

        KernalContract_sol_KernalContract kernalContract_sol_kernalContract = KernalContract_sol_KernalContract.load(address1, web3j, credentials, BigInteger.valueOf(200000), BigInteger.valueOf(20000000));

        //查看合约是否可用
        boolean b=false;
        try {
            b=kernalContract_sol_kernalContract.isValid();
            System.out.println(b);
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        return b;

    }

    public List<String> split(){
        if (get()){
            RemoteCall<Utf8String> result = null;
            try {
                result = kernalContract_sol_KernalContract.getAllHpstName();
                System.out.println(result);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            List<String> addr= Arrays.asList(result.toString().split(","));
            return addr;
        }
        return new ArrayList<String>();
    }
}

