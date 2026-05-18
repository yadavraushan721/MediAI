package com.mediai.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRequest {

	@NotBlank
	private String fullName;

	@NotBlank
	private String specialization;

	@Min(0)
	private int experience;

	@NotBlank
	private String qualification;

	@NotBlank
	private String availableDays;

	@Positive
	private double consultationFee;

	private boolean available;
}
