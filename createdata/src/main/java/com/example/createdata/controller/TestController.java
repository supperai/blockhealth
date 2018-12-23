package com.example.createdata.controller;

import com.example.createdata.service.CreateDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private CreateDataService createDataService;

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public void create() {
        createDataService.createData();
    }

}
