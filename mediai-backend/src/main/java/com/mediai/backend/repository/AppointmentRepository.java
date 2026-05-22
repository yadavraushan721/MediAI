package com.mediai.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mediai.backend.entity.Appointment;
import com.mediai.backend.entity.AppointmentStatus;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    long countByStatus(AppointmentStatus status);

    List<Appointment> findByPatientEmail(
            String patientEmail);
}