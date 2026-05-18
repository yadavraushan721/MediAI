package com.mediai.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.dto.DoctorRequest;
import com.mediai.backend.entity.Doctor;
import com.mediai.backend.service.DoctorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/doctors")
@RequiredArgsConstructor
@Validated
public class DoctorManagementController {

	private final DoctorService doctorService;

	@PostMapping
	public String addDoctor(@Valid @RequestBody DoctorRequest request) {

		return doctorService.addDoctor(request);
	}

	@GetMapping
	public List<Doctor> getDoctors() {
		return doctorService.getAllDoctors();
	}

	@GetMapping("/{id}")
	public Doctor getDoctorById(@PathVariable Long id) {

		return doctorService.getDoctorById(id);
	}

	@PutMapping("/{id}")
	public String updateDoctor(@PathVariable Long id, @RequestBody DoctorRequest request) {

		return doctorService.updateDoctor(id, request);
	}

	@DeleteMapping("/{id}")
	public String deleteDoctor(@PathVariable Long id) {

		return doctorService.deleteDoctor(id);
	}

	@GetMapping("/search")
	public List<Doctor> searchDoctors(@RequestParam String specialization) {

		return doctorService.searchBySpecialization(specialization);
	}

	@GetMapping("/pagination")
	public Page<Doctor> getDoctorsWithPagination(@RequestParam int page, @RequestParam int size) {

		return doctorService.getDoctorsWithPagination(page, size);
	}
}
