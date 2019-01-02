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

@Service
public class HadoopService {


    public static void main(String[] args) throws IOException {
        JobConf conf = new JobConf(HadoopService.class);
        conf.setOutputKeyClass(LongWritable.class);
        conf.setOutputValueClass(Text.class);
        conf.setInputFormat(DBInputFormat.class);
        Path path = new Path("hdfs://10.0.3.247:9000/user/hadoop/ehr_data");
        FileOutputFormat.setOutputPath(conf, path);
        DBConfiguration.configureDB(conf,"com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/ehrdata",
                "root","123456");
        String [] fields = {"id", "cid", "vid", "name", "gender", "birthday", "examdate", "bz8", "bz10", "bz11",
                "bz12", "bz16", "bz17", "bz18", "bz171", "bz172", "bz173", "bz174", "bz175", "bz268", "bz271",
                "bz272", "bz84", "bz85", "bz107", "bz108", "bz109", "bz110", "bz104", "bz105", "bz106", "bz113",
                "bz111", "bz112", "bz103", "bz120", "bz119", "bz121", "bz81", "bz82", "bz83"};
        DBInputFormat.setInput(conf, EhrData.class, "ehr_data", null, "id", fields);
        conf.setMapperClass(EhrMapper.class);
        conf.setReducerClass(IdentityReducer.class);
        JobClient.runJob(conf);
    }
}
