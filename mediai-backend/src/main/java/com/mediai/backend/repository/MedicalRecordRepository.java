package com.mediai.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mediai.backend.entity.MedicalRecord;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long>{

}
