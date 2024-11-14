"use client";

import React from "react";
import md5 from "md5";
import Image from "next/image";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useState } from "react";

const data = {
    name: "Samkit Samsukha",
    gender: "Male",
    dob: "14/10/2005",
    phone: "9239089089",
    email: "samkitsamsukha.is23@rvce.edu.in",
    age: "19",
    bloodGroup: "A+",
    weight: "77",
    height: "181",
};

const getGravatarUrl = (email, size = 200) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const UserProfile = ({ email }) => {
    const avatarUrl = getGravatarUrl(email);

    return (
        <Image
            src={avatarUrl}
            alt="User Profile Picture"
            width={200}
            height={200}
            className="rounded-full"
        />
    );
};

const page = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    console.log(params);

    const [appointments, setAppointments] = useState([
        {
            doctorName: "Dr. Smith",
            dateTime: "2023-11-15T10:00:00",
        },
        {
            doctorName: "Dr. Jones",
            dateTime: "2023-11-16T14:30:00",
        },
    ]);
    const [symptoms, setSymptoms] = useState("");
    const [age, setAge] = useState("19");
    const [doctors, setDoctors] = useState(
        "General Physician, Geriatrics, Cardiology, Neurology, Orthopedics, Dermatology, Pediatrics, Psychiatry, Oncology, Gastroenterology, Endocrinology, Ophthalmology, Urology, Gynecology, Pulmonology, Rheumatology, Anesthesiology"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const handleSubmit = async (e) => {
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

    return (
        <div className="bg-neutral-200 flex flex-row text-black flex-1">
            <div className="w-1/4 bg-neutral-100 p-5">
                <div className="ml-4 mt-4 ">
                <UserProfile email={data.email} />

                </div>
                <div className="ml-6 mt-4 text-2xl text-blue-950 font-semibold ">
                    {data.name}
                </div>
                <div className="ml-6 mt-4 text-black font-semibold">
                    Gender - {data.gender}
                </div>
                <div className="ml-6 text-black font-semibold">
                    DOB - {data.dob}
                </div>
                <div className="ml-6 pl-3 mt-4 bg-gradient-to-br from-green-200 to bg-green-300 w-3/4 p-1 rounded-md text-black font-semibold">
                    {data.phone}
                </div>
                <div className="ml-6 pl-3 mt-2 text-black bg-gradient-to-tr from-teal-500 w-3/4 overflow-hidden to-teal-500 p-1 rounded-md font-semibold">
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
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
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
                                className="bg-blue-300 hover:bg-blue-400 duration-300 transition-all text-black font-bold py-2 px-4 rounded"
                            >
                                {isLoading
                                    ? "Loading..."
                                    : "Get Recommendation"}
                            </button>
                        </form>
                        {results?.specialty && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">
                                    Recommended Specialty:
                                </h3>
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
                                    <div className="flex items-center">
                                        <span className="font-medium">
                                            {appointment.doctorName}
                                        </span>
                                        <span className="ml-2 text-gray-600">
                                            {new Date(
                                                appointment.dateTime
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}{" "}
                                            at{" "}
                                            {new Date(
                                                appointment.dateTime
                                            ).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            })}{" "}
                                            IST
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
