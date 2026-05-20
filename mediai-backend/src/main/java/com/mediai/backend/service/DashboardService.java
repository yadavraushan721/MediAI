package com.mediai.backend.service;

import org.springframework.stereotype.Service;

import com.mediai.backend.dto.AdminDashboardResponse;
import com.mediai.backend.entity.AppointmentStatus;
import com.mediai.backend.repository.AppointmentRepository;
import com.mediai.backend.repository.DoctorRepository;

import lombok.RequiredArgsConstructor;


/**
 * Service class responsible for handling dashboard-related
 * business operations and analytics.
 *
 * <p>
 * This service provides administrative dashboard statistics such as:
 * </p>
 *
 * <ul>
 *     <li>Total number of doctors.</li>
 *     <li>Total appointments.</li>
 *     <li>Pending appointments count.</li>
 *     <li>Completed appointments count.</li>
 *     <li>Cancelled appointments count.</li>
 * </ul>
 *
 * <p>
 * It aggregates data from repositories and prepares
 * dashboard response objects for the admin panel.
 * </p>
 */
@Service
@RequiredArgsConstructor
public class DashboardService {

	private final DoctorRepository doctorRepository;

	private final AppointmentRepository appointmentRepository;

	/**
	 * Retrieves dashboard statistics for the admin panel.
	 *
	 * <p>
	 * This method collects appointment and doctor-related
	 * analytics from the database and builds an
	 * {@link AdminDashboardResponse} object containing:
	 * </p>
	 *
	 * <ul>
	 *     <li>Total number of doctors.</li>
	 *     <li>Total appointments.</li>
	 *     <li>Number of pending appointments.</li>
	 *     <li>Number of completed appointments.</li>
	 *     <li>Number of cancelled appointments.</li>
	 * </ul>
	 *
	 * @return populated AdminDashboardResponse containing
	 *         admin dashboard statistics.
	 */
	public AdminDashboardResponse getAdminDashboard() {

		return AdminDashboardResponse.builder()

				.totalDoctors(doctorRepository.count())

				.totalAppointments(appointmentRepository.count())

				.pendingAppointments(appointmentRepository.countByStatus(AppointmentStatus.PENDING))

				.completedAppointments(appointmentRepository.countByStatus(AppointmentStatus.COMPLETED))

				.cancelledAppointments(appointmentRepository.countByStatus(AppointmentStatus.CANCELLED))

				.build();
	}
}
