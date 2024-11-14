"use client";
// pages/login.js
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PatientContractABI from "@/../contracts/patient.abi.json";
import { PATIENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import Web3 from "web3";
// Placeholder Ethereum logo URL
const ethereumLogoUrl =
    "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022";

export default function Login() {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [enableLogin,setEnableLogin] = useState(false);
    const router = useRouter();

    const connectWallet = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();
            setWeb3(new_web3);
            setAccount(res[0]);
            setEnableLogin(true);
        } else {
            console.log("Wallet not connected");
        }
    };

    // useEffect(()=>{
    //     if(loading == false){
    //         console.log("bruh")
    //         setCheckUserLoading(true);
    //         if(web3){
    //             // @ts-ignore
    //             const contract = new web3.eth.Contract(PatientContractABI, PATIENT_CONTRACT_ADDRESS);
    //             contract.methods.doesPatientExist(account).call({ from: account }).then((res:any)=>{
    //                 setCheckUserLoading(false);
    //                 console.log(res);
    //             })
    //         }
    //     }
    // },[loading])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-80 p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Patient Login
                </h2>

                
                <button
                    className="w-full py-2 mb-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => alert("Connecting wallet...")}
                >
                    Connect Wallet
                </button> 

                <button
                    className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => alert("Logging in...")}
                    // disabled={true}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
