README.md Content 🚀

\# 🏥 MediAI — AI Powered Hospital Management System



MediAI is a scalable, secure, and industry-oriented Hospital Management System built using Spring Boot and PostgreSQL.  

The project is designed with enterprise-level backend architecture, JWT authentication, role-based authorization, appointment workflows, medical records, and AI-ready foundations.



\---



\# 🚀 Features



\## 🔐 Authentication \& Security

\- JWT Authentication

\- Role-Based Authorization

\- BCrypt Password Encryption

\- Stateless Security Architecture

\- Protected APIs



\---



\## 👨‍⚕️ Doctor Management

\- Add Doctor

\- Update Doctor

\- Delete Doctor

\- Search Doctor by Specialization

\- Pagination \& Sorting

\- Doctor Availability Management



\---



\## 📅 Appointment Management

\- Book Appointment

\- Cancel Appointment

\- Appointment Status Tracking

\- Doctor-Patient Appointment Mapping



\---



\## 🩺 Medical Records \& Prescription System

\- Create Medical Records

\- Diagnosis \& Symptoms Tracking

\- Prescription Management

\- Multiple Medicines per Record

\- Treatment Notes



\---



\## 📊 Dashboard \& Analytics APIs

\- Total Doctors

\- Total Appointments

\- Pending Appointments

\- Completed Appointments

\- Cancelled Appointments



\---



\# 🏗️ Backend Architecture



The project follows a layered and scalable backend architecture.



```text

Controller Layer

&#x20;      ↓

Service Layer

&#x20;      ↓

Repository Layer

&#x20;      ↓

PostgreSQL Database



🛠️ Tech Stack

Backend

Java 25

Spring Boot 3

Spring Security

Spring Data JPA

Hibernate

JWT Authentication

Lombok

Maven

Database

PostgreSQL

API Testing

Postman

Version Control

Git \& GitHub



🔒 Security Architecture



MediAI uses JWT-based stateless authentication.



Roles

ADMIN

DOCTOR

PATIENT



Protected APIs

/api/admin/\*\*     → ADMIN only

/api/doctor/\*\*    → DOCTOR only

/api/patient/\*\*   → PATIENT only



🗂️ Current Database Tables

users

doctors

appointments

medical\_records

prescriptions



🔗 Entity Relationships



Doctor (1)

&#x20;  ↓

Appointments (Many)



Appointment (1)

&#x20;  ↓

MedicalRecord (1)



MedicalRecord (1)

&#x20;  ↓

Prescriptions (Many)



📦 Modules Implemented



✅ Authentication Module

✅ Role-Based Authorization

✅ Doctor Management Module

✅ Appointment Management System

✅ Medical Record System

✅ Prescription System

✅ Dashboard Analytics APIs

✅ Validation \& Exception Handling



📌 Future Enhancements



AI Symptom Checker

AI Report Summary

Doctor Recommendation System

Chatbot Integration

File Upload System

Email \& SMS Notifications

Docker Deployment

AWS Deployment

CI/CD Pipeline

Redis Caching

Kafka Event Streaming

Microservices Architecture



🧪 API Testing



All APIs are tested using Postman.



Authentication Flow:



Register → Login → Get JWT Token → Access Protected APIs



📁 Project Structure



mediai/

│

├── mediai-backend/

│

└── mediai-frontend/ (Upcoming)



🌟 Project Vision



MediAI aims to become a scalable AI-powered healthcare platform capable of supporting hospitals, clinics, and healthcare startups with secure and intelligent healthcare workflows.



👨‍💻 Developer



Raushan Kumar Yadav



GitHub:

https://github.com/yadavraushan721

