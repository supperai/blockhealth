package com.example.blockhealthDEMO.bean;

import javax.persistence.Entity;

@Entity(name="healthinfo")
public class HealthInfo {
	private String personid;
	private int height;
	private int weight;
	private String blood_fat;
	private double blood_sugar;
	private String blood_pressure;
	private String allergen;

	public String getPersonid() {
		return personid;
	}

	public void setPersonid(String personid) {
		this.personid = personid;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public String getBlood_fat() {
		return blood_fat;
	}

	public void setBlood_fat(String blood_fat) {
		this.blood_fat = blood_fat;
	}

	public double getBlood_sugar() {
		return blood_sugar;
	}

	public void setBlood_sugar(double blood_sugar) {
		this.blood_sugar = blood_sugar;
	}

	public String getBlood_pressure() {
		return blood_pressure;
	}

	public void setBlood_pressure(String blood_pressure) {
		this.blood_pressure = blood_pressure;
	}

	public String getAllergen() {
		return allergen;
	}

	public void setAllergen(String allergen) {
		this.allergen = allergen;
	}

}
