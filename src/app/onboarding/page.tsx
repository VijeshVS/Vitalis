"use client"
import { checkToken, getDecoded } from '@/lib/actions/jwtLogics';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const OnboardingPage = () => {
    const router = useRouter();

    async function checkIfLogged() {
        const verify = await checkToken(localStorage.getItem('token') || "");
        if(verify){
            const decoded = (await getDecoded(localStorage.getItem('token') || "")) || {type: ""};
            // @ts-ignore
            router.push(`${decoded.type}`)
            // @ts-ignore
            toast.success(`${decoded.type} already logged in`);
        }
    }

    useEffect(()=>{
        checkIfLogged();
    },[])

    return (
        <div style={{ backgroundImage: "url('/onboardgen.png')" }} 
         className="flex flex-col bg-cover bg-center items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16 w-11/12 max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome to Onboarding</h1>
                <p className="text-center text-gray-600 mb-8">Select your profile to get started</p>
                <div className="flex flex-col gap-4">
                    <button onClick={() => router.push('/onboarding/doctor')} className="transform transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300">
                        Doctor Onboarding
                    </button>
                    <button onClick={() => router.push('/onboarding/patient')} className="transform transition-all duration-300 ease-in-out bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-green-300">
                        Patient Onboarding
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OnboardingPage;
