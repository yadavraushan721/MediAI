package com.mediai.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mediai.backend.dto.AppointmentRequest;
import com.mediai.backend.entity.Appointment;
import com.mediai.backend.entity.AppointmentStatus;
import com.mediai.backend.entity.Doctor;
import com.mediai.backend.exception.ResourceNotFoundException;
import com.mediai.backend.repository.AppointmentRepository;
import com.mediai.backend.repository.DoctorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentService {

	private final AppointmentRepository appointmentRepository;

	private final DoctorRepository doctorRepository;

	public String bookAppointment(AppointmentRequest request) {

		Doctor doctor = doctorRepository.findById(request.getDoctorId())
				.orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

		Appointment appointment = Appointment.builder().patientName(request.getPatientName()).doctor(doctor)
				.appointmentDate(request.getAppointmentDate()).appointmentTime(request.getAppointmentTime())
				.status(AppointmentStatus.PENDING).build();

		appointmentRepository.save(appointment);

		return "Appointment booked successfully";
	}

	public List<Appointment> getAllAppointments() {

		return appointmentRepository.findAll();
	}

	public String cancelAppointment(Long id) {

		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

		appointment.setStatus(AppointmentStatus.CANCELLED);

		appointmentRepository.save(appointment);

		return "Appointment cancelled successfully";
	}

	public String completeAppointment(Long id) {

		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

		appointment.setStatus(AppointmentStatus.COMPLETED);

		appointmentRepository.save(appointment);

		return "Appointment completed successfully";
	}

}
