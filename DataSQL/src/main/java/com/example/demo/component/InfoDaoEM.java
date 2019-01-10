package com.example.demo.component;

import com.example.demo.entity.Ehr;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class InfoDaoEM {

    @PersistenceContext
    EntityManager entityManager;

    //根据vid字段查找数据
    public List<Object[]> getInfoByVid(String vid , List<String> list){
        String SQL="select ";
        for(int i=0;i<list.size();i++){
            SQL+=list.get(i)+",";
        }
        SQL=SQL.substring(0,SQL.length()-1);
        //换表改表名和name改vid
        SQL=SQL+" from ehrdata WHERE vid=\""+vid+"\"";
        System.out.println(SQL);
        List<Object[]> result=entityManager.createNativeQuery(SQL).getResultList();
        return result;
    }

    //查找某几列字段的值
    public List<String> getColumn(List<String> list){
        String SQL="select ";
        for(int i=0;i<list.size();i++){
            SQL+=list.get(i)+",";
        }
        SQL=SQL.substring(0,SQL.length()-1);
        //换表改表名
        SQL=SQL+" from ehr";
        System.out.println(SQL);
        List<String> result=entityManager.createNativeQuery(SQL).getResultList();
        System.out.println(result.size());
        return result;
    }

    //自定义SQL语句查询
    public List<Object[]> getColumnBySQL(List<String> SQLColumn){
        String SQL="select ";
        for (int i = 0; i < SQLColumn.size(); i++) {
            SQL=SQL+SQLColumn.get(i);
            if(i != ( SQLColumn.size()-1 ) ){
                SQL+=",";
            }
        }
        SQL+=" FROM mdata";
        System.out.println(SQL);
        List<Object[]> result=entityManager.createNativeQuery(SQL).getResultList();
        return result;
    }

}
