package com.example.blockhealthDEMO.bean;
import java.io.Serializable;
public class MedicalRecordMultiKeysClass implements Serializable{
	private String personid;
	private String disease;
	public MedicalRecordMultiKeysClass(){}
	public MedicalRecordMultiKeysClass(String personid,String disease){
		this.personid=personid;
		this.disease=disease;
	}
	public String getPersonid() {
		return personid;
	}
	public void setPersonid(String personid) {
		this.personid = personid;
	}
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
	@Override
    public int hashCode() {
        final int PRIME = 31;
        int result = 1;
        result = PRIME * result + ((personid == null) ? 0 : personid.hashCode());
        result = PRIME * result + ((disease == null) ? 0 : disease.hashCode());
        return result;
    }
	 @Override
	    public boolean equals(Object obj){
	        if(this == obj){
	            return true;
	        }
	        if(obj == null){
	            return false;
	        }
	        if(getClass() != obj.getClass()){
	            return false;
	        }

	        final MedicalRecordMultiKeysClass other = (MedicalRecordMultiKeysClass)obj;
	        if(personid == null){
	            if(other.personid != null){
	                return false;
	            }
	        }else if(!personid.equals(other.personid)){
	            return false;
	        }
	        if(disease == null){
	            if(other.disease != null){
	                return false;
	            }
	        }else if(!disease.equals(other.disease)){
	            return false;
	        }

	        return true;
	    }
}
