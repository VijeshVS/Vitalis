'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', age: '', weight: '', height: '' });
  const router = useRouter();

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push('/onboarding');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800 text-white">
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-neutral-900 rounded-lg shadow-md">
        {/* Progress Bar */}
        <div className="flex justify-between w-full mb-8">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`h-1 w-1/4 transition-colors duration-300 ${
                step === index ? 'bg-blue-400' : step > index ? 'bg-blue-600' : 'bg-neutral-700'
              }`}
            ></div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="w-full">
          {step === 1 && (
            <div className="flex flex-col">
              <label className="mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col">
              <label className="mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col">
              <label className="mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col">
              <label className="mb-2">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextStep}
          className="mt-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {step < 4 ? 'Next' : 'All Done'}
        </button>
      </div>
    </div>
  );
}
