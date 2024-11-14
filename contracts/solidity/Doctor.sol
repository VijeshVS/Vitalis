// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract Doctor {

    struct ContactInfo {
        string emailId;
        uint phoneNumber;
    }

    struct Doc {
        string name;
        string education;
        string specialization;
        uint age;
        string licenceNumber;
        string profilePicture;
        bool verificationStatus;
        ContactInfo contact;
    }
    
    
    mapping(address => Doc) public docArray;
    
    struct access {
        uint documentId;
        address patient;
    }

    mapping(address => access[]) AccessList;

    function registerDoctor(string memory _name,string memory _education, string memory _specialization , uint _age, string memory _licenceNumber, string memory _profilePicture, string memory emailId, uint phoneNumber) public{
        docArray[msg.sender] = Doc(_name,_education,_specialization,_age,_licenceNumber,_profilePicture, false, ContactInfo(emailId,phoneNumber));
    }

    function getDoctor() public view returns(Doc memory){
        return docArray[msg.sender];
    }
    
    function addAccess(address _patient,address _doctor,uint _documentId) public {
        access memory ac = access(_documentId,_patient);
        AccessList[_doctor].push(ac);
    }

    function deleteAccess(address _patient, address _doctor, uint _documentId) public {
        for (uint i = 0; i < AccessList[_doctor].length; i++) {
            if (AccessList[_doctor][i].documentId == _documentId && AccessList[_doctor][i].patient == _patient) {
                AccessList[_doctor][i] = AccessList[_doctor][AccessList[_doctor].length - 1];
                AccessList[_doctor].pop();
                break;
            }
        }
    }

    function getAccessList() public view returns(access[] memory) {
        return AccessList[msg.sender];
    }
}