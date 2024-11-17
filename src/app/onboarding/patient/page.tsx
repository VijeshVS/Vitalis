"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { PATIENT_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import PATIENT_ABI from "@/src/../contracts/patient.abi.json";
import Web3 from "web3";
import { toast } from "sonner";
import { generateToken } from "@/src/lib/actions/jwtLogics";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "@/store/store";

export default function Onboarding() {
    const [reg, setReg] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        dob: "",
        email: "",
        weight: "",
        height: "",
        bloodGroup: "",
        gender: "Male", // Default to "Male" or set as needed
    });
    const router = useRouter();
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

    useEffect(() => {
        let toastId: any;

        if (reg) {
            toastId = toast("Loading...", {
                icon: "⏳",
                duration: Infinity,
            });
        } else {
            toast.dismiss(toastId);
        }

        return () => {
            if (toastId) toast.dismiss(toastId);
        };
    }, [reg]);

    const nextStep = () => {
        if (step < 6) {
            setStep(step + 1);
        } else {
            registerPatient();
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

    // Calculate age from dob
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    async function registerPatient() {
        setReg(true);
        const provider = (window as any).ethereum;
        const web3 = new Web3(provider);
        await web3.eth.requestAccounts();
        const account = (await web3.eth.getAccounts())[0];

        const contract = new web3.eth.Contract(
            PATIENT_ABI,
            PATIENT_CONTRACT_ADDRESS
        );

        const age = calculateAge(formData.dob);

        contract.methods
            .addPatient(
                formData.name,
                age,
                formData.dob,
                formData.phone,
                formData.email,
                formData.weight,
                formData.height,
                formData.bloodGroup,
                formData.gender
            )
            .send({
                from: account,
            })
            .on("receipt", async function (receipt: any) {
                setReg(false);
                const address = account;
                const type = "patient";
                const payload = { address, type };
                const token = await generateToken(payload);

                localStorage.setItem("token", JSON.stringify(token));
                toast.success("Patient registered successfully");
                setIsLoggedIn(true);
                router.push("/patient");
            })
            .on("error", function (error: any) {
                toast.error("Error registering patient");
                setReg(false);
            });
    }

    return (
        <>
            <Head>
                <title>Onboarding</title>
            </Head>

            <div
                style={{ backgroundImage: "url('/onbpat.png')" }}
                className="flex items-center bg-center bg-cover flex-col space-y-6 justify-center h-screen bg-neutral-800 text-black"
            >
                <div className="flex flex-col items-center w-full max-w-md p-8 bg-neutral-100 rounded-lg shadow-lg transform transition-all duration-300">
                    {/* Progress Bar */}
                    <div className="flex justify-between w-full mb-10">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div
                                key={index}
                                className="h-1 w-1/6 bg-neutral-300 rounded transition-all duration-500"
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
                        Welcome! Let's get you set up
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
                                    className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 4 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-neutral-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="Enter your weight in kg"
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="Enter your height in cm"
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                        {step === 6 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-neutral-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                >
                                    <option value="" disabled>
                                        Select your blood group
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between w-full mt-8">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-teal-400 hover:bg-teal-500 rounded transition-all duration-300 text-black"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={nextStep}
                            className="px-4 py-2 bg-cyan-400 hover:bg-cyan-500 transition-all duration-300 text-black rounded"
                        >
                            {step === 6 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
