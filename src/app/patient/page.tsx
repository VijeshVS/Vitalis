"use client";

import React, { useEffect } from "react";
import md5 from "md5";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useState } from "react";
import { checkToken, getDecoded } from "@/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Web3 from "web3";
import { PATIENT_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import PATIENTABI from "@/../contracts/patient.abi.json";
import { APPOINTMENT_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import APPOINT_ABI from "@/../contracts/appointment.abi.json";

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

    const router = useRouter();

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

            const ans: any = await contract.methods.getPatient().call({
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
        if(decoded?.type == "doctor"){
            router.push('/doctor')
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
                <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }}
                    className="ml-4 mt-4 "
                >
                    <UserProfile email={data.email} width={200} height={200} />
                </motion.div>
                <motion.div whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }} className="ml-6 mt-4 text-2xl text-black font-semibold ">
                    {data.name}
                </motion.div>
                <motion.div whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }} className="ml-6 mt-4 text-black font-semibold">
                    Gender: {data.gender}
                </motion.div>
                <motion.div whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }} className="ml-6 text-black font-semibold">
                    DOB: {data.dob}
                </motion.div>
                <motion.div whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }} className="text-sm ml-6 pl-3 mt-4 bg-gradient-to-br from-teal-600 to bg-teal-800 w-3/4 p-1 rounded-md text-white font-semibold">
                    {data.phone}
                </motion.div>
                <motion.div whileInView={{ x: 0, opacity: 1 }}
					initial={{ x: -100, opacity: 0 }}
					transition={{ duration: 0.5 }} className="text-sm ml-6 pl-3 mt-2 text-white bg-gradient-to-tr from-cyan-600 w-3/4 overflow-hidden to-cyan-800 p-1 rounded-md font-semibold">
                    {data.email}
                </motion.div>
                <div className="ml-6 mt-4 grid grid-cols-2 gap-1 w-3/4 text-white text-center">
                    <motion.div whileInView={{ scale: 1, opacity: 1 }}
initial={{ scale: 0.5, opacity: 0 }}
transition={{ duration: 0.5, delay: 0.5 }}

 className="p-4 bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <span className="font-semibold text-xl">
                            {data.age} years
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Age</span>
                    </motion.div>
                    <motion.div whileInView={{ scale: 1, opacity: 1 }}
initial={{ scale: 0.5, opacity: 0 }}
transition={{ duration: 0.5, delay: 0.5 }}

 className="p-4 bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <span className="font-semibold text-xl">
                            {data.bloodGroup}
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Blood Group</span>
                    </motion.div>
                    <motion.div whileInView={{ scale: 1, opacity: 1 }}
initial={{ scale: 0.5, opacity: 0 }}
transition={{ duration: 0.5, delay: 0.5 }}

 className="p-4 bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <span className="font-semibold text-xl">
                            {data.weight} kg
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Weight</span>
                    </motion.div>
                    <motion.div whileInView={{ scale: 1, opacity: 1 }}
initial={{ scale: 0.5, opacity: 0 }}
transition={{ duration: 0.5, delay: 0.5 }}

 className="p-4 bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <span className="font-semibold text-xl">
                            {data.height} cm
                        </span>{" "}
                        <br />
                        <span className="text-neutral-200">Height</span>
                    </motion.div>
                </div>
            </div>
            <motion.div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold">Hello {data.name},</div>
                <div>
                    At Vitalis, we prioritize providing top-notch facilities for
                    our patients. We are committed to ensuring their comfort and
                    well-being. Additionally, we implement robust measures to
                    safeguard patient data, maintaining confidentiality and
                    security at all times. Your trust is our utmost priority.
                </div>
                <div className="flex md:flex-row flex-col md:space-x-4 justify-center">
                    <button className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center  hover:scale-105 duration-300 transition-all rounded-md bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <FaSuitcaseMedical />
                        <div className="pt-3">Access Medical Records</div>
                    </button>
                    <button className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:scale-105  duration-300 transition-all rounded-md bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <MdOutlineSecurity />
                        <div className="pt-3">Get insurance</div>
                    </button>
                    <button className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center  hover:scale-105 duration-300 transition-all rounded-md bg-gradient-to-br from-cyan-600 to bg-cyan-800">
                        <FaStethoscope />
                        <div className="pt-3">Consult a doctor</div>
                    </button>
                    <button className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:scale-105  duration-300 transition-all rounded-md bg-gradient-to-br from-teal-600 to bg-teal-800">
                        <RiMoneyRupeeCircleFill />
                        <div className="pt-3">Sell your data</div>
                    </button>
                </div>
                <div className="flex flex-row">
                    <div className="py-8 p-8 w-1/2 flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold mb-4 w-fit">
                            Symptom Checker
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="symptoms"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Symptoms:
                                </label>
                                <textarea
                                    id="symptoms"
                                    placeholder="Enter the symptoms here"
                                    rows={2}
                                    className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={symptoms}
                                    onChange={(e) =>
                                        setSymptoms(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-br from-cyan-600 to-cyan-800 duration-300 transition-all text-white font-bold py-2 px-4 rounded"
                            >
                                {isLoading
                                    ? "Loading..."
                                    : "Get Recommendation"}
                            </button>
                        </form>
                        <button type="submit" className="bg-blue-300 hover:bg-blue-400 mt-8 duration-300 transition-all text-black font-bold py-2 px-4 rounded"
                        >
                            {isLoading
                                    ? "Loading..."
                                    : "Submit Data"}
                            
                        </button>
                        {/* @ts-ignore */}
                        {results?.specialty && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Recommended Specialty:
                                </h3>
                                {/* @ts-ignore */}
                                <p>{results.specialty}</p>
                            </div>
                        )}
                    </div>
                    <div className="py-8 p-8 w-1/2 flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold mb-4 w-fit">
                            Future Appointments
                        </h2>
                        <ul>
                            {appointments.map((appointment, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <div className=" flex flex-row items-center space-x-4 border-b-[1px] border-gray-300 w-full">
                                        {/* <UserProfile email={appointment.email} width={50} height={50}/> */}
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {/* @ts-ignore */}
                                                {appointment.name} |{" "}
                                                {/* {appointment.specialization} */}
                                            </span>
                                            <span className="text-gray-600">
                                                {appointment.dateTime}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default page;
