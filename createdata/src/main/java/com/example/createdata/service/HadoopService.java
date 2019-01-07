package com.example.createdata.service;

import com.example.createdata.entity.EhrData;
import com.example.createdata.mapper.EhrMapper;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.lib.IdentityReducer;
import org.apache.hadoop.mapred.lib.db.DBConfiguration;
import org.apache.hadoop.mapred.lib.db.DBInputFormat;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.*;
import java.util.Date;
import java.util.List;

@Service
public class HadoopService {

    private static final String HDFS_PATH = "hdfs://10.0.3.247:9000/user/hadoop/ehr_data";
    private static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    private static final String MYSQL_PATH = "jdbc:mysql://localhost:3306/ehrdata";
    private static final String MYSQL_NAME = "root";
    private static final String MYSQL_PWD = "123456";
    private static final String MYSQL_TABLE_NAME = "ehr_data";

    private static final String HIVE_DRIVER = "org.apache.hive.jdbc.HiveDriver";
    private static final String HIVE_PATH = "jdbc:hive2://10.0.3.247:10000/default";

    public void importDataFromMysql() throws IOException {
        JobConf conf = new JobConf(HadoopService.class);
        conf.setOutputKeyClass(LongWritable.class);
        conf.setOutputValueClass(Text.class);
        conf.setInputFormat(DBInputFormat.class);
        Path path = new Path(HDFS_PATH);
        FileOutputFormat.setOutputPath(conf, path);
        DBConfiguration.configureDB(conf, MYSQL_DRIVER, MYSQL_PATH, MYSQL_NAME, MYSQL_PWD);
        String [] fields = {"id", "cid", "vid", "name", "gender", "birthday", "examdate", "bz8", "bz10", "bz11",
                "bz12", "bz16", "bz17", "bz18", "bz171", "bz172", "bz173", "bz174", "bz175", "bz268", "bz271",
                "bz272", "bz84", "bz85", "bz107", "bz108", "bz109", "bz110", "bz104", "bz105", "bz106", "bz113",
                "bz111", "bz112", "bz103", "bz120", "bz119", "bz121", "bz81", "bz82", "bz83"};
        DBInputFormat.setInput(conf, EhrData.class, MYSQL_TABLE_NAME, null, "id", fields);
        conf.setMapperClass(EhrMapper.class);
        conf.setReducerClass(IdentityReducer.class);
        JobClient.runJob(conf);
    }

    public long queryData(String sql) throws Exception {
        Class.forName(HIVE_DRIVER);
        Connection connection = DriverManager.getConnection(HIVE_PATH, "hadoop", "1qaz2wsx");
//        Class.forName(MYSQL_DRIVER);
//        Connection connection = DriverManager.getConnection(MYSQL_PATH, "root", "123456");
        PreparedStatement statement = connection.prepareStatement(sql);

        Date start = new Date();
        statement.execute();
        ResultSet resultSet = statement.getResultSet();

        int count = 0;
        while (resultSet.next()) {
            count++;
        }
        Date end = new Date();
        System.out.println(count);
        System.out.println(end.getTime() - start.getTime());

        statement.close();
        connection.close();
        return end.getTime() - start.getTime();
    }

}
