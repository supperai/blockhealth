package com.example.demo.GetData;

import com.example.demo.GetAuth.getAuth;
import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.example.demo.entity.getColumnBySQLForm;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;


@Service
public class getData {
    public HttpClient getHttpClient(){
        HttpClient httpClient = new DefaultHttpClient();
        httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 200000);
        httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 200000);
        return httpClient;
    }


    public List<String> getResultByPost(List<String> Sqlcolumn) {
        getAuth g=new getAuth();
        g.get();
        getColumnBySQLForm gCBSQLF = new getColumnBySQLForm();
        gCBSQLF.setSqlcolumn(Sqlcolumn);
        gCBSQLF.setToken(g.getToken());
        List<String> addresslist=g.split();
        List<String> strResult=new ArrayList<>();
        for(int i = 0 ; i<addresslist.size() ; i++){
            try {
                String address = addresslist.get(i);
                HttpPost httpPost = new HttpPost(address + "/getMiningData");
                StringEntity stringEntity = new StringEntity(JSON.toJSONString(gCBSQLF), Charset.forName("UTF-8"));
                stringEntity.setContentType("application/json");
                httpPost.setHeader("Content-type", "application/json; charset=utf-8");
                httpPost.setHeader("Connection", "Close");
                httpPost.setEntity(stringEntity);
                HttpClient httpClient = this.getHttpClient();
                HttpResponse httpResponse = httpClient.execute(httpPost);
                if (httpResponse.getStatusLine().getStatusCode() == 200) {
                    // 得到httpResponse的实体数据
                    try{
                        String tmp=EntityUtils.toString( httpResponse.getEntity() );
                        System.out.println(tmp);
                        strResult.add(tmp);
                    }catch(IllegalStateException e){
                        // TODO Auto-generated catch block  
                        e.printStackTrace();
                    }catch(IOException e){
                        // TODO Auto-generated catch block  
                        e.printStackTrace();
                    }
                }
            }catch (Exception e) {
                System.out.println("http failed");
            }

        }
        return strResult;
    }

    public List<String[]> getString(List<String> Sqlcolumn){
        List<String> strResult=this.getResultByPost(Sqlcolumn);
        String[] rettmp = new String[]{};
        List<String[]> ret = Lists.newArrayList();
        try {
            for (int i = 0; i < strResult.size(); i++) {
                String retList=strResult.get(i);
                System.out.println(retList);
                rettmp=retList.split("]");
                for (int j = 0; j < rettmp.length; j++) {
                    String[] tmp1=new String[]{};
                    tmp1=rettmp[j].split("\\[|,");
                    String[] tmp2=new String[tmp1.length];
                    for (int k = 0; k < tmp1.length-2; k++) {
                        tmp2[k]=tmp1[k+2];
                    }
                    ret.add(tmp2);
                }
            }


            return ret;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<String[]>() ;
    }
}

