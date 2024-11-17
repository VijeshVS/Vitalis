"use client";
// pages/login.js

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PatientContractABI from "@/src/../contracts/patient.abi.json";
import { PATIENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import Web3 from "web3";
import { toast } from "sonner";
import { generateToken } from "@/src/lib/actions/jwtLogics";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "@/store/store";
import { useWallet } from "@/src/hooks/useWallet";

// Placeholder Ethereum logo URL
const ethereumLogoUrl =
    "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022";

export default function Login() {
    const [enableLogin, setEnableLogin] = useState(false);
    const [log, setLog] = useState(false);
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
    const [web3, account, loading, isAvailable] = useWallet() as [Web3, string[], boolean, boolean];

    const router = useRouter();
    const connectWallet = async () => {
        
    };

    const checkUser = async () => {
        setLog(true);

        const contract = new web3.eth.Contract(
            PatientContractABI,
            PATIENT_CONTRACT_ADDRESS
        );
        const res = await contract.methods.doesPatientExist(account).call();

        if (res) {
            toast.success("Patient logged in successfully !!");

            // creating a session of 4hrs
            const address = account;
            const type = "patient";
            const payload = { address, type };
            const token = await generateToken(payload);
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            router.push("/patient");
        } else {
            toast.error("Patient not registered!!");
            router.push("/onboarding/patient");
        }
        setLog(false);
    };

    function checkUserExists() {

        if(!isAvailable) {
            toast.error("Metmask is not available");
            return;
        }

        const res = checkUser();

        toast.promise(res, {
            loading: "Logging in !!",
        });
    }

    return (
        <div
            style={{ backgroundImage: "url('/patientloginbg.png')" }}
            className="flex items-center bg-cover bg-center justify-center h-screen bg-gray-100"
        >
            <div className="w-80 p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Patient Login
                </h2>

                <button
                    className="w-full py-2 mb-4 disabled:bg-slate-400 disabled:cursor-not-allowed bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={connectWallet}
                    disabled={!loading}
                >
                    {loading ? <>Connect Wallet</> : <>Connected</>}
                </button>

                <button
                    className="w-full py-2 bg-green-600 text-white disabled:bg-slate-400 disabled:cursor-not-allowed font-medium rounded-lg hover:bg-green-700 transition-colors"
                    onClick={checkUserExists}
                    disabled={loading || log}
                >
                    {!log ? "Login" : "Logging in !!"}
                </button>
            </div>
        </div>
    );
}
