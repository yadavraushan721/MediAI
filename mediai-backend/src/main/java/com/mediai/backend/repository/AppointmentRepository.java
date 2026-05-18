package com.mediai.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mediai.backend.entity.Appointment;

public interface AppointmentRepository  extends JpaRepository<Appointment,Long>{

}
