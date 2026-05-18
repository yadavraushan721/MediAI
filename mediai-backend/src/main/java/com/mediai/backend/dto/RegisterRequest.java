package com.mediai.backend.dto;

import com.mediai.backend.entity.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	private String fullName;
	private String email;
	private String password;
	private Role role;
	
	
}
