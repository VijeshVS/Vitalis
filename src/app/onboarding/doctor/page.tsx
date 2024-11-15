"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Web3 from "web3";
import { DOCTOR_CONTRACT_ADDRESS } from "../../../../contracts/contactAddress";
import DOCTORABI from "@/../contracts/doctor.abi.json";
import { toast } from "sonner";
import { generateToken } from "@/lib/actions/jwtLogics";

export default function Onboarding() {
    const [reg, setReg] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        age: "",
        experience: "",
        licensenum: "",
        education: "",
        spec: "",
        gender: "Male", // Default to "Male" or set as empty for no default
    });
    const router = useRouter();

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
                formData.gender,
                Number(formData.experience)
                // Pass the selected gender
            )
            .send({
                from: account,
            })
            .on("receipt", async function (receipt) {
                setReg(false);
                const address = account;
                const type = "doctor";
                const payload = { address, type };
                const token = await generateToken(payload);
                localStorage.setItem("token", token);
                toast.success("Doctor registered successfully");
                router.push("/doctor");
            })
            .on("error", function (error) {
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
            <div
                style={{ backgroundImage: "url('/onbdoc.png')" }}
                className="flex bg-cover bg-center items-center flex-col space-y-6 justify-center h-screen"
            >
                <div className="flex flex-col items-center w-full max-w-md p-8 bg-white z-50 rounded-lg shadow-lg transform transition-all duration-300">
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
                        Welcome Doctor! Let's get you set up
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
                                    className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Enter your age"
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Prefer not to say">
                                            Prefer not to say
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg">
                                        Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="Enter your years of experience"
                                        className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    />
                                </div>
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
                                    className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">Education </label>
                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="Enter your College Name"
                                    className="p-3 rounded bg-neutral-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                />
                            </div>
                        )}
                        {step === 6 && (
                            <div className="flex flex-col space-y-2">
                                <label className="text-lg">
                                    Specialization{" "}
                                </label>
                                <select
                                    name="spec"
                                    value={formData.spec}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-neutral-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                >
                                    <option value="" disabled>
                                        Select your Specialization
                                    </option>
                                    <option value="General Physician">
                                        General Physician
                                    </option>
                                    <option value="Geriatrics">
                                        Geriatrics
                                    </option>
                                    <option value="Cardiology">
                                        Cardiology
                                    </option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Orthopedics">
                                        Orthopedics
                                    </option>
                                    <option value="Dermatology">
                                        Dermatology
                                    </option>
                                    <option value="Pediatrics">
                                        Pediatrics
                                    </option>
                                    <option value="Psychiatry">
                                        Psychiatry
                                    </option>
                                    <option value="Oncology">Oncology</option>
                                    <option value="Gastroenterology">
                                        Gastroenterology
                                    </option>
                                    <option value="Endocrinology">
                                        Endocrinology
                                    </option>
                                    <option value="Ophthalmology">
                                        Ophthalmology
                                    </option>
                                    <option value="Urology">Urology</option>
                                    <option value="Gynecology">
                                        Gynecology
                                    </option>
                                    <option value="Pulmonology">
                                        Pulmonology
                                    </option>
                                    <option value="Rheumatology">
                                        Rheumatology
                                    </option>
                                    <option value="Anesthesiology">
                                        Anesthesiology
                                    </option>
                                </select>
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
                                    ? "bg-neutral-400 cursor-not-allowed"
                                    : "bg-teal-400 hover:bg-teal-500 transition-all duration-300 transform hover:-translate-y-1"
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextStep}
                            className="px-5 py-3 bg-cyan-400 rounded-lg shadow-lg text-lg hover:bg-cyan-500 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {step < 6 ? "Next" : "Finish"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
