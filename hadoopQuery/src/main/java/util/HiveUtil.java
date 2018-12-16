package util;

import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.SQLException;

import java.sql.PreparedStatement;

import java.sql.ResultSet;

public class HiveUtil {

    private static String driverName ="org.apache.hive.jdbc.HiveDriver";

    //填写hive的IP，之前在配置文件中配置的IP

    private static String Url="jdbc:hive2://localhost:10000/default";

    private static Connection conn;

    private static PreparedStatement ps;

    private static ResultSet rs;

    //创建连接

    public static Connection getConnection(){

        try {

            Class.forName(driverName);

            //此处的用户名一定是有权限操作HDFS的用户，否则程序会提示"permission deny"异常

            conn = DriverManager.getConnection(Url,"vagrant","vagrant");

        } catch(ClassNotFoundException e)  {

            e.printStackTrace();

            System.exit(1);

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return conn;

    }

    public static PreparedStatement prepare(Connection conn, String sql) {

        PreparedStatement ps = null;

        try {

            ps = conn.prepareStatement(sql);

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return ps;

    }

    public static void getAll(String tableName) {

        conn= getConnection();

        String sql="select * from "+tableName;

        try {

            ps=prepare(conn, sql);

            rs=ps.executeQuery();

        } catch (SQLException e) {

            e.printStackTrace();

        }

    }

}
