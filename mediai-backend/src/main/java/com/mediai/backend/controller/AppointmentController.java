package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.dto.AppointmentRequest;
import com.mediai.backend.entity.Appointment;
import com.mediai.backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/patient/appointments")
@RequiredArgsConstructor
public class AppointmentController {

	private final AppointmentService appointmentService;

	@PostMapping
	public String bookAppointment(@RequestBody AppointmentRequest request) {

		return appointmentService.bookAppointment(request);
	}

	@GetMapping
	public List<Appointment> getAppointments() {

		return appointmentService.getAllAppointments();
	}

	@PutMapping("/cancel/{id}")
	public String cancelAppointment(@PathVariable Long id) {

		return appointmentService.cancelAppointment(id);
	}
}
