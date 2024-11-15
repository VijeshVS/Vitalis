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
        <div className="bg-neutral-200 min-h-screen flex flex-row text-black flex-1">
            <div className="w-1/4 flex flex-col items-center bg-neutral-50 p-6 rounded-lg shadow-lg">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="ml-4 mt-4"
                >
                    <UserProfile
                        email={data.email}
                        width={200}
                        height={200}
                        className="rounded-full shadow-md"
                    />
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-2xl text-gray-800 font-bold tracking-wide"
                >
                    {data.name}
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-gray-700 font-medium"
                >
                    Gender: {data.gender}
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-700 font-medium"
                >
                    DOB: {data.dob}
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm pl-4 mt-4 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 w-3/4 p-2 rounded-md text-white shadow-lg font-semibold"
                >
                    {data.phone}
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm pl-4 mt-2 bg-gradient-to-r from-cyan-500 to-cyan-700 w-3/4 p-2 rounded-md text-white shadow-lg font-semibold"
                >
                    {data.email}
                </motion.div>

                <div className="mt-6 grid grid-cols-2 gap-3 w-3/4 text-white text-center">
                    {[
                        {
                            label: "Age",
                            value: `${data.age} years`,
                            colors: "from-cyan-500 to-cyan-700",
                        },
                        {
                            label: "Blood Group",
                            value: data.bloodGroup,
                            colors: "from-teal-500 to-teal-700",
                        },
                        {
                            label: "Weight",
                            value: `${data.weight} kg`,
                            colors: "from-teal-500 to-teal-700",
                        },
                        {
                            label: "Height",
                            value: `${data.height} cm`,
                            colors: "from-cyan-500 to-cyan-700",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileInView={{ scale: 1, opacity: 1 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 70,
                                damping: 15,
                                delay: 0.2 * index,
                            }}
                            className={`p-4 bg-gradient-to-br ${item.colors} rounded-lg shadow-md`}
                        >
                            <span className="font-bold text-lg">
                                {item.value}
                            </span>
                            <br />
                            <span className="text-neutral-300 text-sm">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl font-semibold w-fit"
                >
                    Hello {data.name},{" "}
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    At Vitalis, we prioritize providing top-notch facilities for
                    our patients. We are committed to ensuring their comfort and
                    well-being. Additionally, we implement robust measures to
                    safeguard patient data, maintaining confidentiality and
                    security at all times. Your trust is our utmost priority.
                </motion.div>

                <motion.div className="flex md:flex-row flex-col md:space-x-4 justify-center">
                    <motion.button
                        whileInView={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center  hover:scale-105 duration-300 transition-all rounded-md bg-gradient-to-br from-cyan-600 to bg-cyan-800"
                    >
                        <FaSuitcaseMedical />
                        <div
                            className="pt-3"
                            onClick={() => router.push("/patient/medicalrecords")}
                        >
                            Access Medical Records
                        </div>
                    </motion.button>
                    <motion.button
                        whileInView={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:scale-105  duration-300 transition-all rounded-md bg-gradient-to-br from-teal-600 to bg-teal-800"
                    >
                        <MdOutlineSecurity />
                        <div className="pt-3">Get insurance</div>
                    </motion.button>
                    <motion.button
                        onClick={() => router.push("/book")}
                        whileInView={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center  hover:scale-105 duration-300 transition-all rounded-md bg-gradient-to-br from-cyan-600 to bg-cyan-800"
                    >
                        <FaStethoscope />
                        <div className="pt-3">Consult a doctor</div>
                    </motion.button>
                    <motion.button
                        whileInView={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:scale-105  duration-300 transition-all rounded-md bg-gradient-to-br from-teal-600 to bg-teal-800"
                    >
                        <RiMoneyRupeeCircleFill />
                        <div className="pt-3">Sell your data</div>
                    </motion.button>
                </motion.div>
                <motion.div
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-row"
                >
                    <div className="py-8 w-1/2 mx-auto flex flex-col space-y-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            Symptom Checker
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="symptoms"
                                    className="block text-lg font-semibold text-gray-700"
                                >
                                    Enter Your Symptoms:
                                </label>
                                <textarea
                                    id="symptoms"
                                    placeholder="Describe your symptoms in detail..."
                                    rows={4}
                                    className="shadow-sm resize-none appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    value={symptoms}
                                    onChange={(e) =>
                                        setSymptoms(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className={`bg-gradient-to-r from-teal-500 via-cyan-600 to-cyan-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-600 ${
                                    isLoading && "cursor-wait"
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <span className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
                                        <span>Analyzing...</span>
                                    </span>
                                ) : (
                                    "Get Recommendation"
                                )}
                            </button>
                        </form>
                        {results?.specialty && (
                            <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-inner">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Recommended Specialty:
                                </h3>
                                <p className="text-lg text-teal-700 font-medium">
                                    {results.specialty}
                                </p>
                                <button
                                    className="mt-4 bg-gradient-to-r from-teal-600 to-teal-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    onClick={() =>
                                        router.push(
                                            `/book?sp=${results.specialty}`
                                        )
                                    }
                                >
                                    Book an Appointment
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="py-8 p-8 w-1/2 flex flex-col space-y-4">
                        <h2 className="text-3xl font-bold mb-4 w-fit">
                            Future Appointments
                        </h2>
                        <ul>
                            {appointments.map((appointment, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-2"
                                >
                                    <div className=" flex flex-row items-center bg-white space-x-4 p-2 w-3/4 rounded-md">
                                        <UserProfile
                                            email={appointment.email}
                                            width={50}
                                            height={50}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {/* @ts-ignore */}
                                                {appointment.name} |{" "}
                                                {appointment.specialization}
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
                </motion.div>
            </motion.div>
        </div>
    );
};

export default page;
