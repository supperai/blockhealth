package service;


import util.HiveUtil;

import java.util.Date;

public class QueryService {

    public static void main(String[] args) {
        String tableName="ehrdata";

        Date start = new Date();
        HiveUtil.getAll(tableName);
        Date end = new Date();
        System.out.println(end.getTime() - start.getTime());
    }


}
