"use client";

import React from "react";
import { useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaSortAmountDownAlt } from "react-icons/fa";

const getGravatarUrl = (email, size = 200) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const doctors = [
    {
        id: 1,
        name: "Dr. Rajiv Sharma",
        email: "rajiv.sharma@healthcenter.com",
        phone: "123-456-7890",
        hospital: "City Hospital",
        specialization: "General Physician",
        fee: 500,
    },
    {
        id: 2,
        name: "Dr. Neha Verma",
        email: "neha.verma@wellnessclinic.com",
        phone: "321-654-0987",
        hospital: "Wellness Clinic",
        specialization: "General Physician",
        fee: 600,
    },
    {
        id: 3,
        name: "Dr. Meera Kapoor",
        email: "meera.kapoor@sunshinehospital.com",
        phone: "234-567-8901",
        hospital: "Sunshine Hospital",
        specialization: "Geriatrics",
        fee: 700,
    },
    {
        id: 4,
        name: "Dr. Sanjay Desai",
        email: "sanjay.desai@cityhospital.com",
        phone: "876-543-2109",
        hospital: "City Hospital",
        specialization: "Geriatrics",
        fee: 750,
    },
    {
        id: 5,
        name: "Dr. Priya Singh",
        email: "priya.singh@cardiaccare.com",
        phone: "567-890-1234",
        hospital: "Cardiac Care",
        specialization: "Cardiology",
        fee: 1000,
    },
    {
        id: 6,
        name: "Dr. Aman Trivedi",
        email: "aman.trivedi@heartcenter.com",
        phone: "678-901-2345",
        hospital: "Heart Center",
        specialization: "Cardiology",
        fee: 1100,
    },
    {
        id: 7,
        name: "Dr. Kavita Joshi",
        email: "kavita.joshi@brainclinic.com",
        phone: "789-012-3456",
        hospital: "Brain Clinic",
        specialization: "Neurology",
        fee: 1200,
    },
    {
        id: 8,
        name: "Dr. Ajay Bansal",
        email: "ajay.bansal@neurocenter.com",
        phone: "890-123-4567",
        hospital: "Neuro Center",
        specialization: "Neurology",
        fee: 1250,
    },
    {
        id: 9,
        name: "Dr. Ritika Mehta",
        email: "ritika.mehta@orthocare.com",
        phone: "901-234-5678",
        hospital: "Ortho Care",
        specialization: "Orthopedics",
        fee: 800,
    },
    {
        id: 10,
        name: "Dr. Manoj Jain",
        email: "manoj.jain@bonehealth.com",
        phone: "012-345-6789",
        hospital: "Bone Health Clinic",
        specialization: "Orthopedics",
        fee: 850,
    },
    {
        id: 11,
        name: "Dr. Swati Rao",
        email: "swati.rao@skinsolutions.com",
        phone: "111-222-3333",
        hospital: "Skin Solutions",
        specialization: "Dermatology",
        fee: 600,
    },
    {
        id: 12,
        name: "Dr. Sameer Naik",
        email: "sameer.naik@skincare.com",
        phone: "222-333-4444",
        hospital: "Skin Care Clinic",
        specialization: "Dermatology",
        fee: 650,
    },
    {
        id: 13,
        name: "Dr. Aditi Agarwal",
        email: "aditi.agarwal@pediatricsclinic.com",
        phone: "333-444-5555",
        hospital: "Pediatrics Clinic",
        specialization: "Pediatrics",
        fee: 700,
    },
    {
        id: 14,
        name: "Dr. Pankaj Dubey",
        email: "pankaj.dubey@childcare.com",
        phone: "444-555-6666",
        hospital: "Child Care Center",
        specialization: "Pediatrics",
        fee: 750,
    },
    {
        id: 15,
        name: "Dr. Vishal Sinha",
        email: "vishal.sinha@mentalwellness.com",
        phone: "555-666-7777",
        hospital: "Mental Wellness Center",
        specialization: "Psychiatry",
        fee: 900,
    },
    {
        id: 16,
        name: "Dr. Nisha Pandey",
        email: "nisha.pandey@mindclinic.com",
        phone: "666-777-8888",
        hospital: "Mind Clinic",
        specialization: "Psychiatry",
        fee: 950,
    },
    {
        id: 17,
        name: "Dr. Anil Khanna",
        email: "anil.khanna@oncocenter.com",
        phone: "777-888-9999",
        hospital: "Oncology Center",
        specialization: "Oncology",
        fee: 1500,
    },
    {
        id: 18,
        name: "Dr. Suman Tiwari",
        email: "suman.tiwari@cancerclinic.com",
        phone: "888-999-0000",
        hospital: "Cancer Clinic",
        specialization: "Oncology",
        fee: 1550,
    },
    {
        id: 19,
        name: "Dr. Abhay Kumar",
        email: "abhay.kumar@gastrohealth.com",
        phone: "999-000-1111",
        hospital: "Gastro Health Clinic",
        specialization: "Gastroenterology",
        fee: 1000,
    },
    {
        id: 20,
        name: "Dr. Smita Bhargava",
        email: "smita.bhargava@digestionclinic.com",
        phone: "000-111-2222",
        hospital: "Digestion Clinic",
        specialization: "Gastroenterology",
        fee: 1050,
    },
    {
        id: 21,
        name: "Dr. Rohan Patel",
        email: "rohan.patel@endocrineclinic.com",
        phone: "111-222-3333",
        hospital: "Endocrine Clinic",
        specialization: "Endocrinology",
        fee: 1100,
    },
    {
        id: 22,
        name: "Dr. Kavya Iyer",
        email: "kavya.iyer@hormonecenter.com",
        phone: "222-333-4444",
        hospital: "Hormone Center",
        specialization: "Endocrinology",
        fee: 1150,
    },
    {
        id: 23,
        name: "Dr. Reena Sharma",
        email: "reena.sharma@eyeclinic.com",
        phone: "333-444-5555",
        hospital: "Eye Clinic",
        specialization: "Ophthalmology",
        fee: 800,
    },
    {
        id: 24,
        name: "Dr. Arjun Kapoor",
        email: "arjun.kapoor@visioncenter.com",
        phone: "444-555-6666",
        hospital: "Vision Center",
        specialization: "Ophthalmology",
        fee: 850,
    },
    {
        id: 25,
        name: "Dr. Pooja Reddy",
        email: "pooja.reddy@urologycenter.com",
        phone: "555-666-7777",
        hospital: "Urology Center",
        specialization: "Urology",
        fee: 900,
    },
    {
        id: 26,
        name: "Dr. Deepak Arora",
        email: "deepak.arora@kidneyclinic.com",
        phone: "666-777-8888",
        hospital: "Kidney Clinic",
        specialization: "Urology",
        fee: 950,
    },
    {
        id: 27,
        name: "Dr. Shruti Jain",
        email: "shruti.jain@womenshealth.com",
        phone: "777-888-9999",
        hospital: "Women's Health Center",
        specialization: "Gynecology",
        fee: 1000,
    },
    {
        id: 28,
        name: "Dr. Amit Mehta",
        email: "amit.mehta@gynecare.com",
        phone: "888-999-0000",
        hospital: "GyneCare Clinic",
        specialization: "Gynecology",
        fee: 1050,
    },
    {
        id: 29,
        name: "Dr. Sunil Shah",
        email: "sunil.shah@breathwell.com",
        phone: "999-000-1111",
        hospital: "Breath Well Clinic",
        specialization: "Pulmonology",
        fee: 950,
    },
    {
        id: 30,
        name: "Dr. Ankita Gupta",
        email: "ankita.gupta@lunghealth.com",
        phone: "000-111-2222",
        hospital: "Lung Health Center",
        specialization: "Pulmonology",
        fee: 1000,
    },
    {
        id: 31,
        name: "Dr. Rahul Kumar",
        email: "rahul.kumar@arthritiscenter.com",
        phone: "111-222-3333",
        hospital: "Arthritis Center",
        specialization: "Rheumatology",
        fee: 800,
    },
    {
        id: 32,
        name: "Dr. Sonali Deshpande",
        email: "sonali.deshpande@jointclinic.com",
        phone: "222-333-4444",
        hospital: "Joint Clinic",
        specialization: "Rheumatology",
        fee: 850,
    },
    {
        id: 33,
        name: "Dr. Vivek Singh",
        email: "vivek.singh@painmanagement.com",
        phone: "333-444-5555",
        hospital: "Pain Management Clinic",
        specialization: "Anesthesiology",
        fee: 700,
    },
    {
        id: 34,
        name: "Dr. Alka Mukherjee",
        email: "alka.mukherjee@anesthesiacenter.com",
        phone: "444-555-6666",
        hospital: "Anesthesia Center",
        specialization: "Anesthesiology",
        fee: 750,
    },
    {
        id: 35,
        name: "Dr. Dinesh Rathi",
        email: "dinesh.rathi@cityhospital.com",
        phone: "555-666-7777",
        hospital: "City Hospital",
        specialization: "General Physician",
        fee: 550,
    },
    {
        id: 36,
        name: "Dr. Priyanka Kaul",
        email: "priyanka.kaul@healthclinic.com",
        phone: "666-777-8888",
        hospital: "Health Clinic",
        specialization: "General Physician",
        fee: 600,
    },
    {
        id: 37,
        name: "Dr. Manish Chawla",
        email: "manish.chawla@heartwell.com",
        phone: "777-888-9999",
        hospital: "HeartWell Hospital",
        specialization: "Cardiology",
        fee: 1200,
    },
    {
        id: 38,
        name: "Dr. Tanya Reddy",
        email: "tanya.reddy@pediatricclinic.com",
        phone: "888-999-0000",
        hospital: "Pediatric Clinic",
        specialization: "Pediatrics",
        fee: 800,
    },
    {
        id: 39,
        name: "Dr. Vijay Shah",
        email: "vijay.shah@dermatologyclinic.com",
        phone: "999-000-1111",
        hospital: "Dermatology Clinic",
        specialization: "Dermatology",
        fee: 700,
    },
    {
        id: 40,
        name: "Dr. Neetu Garg",
        email: "neetu.garg@orthocare.com",
        phone: "000-111-2222",
        hospital: "OrthoCare Clinic",
        specialization: "Orthopedics",
        fee: 750,
    },
];

