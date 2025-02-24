import React from 'react';
import { useGLTF } from '@react-three/drei'; // Importing GLTF loader from drei for 3D model
import { Canvas } from '@react-three/fiber'; // Import Canvas from R3F
import { OrbitControls, Environment } from '@react-three/drei'; // For controls and environment settings

// Assuming assets are located in the assets.js file
import { assets } from '../assets/assets'; 

const Header = () => {
    const { scene, isReady } = useGLTF('/scene.gltf'); // Load the 3D model from the public directory

    // Log to check if model is being loaded
    console.log('Model Loaded:', scene);

    // If the model is not ready, show a loading message
    if (isReady) {
        console.log('Model Position:', scene.position);
        console.log('Model Scale:', scene.scale);
        console.log('Model Children:', scene.children);
    }

    return (
        <div className='flex flex-col md:flex-row bg-amber-500 rounded-lg px-6 md:px-10 lg:px-20 py-10'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto'>
                <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-900 font-semibold leading-tight'>
                Book Appointment With<br />50+ Trusted Doctors
                </p>
                {/* Updated button design for emphasis */}
                <a href='#speciality' className='flex items-center gap-2 bg-amber-900 px-8 py-3 rounded-full text-white text-sm sm:text-base font-semibold m-auto md:m-0 hover:scale-110 transition-all duration-300 shadow-lg'>
                    Book Appointment <img className='w-4' src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* --------- Header Right (with 3D Model) --------- */}
            <div className='md:w-1/2 flex justify-center items-center relative'>
                {/* 3D Canvas */}
                <Canvas
                    camera={{ position: [7, 5, 15], fov: 50 }} // Adjusted camera position for a better view
                    style={{
                        height: '50vh', // Default smaller height for mobile devices
                        width: '100%',
                        borderRadius: '12px', // Optional: to match rounded header edges
                    }}
                >
                    {/* Lights */}
                    <ambientLight intensity={0.6} /> {/* Slightly brighter ambient light */}
                    <directionalLight position={[5, 5, 5]} intensity={1.2} /> {/* Adjusted directional light */}
                    <spotLight position={[10, 10, 10]} angle={0.15} intensity={4} /> {/* Stronger spotlight */}
                    {/* Controls */}
                    <OrbitControls />
                    {/* 3D Model (Scaled up) */}
                    <primitive object={scene} scale={[10, 10, 10]} position={[0, -1, 0]} /> {/* Scaled up */}
                    {/* Background Environment */}
                    <Environment preset="city" />
                </Canvas>
            </div>
        </div>
    );
};

export default Header;
