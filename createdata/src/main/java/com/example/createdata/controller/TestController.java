package com.example.createdata.controller;

import com.example.createdata.service.CreateDataService;
import com.example.createdata.service.HadoopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private CreateDataService createDataService;
    @Autowired
    private HadoopService hadoopService;

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create() {
        createDataService.createData();
        return "SUCCESS";
    }

    @RequestMapping(value = "/importData", method = RequestMethod.GET)
    public String importData() throws Exception{
        hadoopService.importDataFromMysql();
        return "SUCCESS";
    }

    @RequestMapping(value = "/queryData", method = RequestMethod.GET)
    public long queryData(String sql) throws Exception{
        return hadoopService.queryData(sql);
    }
}
