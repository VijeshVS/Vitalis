"use client";

import React, { useEffect, useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { checkToken, getDecoded } from "@/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Web3 from "web3";
import { APPOINTMENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
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

    const [data, setData] = useState({
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
        <div className="bg-neutral-200 flex flex-row text-black flex-1">
            <div className="w-1/4 bg-neutral-100 p-5">
                <div className="ml-4 mt-4 ">
                    <UserProfile email={data.email} width={200} height={300} />
                </div>
                <div className="ml-6 mt-4 text-2xl text-black font-semibold ">
                    Dr. {data.name}
                    <br />
                    <span className="text-xl font-normal text-neutral-800">
                        License No. - {data.license}
                    </span>
                </div>
                <div className="ml-6 pl-3 p-1 mt-4 w-3/4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-md">
                    <span className="font-semibold">Qualification:</span>
                    <br />
                    Education: {data.education}
                    <br />
                    Specialization: {data.specialization}
                </div>
                <div className="ml-6 pl-3 mt-4 bg-gradient-to-br from-teal-600 to bg-teal-800 w-3/4 p-1 rounded-md text-white text-sm">
                    {data.phone}
                </div>
                <div className="ml-6 pl-3 mt-2 text-white bg-gradient-to-tr from-teal-600 w-3/4 overflow-hidden to-teal-800 p-1 rounded-md text-sm">
                    {data.email}
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold py-6">Appointments</div>
                <div className="grid grid-cols-2 gap-8">
                    {appointments.map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
                            <div className="flex flex-row space-x-4  justify-between items-center">
                                <UserProfile
                                    email={appointment.patientEmail}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col">
                                    <p className="text-xl font-semibold">
                                        {appointment.patientName ||
                                            "Unknown User"}
                                    </p>
                                    <p>
                                        {appointment.patientEmail ||
                                            "Unknown User"}
                                    </p>
                                    <p>
                                        {appointment.dateTime}
                                    </p>
                                </div>
                            </div>
                            <Link
                                className="flex flex-row justify-center items-center rounded-md px-2 h-fit py-1 bg-gradient-to-br hover:scale-105 duration-300 transition-all from-cyan-600 to-cyan-800 text-white"
                                href={"/diagnostic"}
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
