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
import { PATIENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import PATIENTABI from "@/../contracts/patient.abi.json";
import { APPOINTMENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import APPOINT_ABI from "@/../contracts/appointment.abi.json";

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
    const [appointments, setAppointments] = useState([
        {
            doctorName: "Dr. Smith",
            dateTime: "2023-11-15T10:00:00",
            email: "vijesh@gmail.com",
        },
        {
            doctorName: "Dr. Jones",
            dateTime: "2023-11-16T14:30:00",
            email: "",
        },
    ]);

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
                PATIENTABI,
                PATIENT_CONTRACT_ADDRESS
            );

            const appoint_contract = new new_web3.eth.Contract(
                APPOINT_ABI,
                APPOINTMENT_CONTRACT_ADDRESS
            );

            const ans: any = await contract.methods.getPatient(res[0]).call({
                from: res[0] as string,
            });

            const appoints: any = await appoint_contract.methods
                .getPatientAppointments(res[0])
                .call({
                    from: res[0] as string,
                });

            const new_data = {
                name: ans.name,
                gender: ans.gender,
                dob: ans.DOB,
                phone: ans.phoneNumber,
                email: ans.email,
                age: ans.age,
                bloodGroup: ans.bloodGroup,
                weight: ans.weight,
                height: ans.height,
            };

            console.log(appoints);
            setAppointments(appoints);

            setData(new_data);
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
        <div className="bg-neutral-200 flex flex-row text-black flex-1">
            <div className="w-1/4 bg-neutral-100 p-5">
                <div className="ml-4 mt-4 ">
                    <UserProfile email={data.email} width={200} height={200} />
                </div>
                <div className="ml-6 mt-4 text-2xl text-black font-semibold ">
                    {data.name}
                </div>
                <div className="ml-6 mt-4 text-black font-semibold">
                    Gender: {data.gender}
                </div>
                <div className="ml-6 text-black font-semibold">
                    DOB: {data.dob}
                </div>
                <div className="text-sm ml-6 pl-3 mt-4 bg-gradient-to-br from-teal-600 to bg-teal-800 w-3/4 p-1 rounded-md text-white font-semibold">
                    {data.phone}
                </div>
                <div className="text-sm ml-6 pl-3 mt-2 text-white bg-gradient-to-tr from-cyan-600 w-3/4 overflow-hidden to-cyan-800 p-1 rounded-md font-semibold">
                    {data.email}
                </div>
                <div className="ml-6 mt-4 grid grid-cols-2 gap-1 w-3/4 text-white text-center">
                    <div className="p-4 bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <span className="font-semibold text-xl">
                            {data.age} years
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Age</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <span className="font-semibold text-xl">
                            {data.bloodGroup}
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Blood Group</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <span className="font-semibold text-xl">
                            {data.weight} kg
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Weight</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <span className="font-semibold text-xl">
                            {data.height} cm
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Height</span>
                    </div>
                </div>
            </div>
            <div className="p-16 ">
                <div className="text-3xl font-semibold p-6">
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
