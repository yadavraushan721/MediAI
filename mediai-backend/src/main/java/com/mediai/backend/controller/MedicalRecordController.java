package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.dto.MedicalRecordRequest;
import com.mediai.backend.entity.MedicalRecord;
import com.mediai.backend.service.MedicalRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctor/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping
    public String createMedicalRecord(
            @RequestBody MedicalRecordRequest request) {

        return medicalRecordService
                .createMedicalRecord(request);
    }

    @GetMapping
    public List<MedicalRecord> getRecords() {

        return medicalRecordService
                .getAllRecords();
    }
}
