// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Diagnosis {

    struct Diag {
        address patient;
        address doctor;
        string content;
        string encryptedPass;
    }

    Diag[] private bruh;

    function createDiagnosis(address patient, address doctor, string memory content, string memory encryptedPass) public {
        bruh.push(Diag(patient, doctor, content, encryptedPass));
    }

    function getPatientDiagnosis(address patient) public view returns (Diag[] memory) {
        uint count = 0;

        // Count matching diagnoses
        for (uint i = 0; i < bruh.length; i++) {
            if (bruh[i].patient == patient) {
                count++;
            }
        }

        // Create a temporary array to store results
        Diag[] memory result = new Diag[](count);
        uint index = 0;

        for (uint i = 0; i < bruh.length; i++) {
            if (bruh[i].patient == patient) {
                result[index] = bruh[i];
                index++;
            }
        }

        return result;
    }

    function getDoctorDiagnosis(address doctor) public view returns (Diag[] memory) {
        uint count = 0;

        // Count matching diagnoses
        for (uint i = 0; i < bruh.length; i++) {
            if (bruh[i].doctor == doctor) {
                count++;
            }
        }

        // Create a temporary array to store results
        Diag[] memory result = new Diag[](count);
        uint index = 0;

        for (uint i = 0; i < bruh.length; i++) {
            if (bruh[i].doctor == doctor) {
                result[index] = bruh[i];
                index++;
            }
        }

        return result;
    }
}
