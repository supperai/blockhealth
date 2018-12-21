package com.example.demo.component;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class InfoDaoEM {

    @PersistenceContext
    EntityManager entityManager;

    //根据vid字段查找数据
    public Object getInfoByVid(String vid , List<String> list){
        String SQL="select ";
        for(int i=0;i<list.size();i++){
            SQL+=list.get(i)+",";
        }
        SQL=SQL.substring(0,SQL.length()-1);
        //换表改表名和name改vid
        SQL=SQL+" from ehr WHERE vid=\""+vid+"\"";
        System.out.println(SQL);
        Object obj=entityManager.createNativeQuery(SQL).getSingleResult();
        return obj;
    }

    //查找某几列字段的值
    public List<List<Object>> getColumn(List<String> list){
        String SQL="select ";
        for(int i=0;i<list.size();i++){
            SQL+=list.get(i)+",";
        }
        SQL=SQL.substring(0,SQL.length()-1);
        //换表改表名
        SQL=SQL+" from ehr";
        System.out.println(SQL);
        List<List<Object>> result=entityManager.createNativeQuery(SQL).getResultList();
        System.out.println(result.size());
        return result;
    }
}