const UserProfile = ({ email, width, height }) => {
    const avatarUrl = getGravatarUrl(email);

    return (
        <Image
            src={avatarUrl}
            alt="User  Profile Picture"
            width={width}
            height={height}
            className="rounded-full"
        />
    );
};

const Page = () => {
    const [selectedSpecialization, setSelectedSpecialization] = useState(""); // Empty string to show all doctors initially

    const [sortByFee, setSortByFee] = useState(false); // State for sorting

    const handleSpecializationChange = (event) => {
        setSelectedSpecialization(event.target.value);
    };

    const handleSortByFee = () => {
        setSortByFee(!sortByFee);
    };

    const filteredDoctors = doctors.filter((doctor) => {
        if (selectedSpecialization === "") {
            return true;
        }

        return doctor.specialization === selectedSpecialization;
    });

    if (sortByFee) {
        filteredDoctors.sort((a, b) => a.fee - b.fee);
    }

    return (
        <div className="flex flex-row flex-1">
            <div className="w-1/4 bg-neutral-100 p-4">
                <h3 className="font-semibold text-xl">Select Specialization</h3>

                <div className="mt-2 p-2 rounded flex flex-col overflow-scroll">
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200  rounded-md ${
                            selectedSpecialization === ""
                        } ? 'bg-gradient-to-br from-teal-600 to-teal-800' : bg-neutral-200`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value=""
                            checked={selectedSpecialization === ""}
                            onChange={handleSpecializationChange}
                        />
                        All Specializations
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "General Physician"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="General Physician"
                            checked={
                                selectedSpecialization === "General Physician"
                            }
                            onChange={handleSpecializationChange}
                        />
                        General Physician
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Geriatrics"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Geriatrics"
                            checked={selectedSpecialization === "Geriatrics"}
                            onChange={handleSpecializationChange}
                        />
                        Geriatrics
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Cardiology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Cardiology"
                            checked={selectedSpecialization === "Cardiology"}
                            onChange={handleSpecializationChange}
                        />
                        Cardiology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Neurology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Neurology"
                            checked={selectedSpecialization === "Neurology"}
                            onChange={handleSpecializationChange}
                        />
                        Neurology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Orthopedics"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Orthopedics"
                            checked={selectedSpecialization === "Orthopedics"}
                            onChange={handleSpecializationChange}
                        />
                        Orthopedics
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Dermatology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Dermatology"
                            checked={selectedSpecialization === "Dermatology"}
                            onChange={handleSpecializationChange}
                        />
                        Dermatology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Pediatrics"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Pediatrics"
                            checked={selectedSpecialization === "Pediatrics"}
                            onChange={handleSpecializationChange}
                        />
                        Pediatrics
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Psychiatry"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Psychiatry"
                            checked={selectedSpecialization === "Psychiatry"}
                            onChange={handleSpecializationChange}
                        />
                        Psychiatry
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Oncology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Oncology"
                            checked={selectedSpecialization === "Oncology"}
                            onChange={handleSpecializationChange}
                        />
                        Oncology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Gastroenterology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            type="radio"
                            hidden={true}
                            name="specialization"
                            value="Gastroenterology"
                            checked={
                                selectedSpecialization === "Gastroenterology"
                            }
                            onChange={handleSpecializationChange}
                        />
                        Gastroenterology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Endocrinology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Endocrinology"
                            checked={selectedSpecialization === "Endocrinology"}
                            onChange={handleSpecializationChange}
                        />
                        Endocrinology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Ophthalmology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Ophthalmology"
                            checked={selectedSpecialization === "Ophthalmology"}
                            onChange={handleSpecializationChange}
                        />
                        Ophthalmology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Urology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Urology"
                            checked={selectedSpecialization === "Urology"}
                            onChange={handleSpecializationChange}
                        />
                        Urology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Gynecology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Gynecology"
                            checked={selectedSpecialization === "Gynecology"}
                            onChange={handleSpecializationChange}
                        />
                        Gynecology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Pulmonology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Pulmonology"
                            checked={selectedSpecialization === "Pulmonology"}
                            onChange={handleSpecializationChange}
                        />
                        Pulmonology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Rheumatology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Rheumatology"
                            checked={selectedSpecialization === "Rheumatology"}
                            onChange={handleSpecializationChange}
                        />
                        Rheumatology
                    </label>
                    <label
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 text-black rounded-md ${
                            selectedSpecialization === "Anesthesiology"
                                ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                : "bg-neutral-200 text-black"
                        }`}
                    >
                        <input
                            hidden={true}
                            type="radio"
                            name="specialization"
                            value="Anesthesiology"
                            checked={
                                selectedSpecialization === "Anesthesiology"
                            }
                            onChange={handleSpecializationChange}
                        />
                        Anesthesiology
                    </label>
                </div>
            </div>

            <div className="w-3/4 bg-neutral-200 px-16 py-8">
                <h2 className="text-2xl font-semibold text-black">
                    Book your appointment with Vitalis
                </h2>

                <button
                    onClick={handleSortByFee}
                    className="mt-4 p-2 bg-gray-500 text-white rounded flex flex-row justify-center items-center space-x-2 hover:bg-gray-600 duration-300 transition-all"
                >
                    <FaSortAmountDownAlt /> <p>Sort by Fee</p>
                </button>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    {filteredDoctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="flex flex-row p-2 border rounded bg-white justify-between"
                        >
                            <div className="flex flex-row items-center">
                                <UserProfile
                                    email={doctor.email}
                                    width={75}
                                    height={50}
                                />
                                <div className="flex flex-col ml-4">
                                    <strong>{doctor.name}</strong>
                                    <span>{doctor.phone}</span>
                                    <span>{doctor.specialization}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <span className="flex flex-row items-center">
                                    Fee: <FaIndianRupeeSign />
                                    {doctor.fee}
                                </span>
                                <button className="mt-2 px-2 py-1 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-md hover:scale-105 duration-300 transition-all">
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
