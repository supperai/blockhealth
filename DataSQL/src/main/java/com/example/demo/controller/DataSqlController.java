package com.example.demo.controller;

import com.example.demo.entity.ColumnRequestForm;
import com.example.demo.entity.EhrRequestForm;
import com.example.demo.entity.SQLRequestForm;
import com.example.demo.service.EhrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value="/")
@CrossOrigin
public class DataSqlController {
    @Autowired
    private EhrService ehrService;

    //通过vid查询某一病人的某几项数据
    @RequestMapping(value = "/getByVid",method = RequestMethod.POST)
    public Object getByVid(@RequestBody EhrRequestForm ehrRequestForm){
        return ehrService.getByVid(ehrRequestForm.getVid(),ehrRequestForm.getToken(),ehrRequestForm.getColumnList());
    }

    //获取数据表中某几列数据
    @RequestMapping(value = "/getColumn",method = RequestMethod.POST)
    public Object getColumn(@RequestBody ColumnRequestForm columnRequestForm){
        return ehrService.getColumn(columnRequestForm.getToken(),columnRequestForm.getColumn());
    }

    //自定义sql语句查询
    @RequestMapping(value = "/getColumnBySQL",method = RequestMethod.POST)
    public Object getColumnBySQL(@RequestBody SQLRequestForm sqlRequestForm){
        return ehrService.getColumnBySQL(sqlRequestForm.getToken(),sqlRequestForm.getSql());
    }
}
