"use client";
import React, { useState } from "react";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import doctorABI from "@/src/../contracts/doctor.abi.json";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateToken } from "@/src/lib/actions/jwtLogics";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "@/store/store";
import { useWallet } from "@/src/hooks/useWallet";

const DoctorLogin = () => {
    const router = useRouter();
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
    const [log, setLog] = useState(false);
    const [web3, account, loading, isAvailable] = useWallet() as [Web3, string[], boolean, boolean];

    const checkIfDoctorExists = async () => {
        setLog(true);

        const contract = new web3.eth.Contract(
            doctorABI,
            DOCTOR_CONTRACT_ADDRESS
        );
        
        const res = await contract.methods.doesDoctorExist(account).call();
        if (res) {
            toast.success("Doctor logged in successfully !!");

            // creating a session of 4hrs
            const address = account;
            const type = "doctor";
            const payload = { address, type };
            const token = await generateToken(payload);
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            router.push("/doctor");
        } else {
            toast.error("Doctor not registered!!");
            router.push("/onboarding/doctor");
        }
        setLog(false);
    };

    function checkDoctor() {
        if(!isAvailable){
            toast.error("Metamask extension not available");
            return;
        }

        const res = checkIfDoctorExists();

        toast.promise(res, {
            loading: "Logging in !!",
        });
    }

    return (
        <div
            style={{ backgroundImage: "url('/doctorLoginbg.png')" }}
            className="flex bg-cover bg-center justify-center items-center min-h-screen bg-gray-50"
        >
            <div className="text-center p-6 rounded-lg shadow-lg bg-white w-80">
                <h3 className="text-xl font-semibold mb-6">Doctor Login</h3>
                <div className="space-y-4">
                    <button
                        className="w-full py-3 bg-cyan-600 disabled:bg-black disabled:cursor-not-allowed text-white rounded-md hover:bg-cyan-700 transition duration-200"

                        disabled={!loading}
                    >
                        {!loading ? <>Connected</> : <>Connect Wallet</>}
                    </button>
                    <button
                        className="w-full py-3 bg-teal-600 text-white disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md hover:bg-teal-700 transition duration-200"
                        onClick={checkDoctor}
                        disabled={loading || log}
                    >
                        {log ? "Logging in" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;
