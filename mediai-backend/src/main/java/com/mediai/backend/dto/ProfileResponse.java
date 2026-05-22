package com.mediai.backend.dto;

import com.mediai.backend.entity.Role;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private Role role;
}