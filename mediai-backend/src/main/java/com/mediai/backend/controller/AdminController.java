package com.mediai.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/test")
public class AdminController {

	@GetMapping("/dashboard")
	public String adminDashboard() {
		return "Welcome Admin";
	}
}
