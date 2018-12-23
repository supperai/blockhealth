package com.example.demo;

import org.junit.Test;

import java.sql.*;

public class createdata {
    private String url = "jdbc:mysql://localhost:3306/blockhealth?rewriteBatchedStatements=true&serverTimezone=GMT%2B8";
    private String user = "root";
    private String password = "123456";
    @Test
    public void Test(){
        Connection conn = null;
        PreparedStatement pstm =null;
        ResultSet rt = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            String sql = "INSERT INTO ehr(cid,vid,xm,xb,csrq,yysj,mz,bz1,bz2,bz3,bz4,bz5,bz6,bz7,bz8,bz9,bz10,bz11,bz12,bz13,bz14,bz15,bz139,bz131,bz149,bz135,bz141,bz137,bz147,bz145,bz143," +
                    "bz204,bz205,bz206,bz152,bz153,bz155,bz157,bz160,bz158,bz159,bz102,bz154,bz130,bz151,bz144,bz134,bz142,bz132,bz162,bz163,bz165,bz146,bz136,bz115,bz116,bz117,bz118,bz128) " +
                    "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            pstm = conn.prepareStatement(sql);
            conn.setAutoCommit(false);
            java.util.Date date_util=new java.util.Date();
            java.sql.Date date=new java.sql.Date(date_util.getTime());
            Long startTime = System.currentTimeMillis();
            int i;
            for (int a = 900001; a <= 1000000; a++) {
                i=a-900000;
                pstm.setString(1, "cid_" + i);
                pstm.setString(2, "vid_" + a);
                pstm.setString(3, "xm_" + i);
                pstm.setString(4, "xb_" + i);
                pstm.setDate(5,date);
                pstm.setDate(6,date);
                pstm.setString(7, "mz" + i);
                pstm.setString(8, "bz1" + i);
                pstm.setString(9, "bz2" + i);
                pstm.setString(10, "bz3" + i);

                pstm.setString(11, "bz4" + i);
                pstm.setString(12, "bz5" + i);
                pstm.setString(13, "bz6" + i);
                pstm.setString(14, "bz7" + i);
                pstm.setString(15, "bz8" + i);
                pstm.setString(16, "bz9" + i);
                pstm.setString(17, "bz10" + i);
                pstm.setString(18, "bz11" + i);
                pstm.setString(19, "bz12" + i);
                pstm.setString(20, "bz13" + i);

                pstm.setString(21, "bz14" + i);
                pstm.setString(22, "bz15" + i);
                pstm.setString(23, "bz139" + i);
                pstm.setString(24, "bz131" + i);
                pstm.setString(25, "bz149" + i);
                pstm.setString(26, "bz135" + i);
                pstm.setString(27, "bz141" + i);
                pstm.setString(28, "bz137" + i);
                pstm.setString(29, "bz147" + i);
                pstm.setString(30, "bz145" + i);

                pstm.setString(31, "bz143" + i);
                pstm.setString(32, "bz204" + i);
                pstm.setString(33, "bz205" + i);
                pstm.setString(34, "bz206" + i);
                pstm.setString(35, "bz152" + i);
                pstm.setString(36, "bz153" + i);
                pstm.setString(37, "bz155" + i);
                pstm.setString(38, "bz157" + i);
                pstm.setString(39, "bz160" + i);
                pstm.setString(40, "bz158" + i);

                pstm.setString(41, "bz159" + i);
                pstm.setString(42, "bz102" + i);
                pstm.setString(43, "bz154" + i);
                pstm.setString(44, "bz130" + i);
                pstm.setString(45, "bz151" + i);
                pstm.setString(46, "bz144" + i);
                pstm.setString(47, "bz134" + i);
                pstm.setString(48, "bz142" + i);
                pstm.setString(49, "bz132" + i);
                pstm.setString(50, "bz162" + i);

                pstm.setString(51, "bz163" + i);
                pstm.setString(52, "bz165" + i);
                pstm.setString(53, "bz146" + i);
                pstm.setString(54, "bz136" + i);
                pstm.setString(55, "bz115" + i);
                pstm.setString(56, "bz116" + i);
                pstm.setString(57, "bz117" + i);
                pstm.setString(58, "bz118" + i);
                pstm.setString(59, "bz128" + i);

                pstm.addBatch();
            }
            pstm.executeBatch();
            conn.commit();
            Long endTime = System.currentTimeMillis();
            System.out.println("OK,用时：" + (endTime - startTime));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally{
            if(pstm!=null){
                try {
                    pstm.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            }
            if(conn!=null){
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
