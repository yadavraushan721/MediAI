package com.mediai.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullName; // doctor name

	@Column(unique = true)
	private String email;

	@Column(nullable = false)
	private String specialization; // Cardiology/ Dentist,etc

	private int experience; // years

	private String qualification; // MBBS, MD

	private String availableDays; // Mon - Fri

	private double consultationFee; // Doctor fees

	private boolean available; // Available for appointments
}
