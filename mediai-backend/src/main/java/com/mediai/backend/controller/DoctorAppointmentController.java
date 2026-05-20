package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.entity.Appointment;
import com.mediai.backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctor/appointments")
@RequiredArgsConstructor
public class DoctorAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAppointments() {

        return appointmentService.getAllAppointments();
    }

    @PutMapping("/complete/{id}")
    public String completeAppointment(
            @PathVariable Long id) {

        return appointmentService
                .completeAppointment(id);
    }

    @PutMapping("/cancel/{id}")
    public String cancelAppointment(
            @PathVariable Long id) {

        return appointmentService
                .cancelAppointment(id);
    }
}