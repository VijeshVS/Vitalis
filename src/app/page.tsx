"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import generalphysician from "../../public/specializations/generalphysician.png";
import geriatrics from "../../public/specializations/geriatrics.png";
import cardiology from "../../public/specializations/cardiology.png";
import neurology from "../../public/specializations/neurology.png";
import orthopedics from "../../public/specializations/orthopedics.png";
import dermatology from "../../public/specializations/dermatology.png";
import pediatrics from "../../public/specializations/pediatrics.png";
import psychiatry from "../../public/specializations/psychiatry.png";
import oncology from "../../public/specializations/oncology.png";
import gastroenterology from "../../public/specializations/gastroenterology.png";
import endocrinology from "../../public/specializations/endocrinology.png";
import ophthalmology from "../../public/specializations/ophthalmology.png";
import urology from "../../public/specializations/urology.png";
import gynecology from "../../public/specializations/gynecology.png";
import pulmonology from "../../public/specializations/pulmonology.png";
import rheumatology from "../../public/specializations/rheumatology.png";
import { HiSparkles } from "react-icons/hi";

const docs = [
    {
        id: 1,
        specialization: "Physician",
        data: [
            "Primary care and internal medicine",
            "Chronic disease management and prevention",
            "Immunizations and wellness checks",
            "Holistic and integrative medicine",
            "Geriatric and pediatric medicine",
            "Health education and lifestyle coaching",
            "Individualized medical treatment plans",
        ],
        img: generalphysician,
    },
    {
        id: 2,
        specialization: "Geriatrics",
        data: [
            "Comprehensive care for older adults",
            "Management of age-related conditions",
            "Geriatric assessment and care planning",
            "Preventive care and health optimization",
            "Support for cognitive decline and dementia",
            "Palliative care for end-of-life needs",
        ],
        img: geriatrics,
    },
    {
        id: 3,
        specialization: "Cardiology",
        data: [
            "Diagnosis and treatment of heart conditions",
            "Management of hypertension and cholesterol",
            "Heart disease prevention and education",
            "Cardiac rehabilitation programs",
            "Electrophysiology and arrhythmia management",
        ],
        img: cardiology,
    },
    {
        id: 4,
        specialization: "Neurology",
        data: [
            "Diagnosis and treatment of neurological disorders",
            "Management of headaches and migraines",
            "Epilepsy and seizure management",
            "Stroke prevention and rehabilitation",
            "Support for neurodegenerative diseases",
        ],
        img: neurology,
    },
    {
        id: 5,
        specialization: "Orthopedics",
        data: [
            "Diagnosis and treatment of musculoskeletal issues",
            "Joint replacement and repair surgeries",
            "Sports medicine and injury prevention",
            "Rehabilitation and physical therapy",
            "Management of arthritis and osteoporosis",
        ],
        img: orthopedics,
    },
    {
        id: 6,
        specialization: "Dermatology",
        data: [
            "Diagnosis and treatment of skin conditions",
            "Skin cancer screenings and treatments",
            "Management of acne and eczema",
            "Cosmetic dermatology procedures",
            "Education on skin health and protection",
        ],
        img: dermatology,
    },
    {
        id: 7,
        specialization: "Pediatrics",
        data: [
            "Comprehensive care for infants, children, and adolescents",
            "Vaccination and preventive care",
            "Management of childhood illnesses",
            "Developmental assessments and guidance",
            "Support for mental health in children",
        ],
        img: pediatrics,
    },
    {
        id: 8,
        specialization: "Psychiatry",
        data: [
            "Diagnosis and treatment of mental health disorders",
            "Psychotherapy and counseling services",
            "Medication management and support",
            "Crisis intervention and stabilization",
            "Support for substance use disorders",
        ],
        img: psychiatry,
    },
    {
        id: 9,
        specialization: "Oncology",
        data: [
            "Diagnosis and treatment of cancer",
            "Chemotherapy and radiation therapy",
            "Supportive care and symptom management",
            "Palliative care for advanced cancer",
            "Education on cancer prevention and screening",
        ],
        img: oncology,
    },
    {
        id: 10,
        specialization: "Gastroenterology",
        data: [
            "Diagnosis and treatment of digestive disorders",
            "Management of liver diseases",
            "Endoscopic procedures and screenings",
            "Nutritional counseling and support",
            "Education on gastrointestinal health",
        ],
        img: gastroenterology,
    },
    {
        id: 11,
        specialization: "Endocrinology",
        data: [
            "Diagnosis and treatment of hormonal disorders",
            "Management of diabetes and thyroid issues",
            "Bone health and osteoporosis management",
            "Reproductive health and menopause support",
            "Education on lifestyle and nutrition",
        ],
        img: endocrinology,
    },
    {
        id: 12,
        specialization: "Ophthalmology",
        data: [
            "Diagnosis and treatment of eye conditions",
            "Vision correction and eye surgery",
            "Management of glaucoma and cataracts",
            "Pediatric eye care and vision screenings",
            "Education on eye health and protection",
        ],
        img: ophthalmology,
    },
    {
        id: 13,
        specialization: "Urology",
        data: [
            "Diagnosis and treatment of urinary tract issues",
            "Management of prostate health",
            "Urological surgeries and procedures",
            "Support for male reproductive health",
            "Education on urological health",
        ],
        img: urology,
    },
    {
        id: 14,
        specialization: "Gynecology",
        data: [
            "Comprehensive women's health care",
            "Management of reproductive health issues",
            "Prenatal and postnatal care",
            "Screenings for cervical and breast cancer",
            "Education on family planning and contraception",
        ],
        img: gynecology,
    },
    {
        id: 15,
        specialization: "Pulmonology",
        data: [
            "Diagnosis and treatment of lung conditions",
            "Management of asthma and COPD",
            "Sleep studies and respiratory therapy",
            "Education on smoking cessation",
            "Support for pulmonary rehabilitation",
        ],
        img: pulmonology,
    },
    {
        id: 16,
        specialization: "Rheumatology",
        data: [
            "Diagnosis and treatment of autoimmune diseases",
            "Management of arthritis and joint pain",
            "Education on lifestyle and exercise",
            "Support for chronic pain management",
            "Collaboration with other specialists for comprehensive care",
        ],
        img: rheumatology,
    },
];

