package com.mediai.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
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

    // Doctor Get Appointments
//    @GetMapping
//    public List<Appointment> getAppointments() {
//
//        return appointmentService.getAllAppointments();
//    }
    
    
    @GetMapping
    public List<Appointment> getAppointments(
            Authentication authentication) {

        String email = authentication.getName();

        return appointmentService
                .getDoctorAppointments(email);
    }

    // Doctor Confirm Appointment
    @PutMapping("/confirm/{id}")
    public String confirmAppointment(
            @PathVariable Long id) {

        return appointmentService.confirmAppointment(id);
    }

    // Doctor Complete Appointment
    @PutMapping("/complete/{id}")
    public String completeAppointment(
            @PathVariable Long id) {

        return appointmentService.completeAppointment(id);
    }

    // Doctor Cancel Appointment
    @PutMapping("/cancel/{id}")
    public String cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }
}