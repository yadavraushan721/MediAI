package com.mediai.backend.security;

import java.security.Key;// secret signing key: jwt ko digitally sign krne me use hota h
import java.util.Date;   //set Token issue time aur expiry time

import org.springframework.stereotype.Service;// spring service bean bnata h

import io.jsonwebtoken.Jwts; // JWT create/build karne ke liye main class.
import io.jsonwebtoken.SignatureAlgorithm; // Kaunsa hashing/signature algorithm use hoga.
import io.jsonwebtoken.security.Keys; // Secure signing key generate karne ke liye utility class.

@Service
public class JwtService {

	/*
	 * JWT token ko sign karne ke liye secret password.
	 * why needed:
	 * 		verify
	 * 		sign
	 * 		validate
	 * 
	 * server use SECRET_KEY to generate token
	 * 
	 */
	private static final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey123456";// 

	/*
	 * SECRET_KEY.getBytes() :  String ko byte array me convert.
	 *
	 * Keys.hmacShaKeyFor(): HMAC SHA signing key generate karta.
	 */
	private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

	/**
	 * Generates a JWT (JSON Web Token) for the authenticated user.
	 *
	 * <p>
	 * This method creates a secure JWT token containing the user's email
	 * as the subject. It also sets the token creation time and expiration
	 * time, then digitally signs the token using the HS256 algorithm
	 * and a secret security key.
	 * </p>
	 *
	 * <p>
	 * The generated token is used for authentication and authorization
	 * in protected API requests.
	 * </p>
	 *
	 * @param email the authenticated user's email address
	 *              used as the token subject.
	 *
	 * @return generated JWT token as a String.
	 */

	public String generateToken(String email) {

		return Jwts.builder()
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(
						new Date(System.currentTimeMillis() + 1000 * 60 * 60)
						)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	
	/**
	 * Extracts the user email (subject) from the provided JWT token.
	 *
	 * <p>
	 * This method parses and validates the JWT token using the configured
	 * secret signing key. After successful validation, it retrieves
	 * the token payload (claims) and returns the subject, which represents
	 * the authenticated user's email address.
	 * </p>
	 *
	 * @param token the JWT token from which the email is to be extracted.
	 *
	 * @return the email address stored as the subject inside the JWT token.
	 */
	public String extractEmail(String token) {

	    return Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody()
	            .getSubject();
	}

	/**
	 * Validates whether the provided JWT token belongs to the given user email.
	 *
	 * <p>
	 * This method extracts the email from the JWT token and compares it
	 * with the provided email address to verify token authenticity
	 * and user identity.
	 * </p>
	 *
	 * @param token the JWT token to validate.
	 * @param email the expected user email for verification.
	 *
	 * @return true if the token email matches the provided email,
	 *         otherwise false.
	 */
	public boolean isTokenValid(String token, String email) {

	    final String extractedEmail = extractEmail(token);

	    return extractedEmail.equals(email);
	}
}