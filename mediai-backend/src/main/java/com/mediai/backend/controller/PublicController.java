package com.mediai.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.entity.Doctor;
import com.mediai.backend.service.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final DoctorService doctorService;

    @GetMapping("/doctors")
    public List<Doctor> getDoctors() {

        return doctorService.getAllDoctors();
    }
}