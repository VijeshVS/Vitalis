// pages/index.js
"use client"
import Calendar from "@/src/components/ui/calender";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
      <Calendar />
    </div>
  );
}