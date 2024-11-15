"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaSortAmountDownAlt } from "react-icons/fa";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import DOCTOR_ABI from "@/../contracts/doctor.abi.json";
import Loading from "@/components/Loading";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { APPOINTMENT_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import APPOINT_ABI from "@/../contracts/appointment.abi.json";

import { PATIENT_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import PATIENT_ABI from "@/../contracts/patient.abi.json";

const getGravatarUrl = (email: any, size = 200) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const UserProfile = ({
    email,
    width,
    height,
}: {
    email: any;
    width: any;
    height: any;
}) => {
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
    const [loading, setLoading] = useState(true);
    const [sortByFee, setSortByFee] = useState(false); // State for sorting
    const [doctors,setDoctors] = useState([
        {
            id: 1,
            name: "Dr. Rajiv Sharma",
            email: "rajiv.sharma@healthcenter.com",
            phone: "123-456-7890",
            hospital: "City Hospital",
            specialization: "General Physician",
            education: "fill data",
            experience: 7,
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
    ])

    const handleSpecializationChange = (event: any) => {
        setSelectedSpecialization(event.target.value);
    };

    async function getDoctors() {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();
            const contract = new new_web3.eth.Contract(
                DOCTOR_ABI,
                DOCTOR_CONTRACT_ADDRESS
            );

            const details:any = await contract.methods.getAllDoctors().call({
                from: res[0],
            });
            console.log(details)
            setDoctors(details)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDoctors();
    }, []);

    const handleSortByFee = () => {
        setSortByFee(!sortByFee);
    };

    const filteredDoctors = doctors.filter((doctor) => {
        if (selectedSpecialization === "") {
            return true;
        }

        return doctor.specialization === selectedSpecialization;
    });

    async function handleAddingAppointment(index: any) {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts(); // patient
            const contract = new new_web3.eth.Contract(
                APPOINT_ABI,
                APPOINTMENT_CONTRACT_ADDRESS
            );

            const docContract = new new_web3.eth.Contract(
                DOCTOR_ABI,
                DOCTOR_CONTRACT_ADDRESS
            );

            const patContract = new new_web3.eth.Contract(
                PATIENT_ABI,
                PATIENT_CONTRACT_ADDRESS
            );

            const patientDetails = await patContract.methods
                .getPatient(res[0])
                .call({
                    from: res[0],
                });

            const doctorDetails = await docContract.methods.getDoctor().call({
                from: res[0]
            })

            console.log(patientDetails);
            console.log(filteredDoctors[index]);

            // const details = await contract.methods.createAppointment().send({
            //     from: res[0]
            // })

            // console.log(details);
        }
    }

    if (sortByFee) {
        filteredDoctors.sort((a, b) => a.fee - b.fee);
    }

    if (loading) return <Loading />;

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
                        className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 hover:bg-cyan-300 duration-300 transition-all text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                        className={`px-4 py-1 w-3/4 m-1 hover:bg-cyan-300 duration-300 transition-al bg-neutral-200 text-black rounded-md ${
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
                    {doctors.map((doctor, index) => (
                        <div
                            // @ts-ignore
                            key={doctor.docAddress}
                            className="flex flex-row p-2 border rounded bg-white justify-between"
                        >
                            <div className="flex flex-row items-center">
                                <UserProfile
                                    // @ts-ignore
                                    email={doctor.contact.emailId}
                                    width={75}
                                    height={50}
                                />
                                <div className="flex flex-col ml-4">
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <strong>{doctor.name}</strong>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="">
                                            <div className="p-2 flex flex-col justify-center items-center space-y-2">
                                                <UserProfile
                                                    email={doctor.email}
                                                    width={75}
                                                    height={50}
                                                />
                                                <strong>{doctor.name}</strong>
                                                <p className="">
                                                    {doctor.specialization}
                                                </p>
                                                <p className="">
                                                    {doctor.hospital}
                                                </p>
                                                <p className="">
                                                    {doctor.education}
                                                </p>
                                                <p className="">
                                                    {doctor.experience} years of
                                                    experience
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <span>{doctor.phone}</span>
                                    <span>{doctor.specialization}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <span className="flex flex-row items-center">
                                    Fee: <FaIndianRupeeSign />
                                    500
                                </span>
                                <button
                                    onClick={() =>
                                        handleAddingAppointment(index)
                                    }
                                    className="mt-2 px-2 py-1 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-md hover:scale-105 duration-300 transition-all"
                                >
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
