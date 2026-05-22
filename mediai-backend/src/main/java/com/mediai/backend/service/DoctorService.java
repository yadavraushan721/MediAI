package com.mediai.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mediai.backend.dto.DoctorRequest;
import com.mediai.backend.entity.Doctor;
import com.mediai.backend.entity.Role;
import com.mediai.backend.entity.User;
import com.mediai.backend.exception.ResourceNotFoundException;
import com.mediai.backend.repository.DoctorRepository;
import com.mediai.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {

	private final DoctorRepository doctorRepository;

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder passwordEncoder;

	public String addDoctor(DoctorRequest request) {

		// Check Duplicate Email First
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {

			throw new RuntimeException("Doctor email already exists");
		}

		Doctor doctor = Doctor.builder()

				.fullName(request.getFullName())

				.email(request.getEmail())

				.specialization(request.getSpecialization())

				.experience(request.getExperience())

				.qualification(request.getQualification())

				.availableDays(request.getAvailableDays())

				.consultationFee(request.getConsultationFee())

				.available(request.isAvailable())

				.build();

		doctorRepository.save(doctor);

		// Create Doctor Login Automatically
		User user = User.builder()

				.fullName(request.getFullName())

				.email(request.getEmail())

				.password(passwordEncoder.encode("12345"))

				.role(Role.DOCTOR)

				.active(true)

				.build();

		userRepository.save(user);

		return "Doctor added successfully";
	}

	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}

	public Doctor getDoctorById(Long id) {

		return doctorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
	}

	public List<User> getPendingDoctors() {

		return userRepository.findByRoleAndActiveFalse(Role.DOCTOR);
	}

	public String deleteDoctor(Long id) {

		Doctor doctor = getDoctorById(id);

		doctorRepository.delete(doctor);

		return "Doctor deleted successfully";
	}

	public String updateDoctor(Long id, DoctorRequest request) {

		Doctor doctor = getDoctorById(id);

		doctor.setFullName(request.getFullName());

		doctor.setEmail(request.getEmail());

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

	public String approveDoctor(Long userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		// Activate User
		user.setActive(true);

		userRepository.save(user);

		// Create Doctor Profile
		if (doctorRepository.findByEmail(user.getEmail()).isEmpty()) {

			Doctor doctor = Doctor.builder()

					.fullName(user.getFullName())

					.email(user.getEmail())

					.specialization("General Physician")

					.experience(0)

					.qualification("Not Added")

					.availableDays("Mon-Fri")

					.consultationFee(0)

					.available(true)

					.build();

			doctorRepository.save(doctor);
		}

		return "Doctor Approved Successfully";
	}
}
