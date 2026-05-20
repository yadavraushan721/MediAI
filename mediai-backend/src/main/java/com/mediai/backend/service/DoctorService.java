package com.mediai.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mediai.backend.dto.DoctorRequest;
import com.mediai.backend.entity.Doctor;
import com.mediai.backend.exception.ResourceNotFoundException;
import com.mediai.backend.repository.DoctorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {

	private final DoctorRepository doctorRepository;

	public String addDoctor(DoctorRequest request) {

		Doctor doctor = Doctor.builder().fullName(request.getFullName()).specialization(request.getSpecialization())
				.experience(request.getExperience()).qualification(request.getQualification())
				.availableDays(request.getAvailableDays()).consultationFee(request.getConsultationFee())
				.available(request.isAvailable()).build();

		doctorRepository.save(doctor);

		return "Doctor added successfully";
	}

	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}

	public Doctor getDoctorById(Long id) {

		return doctorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
	}

	public String deleteDoctor(Long id) {

		Doctor doctor = getDoctorById(id);

		doctorRepository.delete(doctor);

		return "Doctor deleted successfully";
	}

	public String updateDoctor(Long id, DoctorRequest request) {

		Doctor doctor = getDoctorById(id);

		doctor.setFullName(request.getFullName());
		doctor.setSpecialization(request.getSpecialization());
		doctor.setExperience(request.getExperience());
		doctor.setQualification(request.getQualification());
		doctor.setAvailableDays(request.getAvailableDays());
		doctor.setConsultationFee(request.getConsultationFee());
		doctor.setAvailable(request.isAvailable());

		doctorRepository.save(doctor);

		return "Doctor updated successfully";
	}

	public List<Doctor> searchBySpecialization(String specialization) {

		return doctorRepository.findBySpecializationContainingIgnoreCase(specialization);
	}

	public Page<Doctor> getDoctorsWithPagination(int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("experience").descending());

		return doctorRepository.findAll(pageable);
	}
}
