package com.mediai.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
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
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Patient Book Appointment
    @PostMapping("/patient/appointments")
    public String bookAppointment(
            @RequestBody AppointmentRequest request) {

        return appointmentService.bookAppointment(request);
    }

//    // Patient Get Appointments
//    @GetMapping("/patient/appointments")
//    public List<Appointment> getAppointments() {
//
//        return appointmentService.getAllAppointments();
//    }

    @GetMapping("/patient/appointments")
    public List<Appointment> getAppointments(
            Authentication authentication) {

        String email = authentication.getName();

        return appointmentService
                .getPatientAppointments(email);
    }
    
    // Patient Cancel Appointment
    @PutMapping("/patient/appointments/cancel/{id}")
    public String cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }
    
 // Admin Get All Appointments
    @GetMapping("/admin/appointments")
    public List<Appointment> getAllAppointmentsForAdmin() {

        return appointmentService.getAllAppointments();
    }
}