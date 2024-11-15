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

    const checkIfDoctorExists = async () => {
        setLog(true);
        // @ts-ignore
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

            router.push("/doctor");
        } else {
            toast.error("Doctor not registered!!");
            router.push("/onboarding/doctor");
        }
        setLog(false);
    };

    function checkDoctor() {
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
                        // onClick={() => alert('Connect Wallet')}
                        onClick={connectWallet}
                        disabled={walletConnect}
                    >
                        {walletConnect ? <>Connected</> : <>Connect Wallet</>}
                    </button>
                    <button
                        className="w-full py-3 bg-teal-600 text-white disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md hover:bg-teal-700 transition duration-200"
                        onClick={checkDoctor}
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
