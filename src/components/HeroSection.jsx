"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import bg from "../../public/phyk.png"; // Import the background image

export default function HeroSection() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/mint');
  };

  return (
    <div className="hero min-h-screen bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={bg} layout="fill" className="object-cover opacity-25 animate-spin-slow" alt="Background" />
      </div>
      <div className="hero-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Invest IN RWAs AND GRWAs</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
