package com.mediai.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mediai.backend.dto.RegisterRequest;
import com.mediai.backend.entity.User;
import com.mediai.backend.repository.UserRepository;

import com.mediai.backend.dto.LoginRequest;
import com.mediai.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository; // Spring Bean
	private final BCryptPasswordEncoder passwordEncoder; // @Bean se create hua h

	private final JwtService jwtService;
	
//	public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
//		this.userRepository = userRepository;
//		this.passwordEncoder = passwordEncoder;
//	} //---->@RequiredArgsConstructor same working automatically 

	/**
	 * Registers a new user into the system.
	 *
	 * <p>
	 * This method performs the following operations:
	 * </p>
	 *
	 * <ul>
	 *     <li>Checks whether the email already exists in the database.</li>
	 *     <li>Encodes the user's password using BCrypt for security.</li>
	 *     <li>Creates a User entity using the Builder Pattern.</li>
	 *     <li>Saves the user into the database using JPA Repository.</li>
	 * </ul>
	 *
	 * @param request contains user registration details such as
	 *                fullName, email, password, and role.
	 *
	 * @return success message if registration is completed,
	 *         otherwise returns "Email already exists".
	 */

	public String register(RegisterRequest request) {

		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			return "Email already exists";
		}
		
//		User user = new User();
//
//		user.setFullName(request.getFullName());
//		user.setEmail(request.getEmail());
//		user.setPassword(passwordEncoder.encode(request.getPassword()));
//		user.setRole(request.getRole());

		User user = User.builder()
				.fullName(request.getFullName())
				.email(request.getEmail())
				.password(passwordEncoder
				.encode(request.getPassword()))
				.role(request.getRole())
				.build(); // final User Object create

		userRepository.save(user);

		return "User registered successfully";
	}
	
	public String login(LoginRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid password");
	    }

	    return jwtService.generateToken(user.getEmail());
	}
}
