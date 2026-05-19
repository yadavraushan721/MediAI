package com.mediai.backend.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symptoms;

    private String diagnosis;

    private String treatmentNotes;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment; //One appointment → one medical record.

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "medical_record_id")
    private List<Prescription> prescriptions;//One medical record → many prescriptions.
} 
