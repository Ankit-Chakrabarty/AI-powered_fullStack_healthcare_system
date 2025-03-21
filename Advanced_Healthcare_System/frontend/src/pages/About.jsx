import React, { useEffect } from 'react';
import { gsap } from 'gsap';

// About page component
const About = () => {
  useEffect(() => {
    // GSAP animation for background color change
    gsap.to('body', {
      backgroundColor: '#ff7e5f', // Change background color
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-900">
      {/* Content Overlay */}
      <div className="text-center text-white z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">🌟Welcome!</h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">
          to Our AI-Powered Medicine Recommendation System!
        </p>
        <div className="px-8 py-3 bg-amber-900 text-white text-lg rounded-full shadow-xl hover:bg-indigo-600 transition-all">
          Start Exploring
        </div>
      </div>
    </div>
  );
};

export default About;
