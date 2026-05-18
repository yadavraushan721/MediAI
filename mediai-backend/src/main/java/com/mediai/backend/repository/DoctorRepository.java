package com.mediai.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mediai.backend.entity.Doctor;

public interface DoctorRepository  extends JpaRepository<Doctor, Long>{
	// save()
	// findAll()
	// deleteById()
	// findById()
	
	
	List<Doctor> findBySpecialization(String specialization);
}
