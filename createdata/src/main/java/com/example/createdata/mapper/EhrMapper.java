package com.example.createdata.mapper;

import com.example.createdata.entity.EhrData;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;

import java.io.IOException;

@SuppressWarnings("deprecation")
public class EhrMapper extends MapReduceBase implements Mapper<LongWritable, EhrData, LongWritable, Text> {
    @Override
    public void map(LongWritable longWritable, EhrData ehrData, OutputCollector<LongWritable, Text> outputCollector,
                    Reporter reporter) throws IOException {
        outputCollector.collect(new LongWritable(ehrData.getId()), new Text(ehrData.toString()));
    }
}
