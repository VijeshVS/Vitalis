"use client";
import Loading from "@/src/components/Loading";
import { checkToken, getDecoded } from "@/src/lib/actions/jwtLogics";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    async function checkIfLogged() {
        const verify = await checkToken(localStorage.getItem("token") || "");
        if (verify) {
            const decoded = (await getDecoded(
                localStorage.getItem("token") || ""
            )) || { type: "" };
            // @ts-ignore
            router.push(`${decoded.type}`);
            // @ts-ignore
            toast.success(`${decoded.type} already logged in`);
        }
        else {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        checkIfLogged();
    }, []);

    if (loading) <Loading />;

    return (
        <div
            style={{ backgroundImage: "url('/loginbg.png')" }}
            className="flex bg-center bg-cover flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200"
        >
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16 w-11/12 max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Choose your login type to continue
                </p>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => router.push("/login/doctor")}
                        className="transform transition-all duration-300 ease-in-out bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300"
                    >
                        Doctor Login
                    </button>
                    <button
                        onClick={() => router.push("/login/patient")}
                        className="transform transition-all duration-300 ease-in-out bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-green-300"
                    >
                        Patient Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
