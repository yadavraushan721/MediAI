package com.mediai.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mediai.backend.entity.Role;
import com.mediai.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	List<User> findByRoleAndActive(Role role, boolean active);
	
	List<User> findByRoleAndActiveFalse(Role role);
	
	List<User> findByRole(Role role);
}
