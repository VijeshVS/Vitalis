"use client";

import React, { useEffect, useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { checkToken, getDecoded } from "@/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../contracts/contactAddress";
import DOCTOR_ABI from "@/../contracts/doctor.abi.json";
import Calendar from "@/components/ui/calender";

const getGravatarUrl = (email: any, size = 200) => {
    if (!email) {
        return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const events = [{ title: "Meeting", start: new Date() }];

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
                DOCTOR_ABI,
                DOCTOR_CONTRACT_ADDRESS
            );

            const details: any = await contract.methods.getDoctor(res[0]).call({
                from: res[0],
            });

            const new_data = {
                name: details.name,
                email: details.contact.emailId,
                phone: details.contact.phoneNumber,
                license: details.licenceNumber,
                education: details.education,
                specialization: details.specialization,
            };
            setData(new_data);
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
                <div className="flex flex-col items-center">
                    <UserProfile email={data.email} width={200} height={300} />
                    <div className="mt-6 text-center">
                        <h1 className="text-2xl font-semibold text-black">
                            Dr. {data.name}
                        </h1>
                        <p className="text-lg font-normal text-neutral-800">
                            License No. - {data.license}
                        </p>
                    </div>
                </div>

                {/* Qualification Section */}
                <div className="mt-6 p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold">Qualification:</h2>
                    <p className="text-sm">Education: {data.education}</p>
                    <p className="text-sm">
                        Specialization: {data.specialization}
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mt-4 p-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-lg shadow-sm">
                    <p className="text-sm font-semibold">Phone:</p>
                    <p className="text-sm">{data.phone}</p>
                </div>
                <div className="mt-2 p-4 bg-gradient-to-tr from-teal-600 to-teal-800 text-white rounded-lg shadow-sm">
                    <p className="text-sm font-semibold">Email:</p>
                    <p className="text-sm">{data.email}</p>
                </div>

                {/* Appointments Button */}
                <div
                    onClick={() => router.push("/doctor/appointments")}
                    className="mt-6 p-3 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white text-xl font-semibold text-center rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                    My Appointments
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold">Hello {data.name},</div>
                <div className="flex flex-row">
                    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
