package com.mediai.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mediai.backend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {

		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	/**
	 * Creates and registers a BCryptPasswordEncoder bean in the Spring container.
	 *
	 * <p>
	 * This encoder is used to securely hash user passwords before storing them in
	 * the database. BCrypt provides strong password encryption with salting for
	 * enhanced security.
	 * </p>
	 *
	 * @return BCryptPasswordEncoder instance used for password encryption.
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Configures the Spring Security filter chain for the application.
	 *
	 * <p>
	 * This method defines security rules for incoming HTTP requests. It disables
	 * CSRF protection for REST APIs and allows public access to authentication
	 * endpoints such as login and registration. All other requests require user
	 * authentication.
	 * </p>
	 *
	 * <ul>
	 * <li>Disables CSRF protection.</li>
	 * <li>Allows unrestricted access to "/api/auth/**" endpoints.</li>
	 * <li>Requires authentication for all other API requests.</li>
	 * </ul>
	 *
	 * @param http HttpSecurity object used to configure security settings.
	 *
	 * @return configured SecurityFilterChain object.
	 *
	 * @throws Exception if any security configuration error occurs.
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authorizeHttpRequests(auth -> auth

					    .requestMatchers("/api/auth/**")
					    .permitAll()

					    .requestMatchers("/api/admin/**")
					    .hasAuthority("ADMIN")

					    .requestMatchers("/api/doctor/**")
					    .hasAuthority("DOCTOR")

					    .requestMatchers("/api/patient/**")
					    .hasAuthority("PATIENT")

					    .anyRequest()
					    .authenticated())

				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
