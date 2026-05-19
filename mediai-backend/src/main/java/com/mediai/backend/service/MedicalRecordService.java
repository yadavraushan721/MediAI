package com.mediai.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mediai.backend.dto.MedicalRecordRequest;
import com.mediai.backend.dto.PrescriptionRequest;
import com.mediai.backend.entity.Appointment;
import com.mediai.backend.entity.MedicalRecord;
import com.mediai.backend.entity.Prescription;
import com.mediai.backend.exception.ResourceNotFoundException;
import com.mediai.backend.repository.AppointmentRepository;
import com.mediai.backend.repository.MedicalRecordRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service class responsible for managing medical records
 * and prescription-related operations.
 *
 * <p>
 * This service handles:
 * </p>
 *
 * <ul>
 *     <li>Creating medical records for appointments.</li>
 *     <li>Validating appointment existence.</li>
 *     <li>Converting prescription request DTOs into entities.</li>
 *     <li>Saving medical records and prescriptions into the database.</li>
 *     <li>Fetching all medical records.</li>
 * </ul>
 *
 * <p>
 * It acts as the business logic layer between controllers
 * and repository/database operations.
 * </p>
 */

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    private final AppointmentRepository appointmentRepository;

    /**
     * Creates and stores a new medical record for a patient appointment.
     *
     * <p>
     * This method performs the following operations:
     * </p>
     *
     * <ul>
     *     <li>Validates whether the appointment exists.</li>
     *     <li>Converts prescription request DTOs into Prescription entities.
     *     //map(this::mapToPrescription)
     *     for(PrescriptionRequest p : requests){
     *			mapToPrescription(p);
	 *		}
     *     </li>
     *     <li>Builds a MedicalRecord entity using the Builder Pattern.</li>
     *     <li>Associates prescriptions and appointment with the medical record.</li>
     *     <li>Saves the medical record into the database.</li>
     * </ul>
     *
     * @param request contains medical record details such as symptoms,
     *                diagnosis, treatment notes, appointment ID,
     *                and prescription details.
     *
     * @return success message after successful medical record creation.
     *
     * @throws ResourceNotFoundException if the appointment does not exist.
     */
    public String createMedicalRecord(MedicalRecordRequest request) {

        Appointment appointment =
                appointmentRepository
                .findById(request.getAppointmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found"));

        List<Prescription> prescriptions =
                request.getPrescriptions()
                .stream()
                .map(this::mapToPrescription)
                .collect(Collectors.toList());

        MedicalRecord medicalRecord =
                MedicalRecord.builder()
                .symptoms(request.getSymptoms())
                .diagnosis(request.getDiagnosis())
                .treatmentNotes(request.getTreatmentNotes())
                .appointment(appointment)
                .prescriptions(prescriptions)
                .build();

        medicalRecordRepository.save(medicalRecord);

        return "Medical record created successfully";
    }

    /**
     * Converts a PrescriptionRequest DTO into a Prescription entity.
     *
     * <p>
     * This helper method maps prescription-related request data
     * such as medicine name, dosage, and instructions
     * into a Prescription entity object.
     * </p>
     * 
     * private Prescription mapToPrescription(PrescriptionRequest request) {
     *
     *Prescription prescription = new Prescription();
	 *
     *prescription.setMedicineName(request.getMedicineName());
     *prescription.setDosage(request.getDosage());
     *prescription.setInstructions(request.getInstructions());
	 *
     *return prescription;
	 *}
     *
     * @param request contains prescription details received from the client.
     *
     * @return mapped Prescription entity object.
     */
    private Prescription mapToPrescription(PrescriptionRequest request) {

    	Prescription prescription= Prescription.builder()
                .medicineName(request.getMedicineName())
                .dosage(request.getDosage())
                .instructions(request.getInstructions())
                .build();
    	return prescription;
    }

    /**
     * Retrieves all medical records from the database.
     *
     * <p>
     * This method fetches and returns all stored medical records
     * including their associated appointment and prescription data.
     * </p>
     *
     * @return list of all medical records.
     */
    public List<MedicalRecord> getAllRecords() {

        return medicalRecordRepository.findAll();
    }
}
