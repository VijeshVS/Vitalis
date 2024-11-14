"use client";
import React, { useState } from "react";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import doctorABI from "@/../contracts/doctor.abi.json";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateToken } from "@/lib/actions/jwtLogics";

const DoctorLogin = () => {
    const router = useRouter();
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const [walletConnect, setWalletConnect] = useState(false);
    const [log, setLog] = useState(false);

    const connectWallet = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
            const new_web3 = new Web3(provider);
            await new_web3.eth.requestAccounts();
            const res = await new_web3.eth.getAccounts();
            setWeb3(new_web3);
            setAccount(res[0]);
            setWalletConnect(true);
        } else {
            console.log("Wallet not connected");
        }
    };

    const checkIfDoctorExists = () => {
        setLog(true);
        // @ts-ignore
        const contract = new web3.eth.Contract(
            doctorABI,
            DOCTOR_CONTRACT_ADDRESS
        );
        contract.methods
            .doesDoctorExist(account)
            .call()
            .then(async (res) => {
                console.log(res);
                if (res) {
                    toast.success("Doctor logged in successfully !!");

                    // creating a session of 4hrs
                    const address = account;
                    const type = "doctor";
                    const payload = { address, type };
                    const token = await generateToken(payload);
                    localStorage.setItem("token", token);

                    router.push("/doctor");
                } else {
                    toast.error("Doctor not registered!!");
                    router.push("/onboarding/doctor");
                }
                setLog(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white w-80">
                <h3 className="text-xl font-semibold mb-6">Doctor Login</h3>
                <div className="space-y-4">
                    <button
                        className="w-full py-3 bg-blue-500 disabled:bg-black disabled:cursor-not-allowed text-white rounded-md hover:bg-blue-600 transition duration-200"
                        // onClick={() => alert('Connect Wallet')}
                        onClick={connectWallet}
                        disabled={walletConnect}
                    >
                        {walletConnect ? <>Connected</> : <>Connect Wallet</>}
                    </button>
                    <button
                        className="w-full py-3 bg-slate-500 text-white disabled:bg-black disabled:cursor-not-allowed rounded-md hover:bg-gray-300 transition duration-200"
                        onClick={checkIfDoctorExists}
                        disabled={!walletConnect || log}
                    >
                        {log ? "Logging in" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;
