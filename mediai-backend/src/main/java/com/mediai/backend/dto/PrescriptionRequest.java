package com.mediai.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrescriptionRequest {

    private String medicineName;

    private String dosage;

    private String instructions;
}
