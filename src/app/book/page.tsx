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
<<<<<<< HEAD
import { useSearchParams } from "next/navigation";
=======
import { toast } from "sonner";
>>>>>>> a0db672 (commit)

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
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedSpecialization, setSelectedSpecialization] = useState(searchParams?.[1] || "");
    const [loading, setLoading] = useState(true);
    const [sortByFee, setSortByFee] = useState(false); // State for sorting
    const [doctors, setDoctors] = useState([]);

<<<<<<< HEAD
    const specializations = {
        "": "All Specializations",
        "General Physician": "General Physician",
        Geriatrics: "Geriatrics",
        Cardiology: "Cardiology",
        Neurology: "Neurology",
        Orthopedics: "Orthopedics",
        Dermatology: "Dermatology",
        Pediatrics: "Pediatrics",
        Psychiatry: "Psychiatry",
        Oncology: "Oncology",
        Gastroenterology: "Gastroenterology",
        Endocrinology: "Endocrinology",
        Ophthalmology: "Ophthalmology",
        Urology: "Urology",
        Gynecology: "Gynecology",
        Pulmonology: "Pulmonology",
        Rheumatology: "Rheumatology",
        Anesthesiology: "Anesthesiology",
    };
=======
    const [bookLoading,setBookLoading] = useState(false);

    useEffect(() => {
        let toastId: any;

        if (bookLoading) {
            toastId = toast("Booking appointment...", {
                icon: "⏳",
                duration: Infinity,
            });
        } else {
            toast.dismiss(toastId);
        }

        return () => {
            if (toastId) toast.dismiss(toastId);
        };
    }, [bookLoading]);
>>>>>>> a0db672 (commit)

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

            const details: any = await contract.methods.getAllDoctors().call({
                from: res[0],
            });
            console.log(details);
            setDoctors(details);
            setLoading(false);
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
        // @ts-ignore
        return doctor.specialization === selectedSpecialization;
    });

    async function handleAddingAppointment(index: any) {
        setBookLoading(true)
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

            const patientDetails: any = await patContract.methods
                .getPatient(res[0])
                .call({
                    from: res[0],
                });

<<<<<<< HEAD
            const doctorDetails = await docContract.methods.getDoctor().call({
                from: res[0],
            });
=======
            const doctorDetails: any = await docContract.methods
                // @ts-ignore
                .getDoctor(filteredDoctors[index].docAddress)
                .call({
                    from: res[0],
                });
>>>>>>> a0db672 (commit)

            const details = await contract.methods
                .createAppointment(
                    res[0],
                    // @ts-ignore
                    filteredDoctors[index].docAddress,
                    new Date().toDateString(),
                    doctorDetails.name,
                    doctorDetails.specialization,
                    doctorDetails.contact.emailId,
                    patientDetails.name,
                    patientDetails.email
                )
                .send({
                    from: res[0],
                });
            setBookLoading(false)
            console.log("whhwa")
            toast.success(`Appointment with ${doctorDetails.name} booked successfully`)
        }
    }

    if (loading) return <Loading />;

    return (
        <div className="flex flex-row flex-1">
            <div className="w-1/4 bg-neutral-100 p-4">
                <h3 className="font-semibold text-xl">Select Specialization</h3>

                <div className="mt-2 p-2 rounded flex flex-col overflow-scroll">
                    {Object.entries(specializations).map(([key, value]) => (
                        <label
                            key={key}
                            className={`px-4 py-1 w-3/4 m-1 bg-neutral-200 hover:bg-cyan-300 duration-300 cursor-pointer transition-all rounded-md ${
                                selectedSpecialization === key
                                    ? "bg-gradient-to-br from-teal-600 to-teal-800 text-white font-semibold"
                                    : "bg-neutral-200 text-black"
                            }`}
                        >
                            <input
                                hidden={true}
                                type="radio"
                                name="specialization"
                                value={key}
                                checked={selectedSpecialization === key}
                                onChange={handleSpecializationChange}
                            />
                            {value}
                        </label>
                    ))}
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
                    {filteredDoctors.map((doctor, index) => (
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
                                            <div className="flex flex-col justify-center items-center">
                                                <UserProfile
                                                    // @ts-ignore
                                                    email={
                                                        doctor.contact.emailId
                                                    }
                                                    width={75}
                                                    height={50}
                                                />
                                                <strong className="mt-2">
                                                    {doctor.name}
                                                </strong>
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
                                                    {/* @ts-ignore */}
                                                    {doctor.yoe} years of
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
