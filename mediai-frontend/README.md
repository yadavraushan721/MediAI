MediAI 🏥🤖

MediAI is a full-stack Healthcare Management System built using Spring Boot, React.js, PostgreSQL, and JWT Authentication.
The project provides a complete role-based healthcare workflow for Admins, Doctors, and Patients with secure authentication and modern UI.

🚀 Features

🔐 Authentication & Authorization

JWT-based Authentication
Role-Based Access Control (RBAC)
Secure Login & Registration
Protected Routes
Session Management

👨‍💼 Admin Module

Admin can:

✅ Manage Doctors
✅ Manage Patients
✅ View Dashboard Analytics
✅ Monitor Appointments
✅ Search Doctors
✅ Perform CRUD Operations

👨‍⚕️ Doctor Module

Doctor can:

✅ View Appointments
✅ Confirm / Cancel / Complete Appointments
✅ Manage Medical Records
✅ Add Prescriptions
✅ Update Medical Records
✅ Delete Medical Records
✅ View Patient Details

🧑‍🤝‍🧑 Patient Module

Patient can:

✅ Book Appointments
✅ View Appointment Status
✅ Cancel Appointments
✅ View Medical History
✅ View Prescriptions
✅ Access Treatment Records

📋 Appointment Workflow

Patient Books Appointment
↓
Status = PENDING

Doctor Confirms Appointment
↓
Status = CONFIRMED

Doctor Completes Treatment
↓
Status = COMPLETED

🩺 Medical Record System

Each medical record contains:

Symptoms
Diagnosis
Treatment Notes
Prescriptions
Doctor Details
Appointment Information

💊 Prescription Management

Doctors can add:

Medicine Name
Dosage
Instructions

Example:

Medicine: Dolo 650
Dosage: 1 tablet twice daily
Instructions: After food

🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
React Router DOM
Axios
React Icons
Backend
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
Database
PostgreSQL
Tools
VS Code
Postman
Git & GitHub

📂 Project Structure
MediAI
│
├── mediai-frontend
│ ├── src
│ ├── pages
│ ├── services
│ ├── components
│ └── layouts
│
├── mediai-backend
│ ├── controller
│ ├── service
│ ├── repository
│ ├── entity
│ ├── dto
│ └── security

⚙️ Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/yadavraushan721/MediAI.git

2️⃣ Backend Setup
cd mediai-backend
Configure PostgreSQL Database

Update:

src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mediai
spring.datasource.username=your_username
spring.datasource.password=your_password
Run Backend
mvn spring-boot:run

Backend runs on:

http://localhost:8081

3️⃣ Frontend Setup

cd mediai-frontend
Install Dependencies
npm install
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173

🔑 Default Roles
ADMIN
DOCTOR
PATIENT

🔮 Future Enhancements

Doctor Availability & Slot Booking
AI Symptom Suggestion
Email Notifications
Video Consultation
Report Upload System
Appointment Reminder System
Dark Mode UI

📈 Project Status

✅ Authentication System Completed
✅ Role-Based Dashboards Completed
✅ Appointment Workflow Completed
✅ Medical Record Module Completed
✅ Prescription System Completed
✅ Patient Medical History Completed

🚀 More Features Coming Soon

👨‍💻 Author
Raushan Kumar Yadav
Java Full Stack Developer
Passionate about Backend Development & Scalable Systems

GitHub:
yadavraushan721
