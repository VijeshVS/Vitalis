"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Web3 from 'web3'
import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import DOCTORABI from '@/../contracts/doctor.abi.json'
import { toast } from "sonner";
import { generateToken } from "@/lib/actions/jwtLogics";

export default function Onboarding() {
    const [reg,setReg] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        age: "",
        licensenum: "",
        education: "",
        spec: "",
    });
    const router = useRouter();

    async function registerDoctor() {
        setReg(true);
        const provider = (window as any).ethereum;
        const web3 = new Web3(provider);
        await web3.eth.requestAccounts();
        const account = (await web3.eth.getAccounts())[0];

        const contract = new web3.eth.Contract(
            DOCTORABI,
            DOCTOR_CONTRACT_ADDRESS
        );

        contract.methods
            .registerDoctor(
                formData.name,
                formData.education,
                formData.spec,
                formData.age,
                formData.licensenum,
                "Profile",
                formData.email,
                formData.phone,
                "Male"
            )
            .send({
                from: account,
            })
            .on("receipt", async function (receipt: any) {
                toast.success("Doctor registered successfully");
                setReg(false);

                const address = account;
                const type = "doctor";
                const payload = {address,type};
                const token = await generateToken(payload);
                localStorage.setItem('token',token)
                router.push("/doctor");
            })
            .on("error", function (error: any) {
                toast.error("Error registering doctor");
                setReg(false);
            });
    }

    const nextStep = () => {
        if (step < 6) {
            setStep(step + 1);
        } else {
            registerDoctor();
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div  style={{ backgroundImage: "url('/onbdoc.png')" }} 
             className="flex bg-cover bg-center items-center flex-col space-y-6 justify-center h-screen bg-neutral-800 text-white">
                
                <div className="flex flex-col items-center w-full max-w-md p-8 bg-neutral-900 rounded-lg shadow-lg transform transition-all duration-300">
                    {/* Progress Bar */}
                    <div className="flex justify-between w-full mb-10">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div
                                key={index}
                                className="h-1 w-1/6 bg-neutral-700 rounded transition-all duration-500"
                                style={{
                                    backgroundImage:
                                        step >= index
                                            ? "linear-gradient(to right, #3b82f6, #2563eb)"
                                            : "none",
                                    backgroundSize: "200% 100%",
                                    backgroundPosition:
                                        step === index ? "left" : "right",
                                }}
                            ></div>
                        ))}
                    </div>

                    <h1 className="text-3xl font-semibold mb-6">
                        Welcome Doctor ! Let's get you set up
                    </h1>

                    {/* Form Fields */}
                    <div className="w-full space-y-6">
                        {step === 1 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 2 && (
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter your age"
                                    className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">
                                    License Number
                                </label>
                                <input
                                    type="string"
                                    name="licensenum"
                                    value={formData.licensenum}
                                    onChange={handleChange}
                                    placeholder="Enter your License Number"
                                    className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Education </label>
                                <input
                                    type="number"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="Enter your College Name"
                                    className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 6 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">
                                    Specialization{" "}
                                </label>
                                <input
                                    type="number"
                                    name="spec"
                                    value={formData.spec}
                                    onChange={handleChange}
                                    placeholder="Enter your Specialization"
                                    className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between w-full mt-10 space-x-4">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`px-5 py-3 rounded-lg shadow-lg text-lg ${
                                step === 1
                                    ? "bg-neutral-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextStep}
                            className="px-5 py-3 bg-blue-600 rounded-lg shadow-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {step < 6 ? "Next" : "Finish"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
