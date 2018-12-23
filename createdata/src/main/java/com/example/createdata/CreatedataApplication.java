package com.example.createdata;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.createdata.mapper")
public class CreatedataApplication {

    public static void main(String[] args) {
        SpringApplication.run(CreatedataApplication.class, args);
    }

}

