import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-amber-500 rounded-lg px-6 py-8 my-20 md:mx-10">
      {/* Left Side */}
      <div className="flex-1">
        <p className="text-2xl sm:text-3xl font-semibold text-white">
          Book Appointment with 100+ Trusted Doctors
        </p>
        <p className="mt-4 text-lg text-white">
          At DoctorWallah, we connect you with a diverse network of over 100 trusted doctors across various specialties. Whether you're looking for a general physician, pediatrician, dermatologist, or specialist, we ensure top-notch care. Find the right doctor, schedule an appointment, and get medical advice from the comfort of your home.
        </p>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0); }}
          className="bg-amber-900 text-white text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:block md:w-1/2 relative">
        <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt="Doctor Appointment" />
      </div>
    </div>
  );
};

export default Banner;
