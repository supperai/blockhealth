package com.example.demo.service;
import java.util.List;


import org.springframework.stereotype.Service;


@Service
public abstract class DataSqlService {
    public abstract List<String> getColumn(List<String> list1);
    public abstract List<Object[]> getInfoByVid(String name , List<String> list1);
    public abstract List<Object[]> getColumnBySQL(List<String> SQLColumn);
}
