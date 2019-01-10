package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class ProcessData {
    public List<List<Map<String,String>>> Deal(List<String> columnname,List<Object[]> temp){
        List<List<Map<String,String>>> result=new ArrayList<>();
        List<Map<String,String>> restmp=new ArrayList<>();
        for (int i = 0; i < temp.size(); i++) {
            Object[] objtmp=temp.get(i);
            for(int j=0; j < columnname.size(); j++){
                Map<String,String> oneResult=new HashMap<String, String>();
                if(objtmp[j]!=null){
                    oneResult.put("value",objtmp[j].toString());
                    oneResult.put("columnname",columnname.get(j));
                    oneResult.put("hspt","第一医院");
                    restmp.add(oneResult);
                }
            }
            result.add(restmp);

        }
        return result;
    }
}