export default function Home() {
    const [selectedDoc, setSelectedDoc] = useState(docs[0]); // Set default to the first doctor

    const handleDocSelect = (doc) => {
        setSelectedDoc(doc);
    };

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col items-center justify-center w-3/4">
                <div className="herosection py-20 flex flex-row justify-center items-center">
                    <div className="flex flex-col w-3/5 p-4">
                        <div className="text-6xl font-semibold text-cyan-900 p-2">
                            Your Health is <br /> Our Top Priority
                        </div>
                        <div className="text-2xl p-2 ">
                            Securely share your comprehensive medical history
                            with doctors and loved ones, for better
                            communication and care
                        </div>
                        <div className="p-2">
                            <Link
                                href={"/book"}
                                className="w-fit px-4 py-2 hover:from-teal-700 hover:to-teal-900 bg-gradient-to-br from-teal-600 to-teal-800 rounded-md text-white"
                            >
                                Get Appointment
                            </Link>
                        </div>
                    </div>
                    <div className="w-2/5">
                        <Image
                            src={"/hero1.png"}
                            width={600}
                            height={300}
                            alt="hero image"
                        />
                    </div>
                </div>
                <div className="badges py-20 flex flex-row justify-evenly w-3/4 space-x-5 text-center">
                    <div className="w-1/5 rounded-md bg-neutral-100 shadow-md p-2 flex flex-col justify-center items-center">
                        <h2 className="text-4xl p-2">500+</h2>
                        <p>Doctors</p>
                    </div>

                    <div className="w-1/5 rounded-md bg-neutral-100 shadow-md p-2 flex flex-col justify-center items-center">
                        <h2 className="text-4xl p-2">20k+</h2>
                        <p>Happy Patients</p>
                    </div>

                    <div className="w-1/5 rounded-md bg-neutral-100 shadow-md p-2 flex flex-col justify-center items-center">
                        <h2 className="text-4xl p-2">24/7</h2>
                        <p>Emergency Services</p>
                    </div>

                    <div className="w-1/5 rounded-md bg-neutral-100 shadow-md p-2 flex flex-col justify-center items-center">
                        <h2 className="text-4xl p-2">100+</h2>
                        <p>Operation Theatres</p>
                    </div>

                    <div className="w-1/5 rounded-md bg-neutral-100 shadow-md p-2 flex flex-col justify-center items-center">
                        <h2 className="text-4xl p-2">850+</h2>
                        <p>Hospital Rooms</p>
                    </div>
                </div>
                <div className="services py-20 w-full">
                    <h2 className="text-cyan-800 text-center text-3xl font-semibold">
                        Services
                    </h2>

                    <div className="py-8 flex flex-row justify-center items-center">
                        <div className="grid grid-cols-4 gap-2 w-3/5">
                            {docs.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => handleDocSelect(doc)}
                                >
                                    <label
                                        className={`p-2 bg-white shadow-md flex flex-col justify-center items-center space-y-2 cursor-pointer rounded-md ${
                                            selectedDoc?.id === doc.id
                                                ? "bg-gradient-to-br from-teal-100 to-teal-400"
                                                : ""
                                        }`}
                                    >
                                        <Image
                                            src={doc.img}
                                            width={40}
                                            height={40}
                                            alt="specialization logo"
                                        />

                                        <h2 className="text-xl text-black">
                                            {doc.specialization}
                                        </h2>
                                    </label>

                                    <input
                                        type="radio"
                                        hidden={true}
                                        className="cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 w-2/5">
                            {selectedDoc && (
                                <div className="flex flex-col justify-start h-full items-center space-y-4">
                                    <h3 className="text-2xl font-semibold text-cyan-900">
                                        {selectedDoc.specialization}
                                    </h3>

                                    <ul className="p-2">
                                        {selectedDoc.data.map((item, index) => (
                                            <li
                                                className="flex flex-row items-center p-2"
                                                key={index}
                                            >
                                                <HiSparkles />

                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={"/book"}
                                        className="w-fit px-4 py-2 hover:from-teal-700 hover:to-teal-900 bg-gradient-to-br from-teal-600 to-teal-800 rounded-md text-white"
                                    >
                                        Get Appointment
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-3/4 py-20">
                    <div className="w-1/2">
                        <h2 className="text-3xl text-cyan-900 font-medium">
                            We Are Always Here To Ensure Best Medical Treatment
                        </h2>
                        <ul className="text-xl p-2">
                            <li className="p-2">Easy make appointment</li>
                            <li className="p-2">Top specialist doctors</li>
                            <li className="p-2">24/7 service</li>
                            <li className="p-2">Enrolment is quick and easy</li>
                            <li className="p-2">
                                Discount for all medical treatments
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <Image
                            src={"/hero2.png"}
                            width={400}
                            height={500}
                            alt="hero img"
                        ></Image>
                    </div>
                </div>
                <div className="specialists py-20 w-full">
                    <h2 className="text-cyan-800 text-center text-3xl font-semibold py-8">
                        Meet Our Specialists
                    </h2>
                    <div className="flex flex-row justify-center items-center space-x-10">
                        <div>
                            <div className="rounded-tl-[120px] rounded-br-[120px] bg-gradient-to-tr from-cyan-600 to-cyan-800 flex justify-center">
                                <Image
                                    src={"/doctor1.png"}
                                    height={300}
                                    width={200}
                                    alt="doctor image"
                                ></Image>
                            </div>
                            <p className="font-semibold">Dr. John Smith</p>
                            <p>Cardiologist</p>
                        </div>
                        <div>
                            <div className="rounded-tl-[120px] rounded-br-[120px] bg-gradient-to-tr from-cyan-600 to-cyan-800 flex justify-center">
                                <Image
                                    src={"/doctor1.png"}
                                    height={300}
                                    width={200}
                                    alt="doctor image"
                                ></Image>
                            </div>
                            <p className="font-semibold">Dr. John Smith</p>
                            <p>Cardiologist</p>
                        </div>
                        <div>
                            <div className="rounded-tl-[120px] rounded-br-[120px] bg-gradient-to-tr from-cyan-600 to-cyan-800 flex justify-center">
                                <Image
                                    src={"/doctor1.png"}
                                    height={300}
                                    width={200}
                                    alt="doctor image"
                                ></Image>
                            </div>
                            <p className="font-semibold">Dr. John Smith</p>
                            <p>Cardiologist</p>
                        </div>
                        <div>
                            <div className="rounded-tl-[120px] rounded-br-[120px] bg-gradient-to-tr from-cyan-600 to-cyan-800 flex justify-center">
                                <Image
                                    src={"/doctor1.png"}
                                    height={300}
                                    width={200}
                                    alt="doctor image"
                                ></Image>
                            </div>
                            <p className="font-semibold">Dr. John Smith</p>
                            <p>Cardiologist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
