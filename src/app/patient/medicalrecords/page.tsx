"use client";

import React, { useEffect } from "react";
import md5 from "md5";
import Image from "next/image";
import { MdFileDownload } from "react-icons/md";
import { useState } from "react";
import { checkToken, getDecoded } from "@/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import { FaFilePdf } from "react-icons/fa6";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Web3 from "web3";
import {
    DIAGNOSIS_CONTACT_ADDRESS,
    PATIENT_CONTRACT_ADDRESS,
} from "../../../../contracts/contactAddress";
import DIA_ABI from "@/../contracts/diagnosis.abi.json";
import PAT_ABI from "@/../contracts/patient.abi.json";

const getGravatarUrl = (email: any, size = 200) => {
    if (!email) {
        return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }
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

const page = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        name: "Samkit Samsukha",
        gender: "Male",
        dob: "14/10/2005",
        phone: "9239089089",
        email: "samkitsamsukha.is23@rvce.edu.in",
        age: "19",
        bloodGroup: "A+",
        weight: "77",
        height: "181",
    });

    const [reports, setReports] = useState([
        {
            id: 1,
            doctor: "Dr. Jones",
            content: "xxxxxxxxxxxxxxxxx",
        },
        {
            id: 2,
            doctor: "Dr. Jones 1",
            content: "xxxxxxxxxxxxxxxxx",
        },
    ]);

    const connectAndGetDetails = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();

            const contract = new new_web3.eth.Contract(
                DIA_ABI,
                DIAGNOSIS_CONTACT_ADDRESS
            );

            const patientContract = new new_web3.eth.Contract(
                PAT_ABI,
                PATIENT_CONTRACT_ADDRESS
            );

            const patDetails: any = await patientContract.methods
                .getPatient(res[0])
                .call({
                    from: res[0],
                });

            setData(patDetails);
            console.log(patDetails);

            const ans: any = await contract.methods
                .getDoctorDiagnosis(res[0])
                .call();
            setReports(ans);

            setLoading(false);
        } else {
            console.log("Wallet not connected");
        }
    };

    async function verifyPatient() {
        const verify = await checkToken(localStorage.getItem("token") || "");
        const decoded = await getDecoded(localStorage.getItem("token") || "");

        //@ts-ignore
        if (decoded?.type == "doctor") {
            router.push("/doctor");
            toast.info("You are a doctor !!");
        }

        if (!verify) {
            toast.success("Please login to continue");
            router.push("/login/patient");
            return;
        }

        connectAndGetDetails();
    }

    useEffect(() => {
        verifyPatient();
    }, []);

    const router = useRouter();

    const [symptoms, setSymptoms] = useState("");
    const [age, setAge] = useState("19");
    const [doctors, setDoctors] = useState(
        "General Physician, Geriatrics, Cardiology, Neurology, Orthopedics, Dermatology, Pediatrics, Psychiatry, Oncology, Gastroenterology, Endocrinology, Ophthalmology, Urology, Gynecology, Pulmonology, Rheumatology, Anesthesiology"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://65hqhf12-3000.inc1.devtunnels.ms/recommend",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        symptoms,
                        age,
                        doctors,
                    }),
                }
            );
            const data = await response.json();
            console.log("API Response:", data); // Debugging: Check API response
            setResults(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="bg-neutral-200 min-h-screen flex flex-row text-black flex-1">
            <div className="w-1/4 bg-neutral-50 p-6 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <UserProfile email={data.email} width={120} height={120} />
                    <div className="mt-4 text-3xl font-bold text-gray-800">
                        {data.name}
                    </div>
                    <div className="mt-2 text-lg text-gray-600">
                        <span className="inline-flex items-center">
                            <i className="fas fa-venus-mars mr-2 text-teal-500"></i>
                            Gender: {data.gender}
                        </span>
                    </div>
                    <div className="text-lg text-gray-600 mt-1">
                        <span className="inline-flex items-center">
                            <i className="fas fa-birthday-cake mr-2 text-teal-500"></i>
                            DOB: {data.DOB}
                        </span>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="text-md bg-gradient-to-br from-teal-500 to-teal-700 p-2 rounded-md text-white font-medium shadow-md">
                        <i className="fas fa-phone-alt mr-2"></i>
                        {data.phoneNumber}
                    </div>
                    <div className="text-md bg-gradient-to-tr from-cyan-500 to-cyan-700 mt-2 p-2 rounded-md text-white font-medium shadow-md">
                        <i className="fas fa-envelope mr-2"></i>
                        {data.email}
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-white text-center">
                    <div className="p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg shadow-md">
                        <span className="font-semibold text-2xl">
                            {data.age} yrs
                        </span>
                        <br />
                        <span className="text-gray-200">Age</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-md">
                        <span className="font-semibold text-2xl">
                            {data.bloodGroup}
                        </span>
                        <br />
                        <span className="text-gray-200">Blood Group</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-md">
                        <span className="font-semibold text-2xl">
                            {data.weight} kg
                        </span>
                        <br />
                        <span className="text-gray-200">Weight</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg shadow-md">
                        <span className="font-semibold text-2xl">
                            {data.height} cm
                        </span>
                        <br />
                        <span className="text-gray-200">Height</span>
                    </div>
                </div>
            </div>

            <div className="p-12">
                <div className="text-3xl font-semibold p-2">
                    Medical Records
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {reports.map((report, index) => (
                        <div
                            key={index}
                            className="flex flex-row p-4 space-x-2 items-center bg-white rounded-md"
                        >
                            <FaFilePdf />
                            <p>Report from {report.doctor}</p>
                            <button
                                onClick={() => {
                                    alert("File downloading");
                                }}
                            >
                                <MdFileDownload />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
