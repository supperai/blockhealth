package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.EhrService;
import com.example.demo.service.ProcessData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value="/")
@CrossOrigin
public class DataSqlController {
    @Autowired
    private EhrService ehrService;
    @Autowired
    private ProcessData processData;

    //通过vid查询某一病人的某几项数据
    @RequestMapping(value = "/getByVid",method = RequestMethod.POST)
    public List<List<Map<String,String>>> getByVid(@RequestBody EhrRequestForm ehrRequestForm){
        try {
            List<Object[]> temp=ehrService.getByVid(ehrRequestForm.getVid(), ehrRequestForm.getToken(), ehrRequestForm.getColumnList());
            return processData.Deal(ehrRequestForm.getColumnList(),temp);
        }catch(Exception e){
            return new ArrayList<>();
        }
    }

    //获取数据表中某几列数据
    @RequestMapping(value = "/getColumn",method = RequestMethod.POST)
    public Object getColumn(@RequestBody ColumnRequestForm columnRequestForm){
        return ehrService.getColumn(columnRequestForm.getToken(),columnRequestForm.getColumn());
    }

    //自定义sql语句查询
    @RequestMapping(value="/getColumnBySQL",method = RequestMethod.POST)
    public List<List<Map<String,String>>> getColumnBySQL(@RequestBody SQLRequestForm sqlRequestForm){
        List<Object[]> temp=ehrService.getColumnBySQL(sqlRequestForm.getToken(),sqlRequestForm.getSqlcolumn());
        return processData.Deal(sqlRequestForm.getSqlcolumn(),temp);
    }

    //授予权限
    @RequestMapping(value="/solveRequest",method =RequestMethod.POST)
    public String solveRequest(@RequestBody SolveRequestForm solveRequestForm){
        return ehrService.solveRequest(solveRequestForm.getName(),solveRequestForm.getAuth());
    }

    @RequestMapping(value="/getMiningData",method = RequestMethod.POST)
    public List<Object[]> getMiningData(@RequestBody SQLRequestForm sqlRequestForm){
        return ehrService.getColumnBySQL(sqlRequestForm.getToken(),sqlRequestForm.getSqlcolumn());
    }
}
