"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
    const router = useRouter();

    return (
        <div className="w-full flex flex-row shadow-md justify-between bg-white">
            <div onClick={()=>router.push('/')} className="flex flex-row cursor-pointer justify-center items-center p-2 ml-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-600">
                <Image
                    src={"/logo.png"}
                    height={50}
                    width={50}
                    alt="logo"
                ></Image>
                VITALIS
            </div>
            <div className="mr-6 p-2 flex flex-row justify-center items-center space-x-2 w-[180px]">
              <button onClick={()=>router.push('/onboarding')} className="text-black w-1/2  px-2 py-1 rounded-md hover:bg-gray-200 border-[1px] border-teal-800 duration-300 transition-all">Sign Up</button>
              <button onClick={()=>router.push('/login')} className="text-white w-1/2 bg-teal-700 px-2 py-1 rounded-md hover:bg-teal-800 duration-300 transition-all">Log In</button>
            </div>
        </div>
    );
};

export default Navbar;
