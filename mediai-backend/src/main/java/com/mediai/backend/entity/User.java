package com.mediai.backend.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullName;

	@Column(unique = true)
	private String email;
	private String password;

	@Column(nullable = false)
	private boolean active = true;
	@Enumerated(EnumType.STRING)
	private Role role;

	/**
	 * Returns the roles and permissions granted to the user.
	 *
	 * <p>
	 * This method converts the user's role into a Spring Security
	 * {@link GrantedAuthority} object, which is used for authorization and access
	 * control within the application.
	 * </p>
	 *
	 * @return collection of granted authorities assigned to the user.
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	/**
	 * Returns the username used for authentication.
	 *
	 * <p>
	 * In this application, the user's email address is used as the authentication
	 * username for login and security validation.
	 * </p>
	 *
	 * @return user's email address.
	 */
	@Override
	public String getUsername() {
		return email;
	}

	/**
	 * Indicates whether the user's account has expired.
	 *
	 * <p>
	 * Returning {@code true} means the account is valid and not expired.
	 * </p>
	 *
	 * @return true if the account is non-expired.
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	/**
	 * Indicates whether the user's account is locked.
	 *
	 * <p>
	 * Returning {@code true} means the account is not locked and the user is
	 * allowed to authenticate.
	 * </p>
	 *
	 * @return true if the account is non-locked.
	 */
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	/**
	 * Indicates whether the user's credentials have expired.
	 *
	 * <p>
	 * Returning {@code true} means the user's password and authentication
	 * credentials are still valid.
	 * </p>
	 *
	 * @return true if credentials are non-expired.
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * Indicates whether the user account is enabled.
	 *
	 * <p>
	 * Returning {@code true} means the user account is active and allowed to access
	 * the application.
	 * </p>
	 *
	 * @return true if the user account is enabled.
	 */
	@Override
	public boolean isEnabled() {
		return active;
	}

}
