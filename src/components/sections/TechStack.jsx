import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, useSphere } from '@react-three/cannon';
import { Environment, Text, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { name: "React", bg: "#61DAFB", img: "https://cdn.simpleicons.org/react" },
  { name: "Three.js", bg: "#000000", img: "https://cdn.simpleicons.org/three.js" },
  { name: "Next.js", bg: "#000000", img: "https://cdn.simpleicons.org/next.js" },
  { name: "Node.js", bg: "#339933", img: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Tailwind", bg: "#06B6D4", img: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "WebGL", bg: "#990000", img: "https://cdn.simpleicons.org/webgl" },
  { name: "TypeScript", bg: "#3178C6", img: "https://cdn.simpleicons.org/typescript" },
  { name: "Python", bg: "#3776AB", img: "https://cdn.simpleicons.org/python" },
  { name: "Postgres", bg: "#4169E1", img: "https://cdn.simpleicons.org/postgresql" },
  { name: "Redis", bg: "#DC382D", img: "https://cdn.simpleicons.org/redis" },
  { name: "GSAP", bg: "#88CE02", img: "https://cdn.simpleicons.org/greensock" },
  { name: "Framer", bg: "#0055FF", img: "https://cdn.simpleicons.org/framer" },
  { name: "MySQL", bg: "#4479A1", img: "https://cdn.simpleicons.org/mysql" },
  { name: "Java", bg: "#007396", img: "https://cdn.simpleicons.org/openjdk" }
];

const SkillBall = ({ skill, position }) => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [1],
    linearDamping: 0.8,
    angularDamping: 0.8,
    collisionFilterGroup: 1, // Optimize collision
    collisionFilterMask: 1, // Only collide with default group
  }));
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(skill.img);

  useFrame(() => {
    if (!ref.current) return;
    // Skip heavy calculations if not needed every frame
    if (Math.random() > 0.5) {
      const pos = new THREE.Vector3();
      ref.current.getWorldPosition(pos);
      
      // Keep Z roughly 0 to avoid front/back spread
      // Gentler pull to center for smoother float
      const force = pos.clone().normalize().multiplyScalar(-2.5);
      api.applyForce([force.x, force.y, -pos.z * 2], [0, 0, 0]); // Stronger Z containment
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'none';
  };

  return (
    <mesh 
      ref={ref}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 16, 16]} /> {/* Reduced polygon count for performance */}
      <meshPhysicalMaterial 
        color="#ffffff" 
        roughness={0.15}
        metalness={0.1}
        transmission={0}
        thickness={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      <Decal 
        position={[0, 0, 1]} 
        rotation={[0, 0, 0]} 
        scale={0.8} 
        map={texture} 
      />
      <Text
        position={[0, -0.6, 0.8]} 
        rotation={[0, 0, 0]}
        fontSize={0.25}
        fontWeight="bold"
        color="black"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
      >
        {skill.name}
      </Text>

      <Decal 
        position={[0, 0, -1]} 
        rotation={[0, Math.PI, 0]} 
        scale={0.8} 
        map={texture} 
      />
      <Text
        position={[0, -0.6, -0.8]} 
        rotation={[0, Math.PI, 0]}
        fontSize={0.25}
        fontWeight="bold"
        color="black"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
      >
        {skill.name}
      </Text>
    </mesh>
  );
};

// Mouse repeller invisible ball
const Pointer = () => {
  const { viewport } = useThree();
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2.5], position: [0, 0, 0] }));
  
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0); 
  });
  return null;
};

const TechStack = () => {
  const balls = useMemo(() => {
    return SKILLS.map((skill, index) => {
      // distribute randomly in a sphere
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 5;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      return { id: index, skill: skill, position: [x, y, (Math.random() - 0.5) * 2] };
    });
  }, []);

  return (
    <section id="techstack" className="py-24 relative bg-[#0a0a0a] min-h-screen flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10 pt-10">
        <h2 className="text-4xl md:text-5xl font-heavy text-white uppercase tracking-tighter text-center">
          My Tech Stack
        </h2>
        <p className="text-white/40 font-mono text-sm tracking-widest text-center mt-4 uppercase">
          Interact with the spheres
        </p>
      </div>

      <div className="w-full h-[600px] md:h-[800px] mt-8 relative cursor-none">
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 45 }}> {/* Reduced dpr for mobile */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} angle={0.3} penumbra={1} castShadow />
          <Environment preset="city" />
          
          <Physics gravity={[0, 0, 0]} iterations={5}> {/* Reduced physics iterations */}
            <Pointer />
            {balls.map((ball) => (
              <SkillBall key={ball.id} skill={ball.skill} position={ball.position} />
            ))}
          </Physics>

        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
