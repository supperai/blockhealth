package com.example.blockhealthDEMO.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blockhealthDEMO.bean.MedicalRecord;
import com.example.blockhealthDEMO.bean.MedicalRecordMultiKeysClass;

public interface MedicalRecordDao extends JpaRepository<MedicalRecord,MedicalRecordMultiKeysClass>{
	public static List<MedicalRecord> findBydisease(String disease){
		// TODO Auto-generated method stub
		return null;
	}	
}
