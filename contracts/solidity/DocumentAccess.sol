// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

interface IPatient {
    function doesPatientExist(address patientAddress) external returns(bool);
}

interface IDoctor {
    function addAccess(address _patient,address _doctor,uint _documentId) external;
    function deleteAccess(address _patient,address _doctor, uint _documentId) external;
}

contract DocumentAccess {

    struct Document {
        uint id;
        address[] enables;
        string documentLink;
    }
    
    mapping(address => Document[]) documents;
    IPatient public patientContract;
    IDoctor public doctorContract;
    
    constructor(address patientContractAddress,address doctorContractAddress){
        patientContract = IPatient(patientContractAddress);
        doctorContract = IDoctor(doctorContractAddress);
    }

    function addDocument(string memory _link) public {
        require(patientContract.doesPatientExist(msg.sender),"User does not exist");

        address[] memory _enables;
        Document memory newDoc = Document(documents[msg.sender].length,_enables, _link);

        documents[msg.sender].push(newDoc);
    }

    function getUserDocuments() public view returns (Document[] memory){
        return documents[msg.sender];
    }

    function giveAccess(address doctor,uint documentId) public {
        // check if user exists
        require(patientContract.doesPatientExist(msg.sender),"User does not exist");
        documents[msg.sender][documentId].enables.push(doctor);    

        doctorContract.addAccess(msg.sender, doctor, documentId);    
    }

    function removeAccess(address doctor, uint documentId) public {
        require(patientContract.doesPatientExist(msg.sender), "User does not exist");

        address[] storage accessList = documents[msg.sender][documentId].enables;
        for (uint i = 0; i < accessList.length; i++) {
            if (accessList[i] == doctor) {
                accessList[i] = accessList[accessList.length - 1];
                accessList.pop();
                break;
            }
        }

        doctorContract.deleteAccess(msg.sender,doctor, documentId);
    }
}   



