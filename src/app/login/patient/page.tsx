"use client";
// pages/login.js

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PatientContractABI from "@/../contracts/patient.abi.json";
import { PATIENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import Web3 from "web3";
import { toast } from "sonner";
import { generateToken } from "@/lib/actions/jwtLogics";

// Placeholder Ethereum logo URL
const ethereumLogoUrl =
    "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022";

export default function Login() {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [enableLogin, setEnableLogin] = useState(false);
    const [log, setLog] = useState(false);

    const router = useRouter();

    const [walletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();
            setWeb3(new_web3);
            setAccount(res[0]);
            setEnableLogin(true);
            setWalletConnected(true);
        } else {
            console.log("Wallet not connected");
        }
    };

    const checkUserExists = () => {
        setLog(true);
        // @ts-ignore
        const contract = new web3.eth.Contract(
            PatientContractABI,
            PATIENT_CONTRACT_ADDRESS
        );
        contract.methods
            .doesPatientExist(account)
            .call()
            .then(async (res) => {
                console.log(res);
                if (res) {
                    toast.success("Patient logged in successfully !!");

                    // creating a session of 4hrs
                    const address = account;
                    const type = "patient";
                    const payload = { address, type };
                    const token = await generateToken(payload);
                    localStorage.setItem("token", token);
                    router.push("/patient");
                } else {
                    toast.error("Patient not registered!!");
                    router.push("/onboarding/patient");
                }
                setLog(false);
            });
    };

    return (
        <div style={{ backgroundImage: "url('/patientloginbg.png')" }} 
         className="flex items-center bg-cover bg-center justify-center h-screen bg-gray-100">
            <div className="w-80 p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Patient Login
                </h2>

                <button
                    className="w-full py-2 mb-4 disabled:bg-slate-400 disabled:cursor-not-allowed bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={connectWallet}
                    disabled={walletConnected}
                >
                    {!walletConnected ? <>Connect Wallet</> : <>Connected</>}
                </button>

                <button
                    className="w-full py-2 bg-green-600 text-white disabled:bg-slate-400 disabled:cursor-not-allowed font-medium rounded-lg hover:bg-green-700 transition-colors"
                    onClick={checkUserExists}
                    disabled={!enableLogin || log}
                >
                    {!log ? "Login" : "Logging in !!"}
                </button>
            </div>
        </div>
    );
}
