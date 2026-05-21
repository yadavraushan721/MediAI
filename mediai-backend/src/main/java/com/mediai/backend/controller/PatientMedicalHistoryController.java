package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.entity.MedicalRecord;
import com.mediai.backend.service.MedicalRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/patient/medical-records")
@RequiredArgsConstructor
public class PatientMedicalHistoryController {

	private final MedicalRecordService medicalRecordService;

	@GetMapping
	public List<MedicalRecord> getPatientMedicalHistory() {

		return medicalRecordService.getAllRecords();
	}
}