import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'; 
import { OrbitControls, useGLTF } from '@react-three/drei'; 
import { gsap } from 'gsap';

// Model component to load and display the GLB model
const Model = ({ url }) => {
  const [error, setError] = useState(false);
  const { scene, nodes, materials } = useGLTF(url);  // Load GLTF model
  const modelRef = useRef();

  useEffect(() => {
    if (!scene) {
      setError(true);
    }
  }, [scene]);

  // Using the useFrame hook to animate the model each frame
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Rotate the model continuously on the X, Y, and Z axes
      modelRef.current.rotation.x += 0.02;
      modelRef.current.rotation.y += 0.03;
      modelRef.current.rotation.z += 0.01;

      // Move the model in a wobbly motion (sinusoidal movement)
      modelRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.5 + 1; // Wobble vertically
      modelRef.current.position.x = Math.cos(clock.elapsedTime * 1.5) * 0.5; // Wobble horizontally (left-right)
      
      // Optionally scale the model for a pulsating effect
      const scale = Math.sin(clock.elapsedTime * 0.5) * 0.2 + 1; // Pulsate the scale between 0.8 and 1.2
      modelRef.current.scale.set(scale, scale, scale);
    }
  });

  if (error) {
    return <p>Model failed to load.</p>;
  }

  return <primitive object={scene} ref={modelRef} />;
};

// About page component
const About = () => {
  const lightRef = useRef();

  // GSAP animation for light movement
  useEffect(() => {
    if (lightRef.current) {
      gsap.to(lightRef.current.position, {
        y: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-amber-500 to-amber-900">
      {/* 3D Scene using Canvas */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 1, 3], fov: 60 }} 
        shadows
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[0, 5, 0]} intensity={0.6} />

        {/* 3D Model */}
        <Model url="/doctor_-_sketchfab_weekly_-_13_mar23.glb" />

        {/* Orbit controls */}
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>

      {/* Content Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">🌟Welcome !</h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">to Our AI-Powered Medicine Recommendation System!</p>
        <div className="px-8 py-3 bg-amber-900 text-white text-lg rounded-full shadow-xl hover:bg-indigo-600 transition-all">
          Start Exploring
        </div>
      </div>
    </div>
  );
};

export default About;
