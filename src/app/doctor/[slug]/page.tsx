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

const data = {
	name: "Samkit Samsukha",
	email: "samkitsamsukha.is23@rvce.edu.in",
}
const page = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    console.log(params);




    return (
        <div className="bg-neutral-200 flex flex-row text-black">
            <div className="w-1/4 bg-neutral-100 p-5">
                <div className="ml-4 mt-4 ">
				<UserProfile email={data.email} />
                </div>
                <div className="ml-6 mt-4 text-2xl text-blue-950 font-semibold ">
                    Dr. {data.name}
                </div>
            </div>
            <div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
                <div className="text-3xl font-semibold">Hello {data.name},</div>
            </div>
        </div>
    );
};

export default page;
