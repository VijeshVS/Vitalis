    // SPDX-License-Identifier: MIT

    pragma solidity ^0.8.26;

    contract PatientContract {
        struct Patient {
            string name;
            uint256 age;
            string DOB;
            uint256 phoneNumber;
            string email;
            uint weight;
            uint height;
            string bloodGroup;
        }

        mapping(address => Patient) public patients;

        function addPatient(string memory _name,uint256 _age, string memory _DOB, 
            uint256 _phoneNumber, string memory _email, uint _weight, 
            uint _height ,string memory _bloodGroup) public {
            require(bytes(patients[msg.sender].name).length == 0, "Patient exists");
            Patient memory p = Patient(_name,_age,_DOB,_phoneNumber,_email,_weight,_height,_bloodGroup);
            patients[msg.sender] = p;
        }

        function doesPatientExist(address patientAddress) public view returns (bool) {
            Patient memory patient = patients[patientAddress];
            return bytes(patient.name).length > 0;
        }

        function getPatient() public view returns(Patient memory){
            return patients[msg.sender];
        }
    }