package com.mediai.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalRecordRequest {

    private String symptoms;

    private String diagnosis;

    private String treatmentNotes;

    private Long appointmentId;

    private List<PrescriptionRequest> prescriptions;
}