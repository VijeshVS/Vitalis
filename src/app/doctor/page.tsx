import React from "react";
import Image from "next/image";

const page = () => {
	return (
		<div className="bg-white-800 flex flex-row text-white h-screen">
			<div className="w-1/4 bg-gradient-to-br from-green-200 to-green-300 ">
				<div className="ml-4 mt-4 ">
					<Image
						src="/samplehero.png"
						height={200}
						width={200}
						alt="User Profile Picture"
						className="rounded-full border-[1px] border-green-900"
					></Image>
				</div>
				<div className="ml-6 mt-4 text-2xl text-green-950 font-semibold ">
					Dr. Samkit Samsukha
				</div>
				<div className="rounded-full p-2 bg-gradient-to-br from-blue-200 to-blue-300 w-fit ml-6 mt-2 px-6 border-[1px] border-green-950 text-black font-semibold">Endicronologist</div>
			</div>
			<div className="px-16 py-8 w-3/4 flex flex-col space-y-4">
				<div className="text-3xl font-semibold">Hello Doctor Name,</div>
				
			</div>
		</div>
	);
};

export default page;
