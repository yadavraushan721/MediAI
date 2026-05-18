package com.mediai.backend.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mediai.backend.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


/**
 * JWT authentication filter responsible for validating JWT tokens
 * in incoming HTTP requests.
 *
 * <p>
 * This filter executes once for every request and performs the following tasks:
 * </p>
 *
 * <ul>
 *     <li>Extracts the JWT token from the Authorization header.</li>
 *     <li>Validates the token using JwtService.</li>
 *     <li>Extracts the user email from the token.</li>
 *     <li>Loads user details from the database.</li>
 *     <li>Authenticates the user in Spring Security context.</li>
 * </ul>
 *
 * <p>
 * If the token is valid, the authenticated user is stored in the
 * SecurityContextHolder, allowing access to protected APIs.
 * </p>
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    /**
     * Filters and validates incoming HTTP requests for JWT authentication.
     *
     * <p>
     * This method extracts the JWT token from the Authorization header,
     * validates the token, loads the user details from the database,
     * and sets the authenticated user into the Spring Security context.
     * </p>
     *
     * <p>
     * If the request does not contain a valid Bearer token,
     * the request is forwarded without authentication.
     * </p>
     *
     * @param request incoming HTTP request containing headers and client data.
     * @param response outgoing HTTP response object.
     * @param filterChain filter chain used to pass the request
     *                    to the next filter or resource.
     *
     * @throws ServletException if a servlet-related error occurs.
     * @throws IOException if an input or output error occurs during filtering.
     */
    @Override
    protected void doFilterInternal(
    								HttpServletRequest request,HttpServletResponse response,FilterChain filterChain
    								)
    								throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = authHeader.substring(7);

        String email = jwtService.extractEmail(jwtToken);

        if (email != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            if (jwtService.isTokenValid(jwtToken,
                    userDetails.getUsername())) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request));

                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}