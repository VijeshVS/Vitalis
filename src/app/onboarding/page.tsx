"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-11/12 max-w-md">
                <h1 className="text-5xl font-extrabold text-blue-700 text-center mb-8">
                    Onboarding
                </h1>
                <div className="flex justify-center space-x-6">
                    <button onClick={()=>router.push('/onboarding/doctor')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        Doctor
                    </button>
                    <button onClick={()=>router.push('/onboarding/patient')} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        Patient
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
