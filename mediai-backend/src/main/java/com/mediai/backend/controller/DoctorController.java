package com.mediai.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @GetMapping("/dashboard")
    public String doctorDashboard() {
        return "Welcome Doctor";
    }
}
