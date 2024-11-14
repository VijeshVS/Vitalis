"use client";

import React from "react";
import md5 from "md5"; // Install using npm install md5
import Image from "next/image";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useState } from "react";

const getGravatarUrl = (email, size = 200) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const UserProfile = ({ email, width, height }) => {
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

const users = {
    user1: {
        email: "samkit@gmail.com",
        name: "Samkit Samsukha",
        age: 19,
    },
    user2: {
        email: "john.doe@example.com",
        name: "John Doe",
        age: 25,
    },
    user3: {
        email: "jane.smith@example.com",
        name: "Jane Smith",
        age: 30,
    },
    user4: {
        email: "emily.jones@example.com",
        name: "Emily Jones",
        age: 22,
    },
    user5: {
        email: "michael.brown@example.com",
        name: "Michael Brown",
        age: 28,
    },
    user6: {
        email: "sophia.wilson@example.com",
        name: "Sophia Wilson",
        age: 35,
    },
};

const data = {
    name: "Samkit Samsukha",
    email: "samkitsamsukha.is23@rvce.edu.in",
    phone: "9239089089",
    license: "xxxxxxxxxxx",
    education: "idk",
    specialization: "idk",
};
const page = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    console.log(params);

    return (
        <div className="bg-neutral-200 flex flex-row text-black flex-1">
            <div className="w-1/4 bg-neutral-100 p-5">
                <div className="ml-4 mt-4 ">
                    <UserProfile email={data.email} width={200} height={300} />
                </div>
                <div className="ml-6 mt-4 text-2xl text-black font-semibold ">
                    Dr. {data.name}
                    <br />
                    <span className="text-xl font-normal text-neutral-800">
                        {data.license}
                    </span>
                </div>
                <div className="ml-6 pl-3 p-1 mt-4 w-3/4 bg-gradient-to-br from-cyan-600 to-cyan-600 text-white">
                    <span className="font-semibold">
                        Educational Qualification:
                    </span>
                    <br />
                    {data.education}
                    <br />
                    {data.specialization}
                </div>
                <div className="ml-6 pl-3 mt-4 bg-gradient-to-br from-green-200 to bg-green-300 w-3/4 p-1 rounded-md text-black font-semibold">
                    {data.phone}
                </div>
                <div className="ml-6 pl-3 mt-2 text-black bg-gradient-to-tr from-teal-500 w-3/4 overflow-hidden to-teal-500 p-1 rounded-md font-semibold">
                    {data.email}
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold">Hello {data.name},</div>
                <div className="flex flex-row">
                    <div className="w-2/3">
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-2xl font-semibold mb-2 text-center">
                            My Patients
                        </h2>
                        <div className="flex flex-col space-y-2">
                            {Object.values(users).map((user, index) => (
                                <div
                                    key={index}
                                    className="p-2 bg-neutral-100 rounded-md flex flex-row items-center space-x-4"
                                >
                                    <div>
                                        <UserProfile
                                            email={user.email}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="font-bold">
                                            {user.name}
                                        </h2>
                                        <p>Email: {user.email}</p>
                                        <p>Age: {user.age}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
