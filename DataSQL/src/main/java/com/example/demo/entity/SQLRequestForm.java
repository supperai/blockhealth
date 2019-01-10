package com.example.demo.entity;

import java.util.List;

public class SQLRequestForm {
    private String token;
    private List<String> sqlcolumn;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getSqlcolumn() {
        return sqlcolumn;
    }

    public void setSqlcolumn(List<String> sqlcolumn) {
        this.sqlcolumn = sqlcolumn;
    }
}
