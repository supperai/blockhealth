package com.example.demo.controller;


import com.example.demo.GetData.getData;
import com.example.demo.entity.getColumnBySQLForm;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.WriteCSV;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping(value="/")
@CrossOrigin
public class DataMiningController {
    @Autowired
    private WriteCSV writeCSV;
    @Autowired
    private getData getdata;

    @RequestMapping(value = "/getMiningData",method = RequestMethod.POST)
    public String getMiningData(@RequestBody getColumnBySQLForm form){
        writeCSV.write(getdata.getString(form.getSqlcolumn()));
        return writeCSV.getFilePath();
    }
}
