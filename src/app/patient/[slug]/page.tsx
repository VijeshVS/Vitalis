"use client"

import React from "react";
import Image from "next/image";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


const data = {
	name: "Samkit Samsukha",
	gender: "Male",
	dob: "14/10/2005",
	phone: "9239089089",
	email: "samkit@gmail.com",
	age: "19",
	bloodGroup: "A+",
	weight: "77",
	height: "181",
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
		<div className="bg-neutral-800 flex flex-row text-white h-screen">
			<div className="w-1/4 bg-gradient-to-br from-blue-200 to-blue-300 ">
				<div className="ml-4 mt-4 ">
					<Image
						src="/samplehero.png"
						height={200}
						width={200}
						alt="User  Profile Picture"
						className="rounded-full border-[1px] border-blue-900"
					></Image>
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
				<div className="ml-6 mt-4 bg-green-100 w-3/4 p-1 rounded-md text-black font-semibold">
					Phone No. - {data.phone}
				</div>
				<div className="ml-6 mt-2 text-black bg-green-100 p-1 w-3/4 rounded-md font-semibold">
					Email - {data.email}
				</div>
				<div className="ml-6 mt-4 grid grid-cols-2 gap-1 w-3/4 text-black text-center">
					<div className="p-4 bg-blue-100">
						<span className="font-semibold text-xl">{data.age} years</span> <br />
						<span className="text-neutral-800">Age</span>
					</div>
					<div className="p-4 bg-green-100">
						<span className="font-semibold text-xl">{data.bloodGroup}</span> <br />
						<span className="text-neutral-800">Blood Group</span>
					</div>
					<div className="p-4 bg-green-100">
						<span className="font-semibold text-xl">{data.weight} kg</span> <br />
						<span className="text-neutral-800">Weight</span>
					</div>
					<div className="p-4 bg-blue-100">
						<span className="font-semibold text-xl">{data.height} cm</span> <br />
						<span className="text-neutral-800">Height</span>
					</div>
				</div>
			</div>
			<div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
				<div className="text-3xl font-semibold">Hello {data.name},</div>
				<div>
					At Vitalis, we prioritize providing top-notch facilities for our
					patients. We are committed to ensuring their comfort and well-being.
					Additionally, we implement robust measures to safeguard patient data,
					maintaining confidentiality and security at all times. Your trust is
					our utmost priority.
				</div>
				<div className="flex md:flex-row flex-col md:space-x-4 justify-center">
					<button className="text-black p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:from-blue-300 hover:to-blue-400 duration-300 transition-all border-blue-900 border-[1px] rounded-md bg-gradient-to-br from-blue-200 to bg-blue-300">
						<FaSuitcaseMedical />
						<div className="pt-3">Access Medical Records</div>
					</button>
					<button className="text-black p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:from-green-300 hover:to-green-400 duration-300 transition-all border-green-900 border-[1px] rounded-md bg-gradient-to-br from-green-200 to bg-green-300">
						<MdOutlineSecurity />
						<div className="pt-3">Get insurance</div>
					</button>
					<button className="text-black p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:from-blue-300 hover:to-blue-400 duration-300 transition-all border-blue-900 border-[1px] rounded-md bg-gradient-to-br from-blue-200 to bg-blue-300">
						<FaStethoscope />
						<div className="pt-3">Consult a doctor</div>
					</button>
					<button className="text-black p-4 w-1/3 text-xl flex flex-col items-center justify-center hover:from-green-300 hover:to-green-400 duration-300 transition-all border-green-900 border-[1px] rounded-md bg-gradient-to-br from-green-200 to bg-green-300">
						<RiMoneyRupeeCircleFill />
						<div className="pt-3">Sell your data</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default page;