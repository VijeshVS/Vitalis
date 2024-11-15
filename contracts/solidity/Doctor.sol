// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract Doctor {

    struct ContactInfo {
        string emailId;
        uint phoneNumber;
    }

    struct Doc {
        address docAddress;
        string name;
        string gender;
        string education;
        string specialization;
        uint age;
        string licenceNumber;
        string profilePicture;
        bool verificationStatus;
        ContactInfo contact;
        uint yoe;
    }
    
    
    mapping(address => Doc) public docArray;
    Doc[] docList;

    struct access {
        uint documentId;
        address patient;
    }

    mapping(address => access[]) AccessList;

    function registerDoctor(string memory _name,string memory _education, string memory _specialization , uint _age, string memory _licenceNumber, string memory _profilePicture, string memory emailId, uint phoneNumber,string memory gender,uint yoe) public{
        docArray[msg.sender] = Doc(msg.sender,_name,gender,_education,_specialization,_age,_licenceNumber,_profilePicture, false, ContactInfo(emailId,phoneNumber),yoe);
        docList.push(Doc(msg.sender,_name,gender,_education,_specialization,_age,_licenceNumber,_profilePicture, false, ContactInfo(emailId,phoneNumber),yoe));
    }

    function doesDoctorExist(address docAddress) public view returns (bool) {
            Doc memory doc = docArray[docAddress];
            return bytes(doc.name).length > 0;
    }

    function getDoctor(address doctor) public view returns(Doc memory){
        return docArray[doctor];
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
    
    function getAllDoctors() public view returns (Doc[] memory){
        return docList;
    }   
}