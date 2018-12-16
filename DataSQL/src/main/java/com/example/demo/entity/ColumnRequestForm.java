package com.example.demo.entity;

import java.util.List;

public class ColumnRequestForm {

    private String token;
    private List<String> column;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getColumn() {
        return column;
    }

    public void setColumn(List<String> column) {
        this.column = column;
    }
}
