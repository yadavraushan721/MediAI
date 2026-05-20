package com.mediai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private long totalDoctors;

    private long totalAppointments;

    private long pendingAppointments;

    private long completedAppointments;

    private long cancelledAppointments;
}
