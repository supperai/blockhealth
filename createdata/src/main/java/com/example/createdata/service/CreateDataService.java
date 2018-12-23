package com.example.createdata.service;

import com.example.createdata.entity.EhrData;
import com.example.createdata.entity.EhrDataExample;
import com.example.createdata.mapper.EhrDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreateDataService {

    @Autowired
    private EhrDataMapper ehrDataMapper;


    public void createData() {
        EhrDataExample ehrDataExample = new EhrDataExample();
        List<EhrData> ehrDataList = ehrDataMapper.selectByExample(ehrDataExample);
        Integer count = 1000000 / ehrDataList.size();
        Integer index = 10000000;
        for (int i = 0; i < count; i++) {
            for (EhrData ehrData : ehrDataList) {
                index++;
                ehrData.setCid("jpc" + index);
                ehrDataMapper.insert(ehrData);
            }
        }
    }

}
