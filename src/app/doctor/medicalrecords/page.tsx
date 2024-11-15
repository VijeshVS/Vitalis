"use client";

import React, { useEffect, useState } from "react";
import md5 from "md5";
import Image from "next/image";
import { checkToken, getDecoded } from "@/lib/actions/jwtLogics";
import { FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosMail } from "react-icons/io";
import { toast } from "sonner";
import { IoMdSchool } from "react-icons/io";
import Loading from "@/components/Loading";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import DOCTOR_ABI from "@/../contracts/doctor.abi.json";
import Calendar from "@/components/ui/calender";
import { FaFilePdf } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { DIAGNOSIS_CONTACT_ADDRESS } from "../../../../contracts/contactAddress";
import DIA_ABI from '@/../contracts/diagnosis.abi.json'

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

            const diaContract = new new_web3.eth.Contract(
                DIA_ABI,
                DIAGNOSIS_CONTACT_ADDRESS
            );

            const reps:any = await diaContract.methods.getDoctorDiagnosis(res[0]).call({
                from: res[0]
            })

            setReports(reps)

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

        connectAndGetDetails();
    };

    useEffect(() => {
        verifyDoctor();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="bg-neutral-200 min-h-screen flex flex-row text-black flex-1">
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
                <div className="flex flex-row space-x-4  items-center mt-6 p-4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white rounded-lg shadow-sm">
                    <div className="text-3xl font-semibold">
                        <IoMdSchool />
                    </div>
                    <div>
                        <p className="text-sm">{data.education}</p>
                        <p className="text-sm">{data.specialization}</p>
                    </div>
                </div>
                <div className="flex flex-row space-x-4 items-center mt-4 p-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-lg shadow-sm">
                    <span className="text-white "><FaPhone /></span>
                    <p className="text-sm">{data.phone}</p>
                </div>
                <div className="flex flex-row space-x-4 items-center mt-2 p-4 bg-gradient-to-tr from-teal-600 to-teal-800 text-white rounded-lg shadow-sm">
                    <span className="text-white text-xl"><IoIosMail /></span>
                    <p className="text-sm">{data.email}</p>
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold">Issued medical records</div>
                <div className="flex flex-row">
                <div className="grid grid-cols-2 gap-4">
                    {reports.map((report, index) => (
                        <div
                            key={index}
                            className="flex flex-row p-4 space-x-2 items-center bg-white rounded-md"
                        >
                            <FaFilePdf />
                            <p>Issued to {report.patient}</p>
                            <a
                                href={`https://65hqhf12-7000.inc1.devtunnels.ms/get/${report.content}`}
                                target="_blank"
                            >
                                <MdFileDownload />
                            </a>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
