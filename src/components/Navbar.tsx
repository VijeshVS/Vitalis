"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkToken } from "@/lib/actions/jwtLogics";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "sonner";
const Navbar = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    async function loggedCheck() {
        const verify = await checkToken(localStorage.getItem("token") || "");
        if (verify) {
            setIsLogged(true);
        }
    }

    useEffect(() => {
        loggedCheck();
    }, []);

    function logOut(){
        localStorage.setItem('token',"");
        router.push('/');
        toast.success("Logged out successfully !!")
        setIsLogged(false)
    }

    return (
        <div className="w-full flex flex-row shadow-md justify-between bg-white">
            <div
                onClick={() => router.push("/")}
                className="flex flex-row cursor-pointer justify-center items-center p-2 ml-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-600"
            >
                <Image
                    src={"/logo.png"}
                    height={50}
                    width={50}
                    alt="logo"
                ></Image>
                VITALIS
            </div>
            {isLogged ? (
                <div className="mr-6 p-2 flex flex-row justify-center items-center space-x-4 w-[180px]">
                    <button
                        onClick={logOut}
                        className="text-white w-1/2 bg-teal-700 px-2 py-1 rounded-md hover:bg-teal-800 duration-300 transition-all"
                    >
                        Log out
                    </button>
                    <div onClick={()=>router.push('/patient')} className="text-cyan-800 text-4xl cursor-pointer">
                      <FaRegCircleUser />
                    </div>
                </div>
            ) : (
                <div className="mr-6 p-2 flex flex-row justify-center items-center space-x-2 w-[180px]">
                    <button
                        onClick={() => router.push("/onboarding")}
                        className="text-black w-1/2  px-2 py-1 rounded-md hover:bg-gray-200 border-[1px] border-teal-800 duration-300 transition-all"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => router.push("/login")}
                        className="text-white w-1/2 bg-teal-700 px-2 py-1 rounded-md hover:bg-teal-800 duration-300 transition-all"
                    >
                        Log In
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
