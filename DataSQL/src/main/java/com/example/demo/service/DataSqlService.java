package com.example.demo.service;
import java.util.List;


import org.springframework.stereotype.Service;


@Service
public abstract class DataSqlService {
    public abstract List<List<Object>> getColumn(List<String> list1);
    public abstract Object getInfoByVid(String name , List<String> list1);
}
