package com.example.blockhealthDEMO.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blockhealthDEMO.bean.HealthInfo;
public interface HealthInfoDao extends JpaRepository<HealthInfo,String>{

	public static List<HealthInfo> findBypersonid(String personid) {
		// TODO Auto-generated method stub
		return null;
	}
}
