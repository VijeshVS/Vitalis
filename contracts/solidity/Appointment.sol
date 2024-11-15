// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Appointment {
    AppointmentType[] bruh;

    struct AppointmentType {
        string name;
        address doctor;
        address patient;
        string dateTime;
        string specialization;
        string email;
    }

    function createAppointment(
        address patient,
        address doctor,
        string memory dateTime,
        string memory name,
        string memory specialization,
        string memory email
    ) public {
        bruh.push(AppointmentType(name,doctor, patient, dateTime,specialization,email));
    }

    function cancelAppointment(address patient, address doctor) public {
        AppointmentType[] storage appointments = bruh;

        for (uint256 i = 0; i < appointments.length; i++) {
            if (
                appointments[i].patient == patient &&
                appointments[i].doctor == doctor
            ) {
                appointments[i] = appointments[appointments.length - 1];
                appointments.pop();
                break;
            }
        }
    }

    function getDoctorAppointments(address doctor)
        public
        view
        returns (AppointmentType[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < bruh.length; i++) {
            if (bruh[i].doctor == doctor) {
                count++;
            }
        }

        AppointmentType[] memory doctorAppointments = new AppointmentType[](
            count
        );
        uint256 index = 0;

        for (uint256 i = 0; i < bruh.length; i++) {
            if (bruh[i].doctor == doctor) {
                doctorAppointments[index] = bruh[i];
                index++;
            }
        }

        return doctorAppointments;
    }

    function getPatientAppointments(address patient)
        public
        view
        returns (AppointmentType[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < bruh.length; i++) {
            if (bruh[i].patient == patient) {
                count++;
            }
        }

        AppointmentType[] memory patientAppointments = new AppointmentType[](
            count
        );
        uint256 index = 0;

        for (uint256 i = 0; i < bruh.length; i++) {
            if (bruh[i].patient == patient) {
                patientAppointments[index] = bruh[i];
                index++;
            }
        }

        return patientAppointments;
    }
}
