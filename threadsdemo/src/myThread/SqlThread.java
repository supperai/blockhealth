package myThread;


import com.sun.deploy.net.HttpResponse;
import ehr.bplist;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.lang.String;

public class SqlThread implements Callable<List> {
    private String address;
    private String queryItem;
    private int amount;
    @Resource
    private CloseableHttpClient httpClient;

    public SqlThread(String addr, String queryItem, int am) {
        this.address = addr;
        this.amount = am;
        this.queryItem = queryItem;
    }

    @Override
    public List<bplist> call() {
        HttpGet httpGet = new HttpGet(address + "/queryEhr?queryItem=" + queryItem);
        HttpResponse httpResponse = httpCilent.execute(httpGet);
        return EntityUtils.toString(httpResponse.getEntity());
    }
}
