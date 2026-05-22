package com.mediai.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppointmentRequest {

	private String patientName;

	private String patientEmail;

	private Long doctorId;

	private LocalDate appointmentDate;

	private LocalTime appointmentTime;
}