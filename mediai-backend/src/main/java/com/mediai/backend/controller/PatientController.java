package com.mediai.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    @GetMapping("/dashboard")
    public String patientDashboard() {
        return "Welcome Patient";
    }
}