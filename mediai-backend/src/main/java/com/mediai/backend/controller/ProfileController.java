package com.mediai.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediai.backend.dto.ProfileResponse;
import com.mediai.backend.entity.User;
import com.mediai.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

	private final UserRepository userRepository;

	// Get Logged-in User Profile
	@GetMapping
	public ProfileResponse getProfile(Authentication authentication) {

		String email = authentication.getName();

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		return ProfileResponse.builder().id(user.getId()).fullName(user.getFullName()).email(user.getEmail())
				.role(user.getRole()).build();
	}

	// Update Profile
	@PutMapping("/update")
	public ProfileResponse updateProfile(
	        Authentication authentication,
	        @RequestBody User updatedUser) {

	    String email = authentication.getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    user.setFullName(updatedUser.getFullName());

	    user.setEmail(updatedUser.getEmail());

	    User savedUser = userRepository.save(user);

	    return ProfileResponse.builder()
	            .id(savedUser.getId())
	            .fullName(savedUser.getFullName())
	            .email(savedUser.getEmail())
	            .role(savedUser.getRole())
	            .build();
	}
}