package com.example.blockhealthDEMO.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blockhealthDEMO.bean.HealthInfo;
import com.example.blockhealthDEMO.bean.MedicalRecord;
import com.example.blockhealthDEMO.dao.HealthInfoDao;
import com.example.blockhealthDEMO.dao.MedicalRecordDao;
@RestController
@RequestMapping(value="/DataSQL")
public class DataSQLController {
	@GetMapping("/DataSQL/{personid}")
	public List<HealthInfo> getHealthInfoByPersonId(@PathVariable("personid") String personid){
		return HealthInfoDao.findBypersonid(personid);	
	}
	
	@GetMapping("/DataSQL/{disease}")
	public List<MedicalRecord> getMedicalRecordByDisease(@PathVariable("disease") String disease){
		return MedicalRecordDao.findBydisease(disease);	
	}
}
