package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

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

    // Patient Get Appointments
    @GetMapping("/patient/appointments")
    public List<Appointment> getAppointments() {

        return appointmentService.getAllAppointments();
    }

    // Patient Cancel Appointment
    @PutMapping("/patient/appointments/cancel/{id}")
    public String cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }
}