"use client";

import React, { useEffect, useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { checkToken, getDecoded } from "@/src/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Loading from "@/src/components/Loading";
import Web3 from "web3";
import { APPOINTMENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import APPOINT_ABI from "@/src/../contracts/appointment.abi.json";

import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import DOCTOR_ABI from "@/src/../contracts/doctor.abi.json";

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
            alt="User Profile Picture"
            width={width}
            height={height}
            className="rounded-full"
        />
    );
};

const page = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [appointments, setAppointments] = useState({});

    const [data, setData] = useState<any>({
        name: "Samkit Samsukha",
        email: "samkitsamsukha.is23@rvce.edu.in",
        phone: "9239089089",
        license: "xxxxxxxxxxx",
        education: "idk",
        specialization: "idk",
    });

    const connectAndGetDetails = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();
            
            const contract = new new_web3.eth.Contract(
                APPOINT_ABI,
                APPOINTMENT_CONTRACT_ADDRESS
            );
            const docContract = new new_web3.eth.Contract(
                DOCTOR_ABI,
                DOCTOR_CONTRACT_ADDRESS
            );

            const docDetails: any = await docContract.methods
                .getDoctor(res[0])
                .call({
                    from: res[0],
                });
            console.log(docDetails);
            setData(docDetails);
            const details: any = await contract.methods
                .getDoctorAppointments(res[0])
                .call({
                    from: res[0],
                });
            setAppointments(details);
            console.log(details);
            setLoading(false);
        }
    };

    const verifyDoctor = async () => {
        const verify = await checkToken(localStorage.getItem("token") || "");
        const decoded = await getDecoded(localStorage.getItem("token") || "");

        //@ts-ignore
        if (decoded?.type == "patient") {
            router.push("/patient");
            toast.info("You are a patient !!");
        }

        if (!verify) {
            router.push("/login/doctor");
            toast.error("Please log in to continue !!");
            return;
        }

        // get doctors details
        connectAndGetDetails();
    };

    useEffect(() => {
        verifyDoctor();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="bg-neutral-200 flex flex-row text-black flex-1 min-h-screen">
            <div className="w-1/4 bg-neutral-100 p-6 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <UserProfile
                        email={data.contact.emailId}
                        width={200}
                        height={300}
                        // @ts-ignore
                        className="rounded-md shadow-lg"
                    />
                </div>
                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Dr. {data.name}
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                        License No. - {data.licenceNumber}
                    </p>
                </div>
                <div className="mt-6 w-full p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg">Qualification</h3>
                    <p className="mt-1 text-sm">
                        <span className="font-semibold">Education:</span>{" "}
                        {data.education}
                    </p>
                    <p className="mt-1 text-sm">
                        <span className="font-semibold">Specialization:</span>{" "}
                        {data.specialization}
                    </p>
                </div>
                <div className="mt-4 w-full p-3 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-lg shadow-md flex items-center">
                    <span className="material-icons text-xl mr-2">phone</span>
                    <p className="text-sm">{data.contact.phoneNumber}</p>
                </div>
                <div className="mt-3 w-full p-3 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-lg shadow-md flex items-center">
                    <span className="material-icons text-xl mr-2">email</span>
                    <p className="text-sm truncate">{data.contact.emailId}</p>
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold py-6">Appointments</div>
                <div className="grid grid-cols-2 gap-8">
                    {/* @ts-ignore */}
                    {appointments.map((appointment, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-row space-x-4 items-center">
                                <UserProfile
                                    email={appointment.patientEmail}
                                    width={60}
                                    height={60}
                                    // @ts-ignore
                                    className="rounded-full shadow-sm"
                                />
                                <div className="flex flex-col">
                                    <p className="text-lg font-bold text-gray-800">
                                        {appointment.patientName ||
                                            "Unknown User"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {appointment.patientEmail ||
                                            "Unknown Email"}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(
                                            appointment.dateTime
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={`/diagnostic/${appointment.patient}`}
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-md shadow hover:from-cyan-600 hover:to-cyan-800 focus:outline-none focus:ring focus:ring-cyan-300 hover:scale-105 transform transition-all duration-300"
                            >
                                Generate Diagnosis
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
