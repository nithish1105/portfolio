import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, useSphere } from '@react-three/cannon';
import { Environment, Text, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { name: "React", slug: "react" },
  { name: "Three.js", slug: "threedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "WebGL", slug: "opengl" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python", slug: "python" },
  { name: "Postgres", slug: "postgresql" },
  { name: "MySQL", slug: "mysql" },
  { name: "Redis", slug: "redis" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "GSAP", slug: "greensock" },
  { name: "Framer", slug: "framer" }
];

const SkillBall = ({ text, slug, position }) => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [1],
    linearDamping: 0.4,
    angularDamping: 0.4,
  }));
  const [hovered, setHovered] = useState(false);
  
  // Load logo texture
  const texture = useTexture(`https://cdn.simpleicons.org/${slug}`);

  // Apply a gentle force towards the center (0,0,0) to keep them clustered
  useFrame((state) => {
    if (!ref.current) return;
    const pos = new THREE.Vector3();
    ref.current.getWorldPosition(pos);
    
    // Limits
    if (pos.length() > 5) {
       const dir = pos.clone().normalize().multiplyScalar(-10);
       api.applyForce([dir.x, dir.y, dir.z], [0,0,0]);
    }
    
    // Gentle gravity to center
    if (pos.lengthSq() > 0.5) {
        pos.normalize().multiplyScalar(-2);
        api.applyForce([pos.x, pos.y, 0], [0, 0, 0]);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'none'; // Keep custom cursor
    // Push away randomly on hover
    const dir = new THREE.Vector3().copy(ref.current.position).normalize();
    api.applyImpulse([dir.x * 2 + (Math.random()-0.5)*2, dir.y * 2 + (Math.random()-0.5)*2, (Math.random()-0.5)*2], [0, 0, 0]);
  };

  return (
    <mesh 
      ref={ref}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial 
        color={hovered ? "#ffffff" : "#f0f0f0"}
        roughness={0.15}
        metalness={0.1}
        transmission={0}
        thickness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.4 : 0}
      />
      
      {/* Front Decal Logo */}
      <Decal 
        position={[0, 0.2, 1]} 
        rotation={[0, 0, 0]} 
        scale={0.8} 
        map={texture} 
      />

      {/* Text Label */}
      <Text
        position={[0, -0.6, 1.05]} 
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
      
      {/* Back Decal Logo (optional, or mirrored) */}
      <Decal 
        position={[0, 0.2, -1]} 
        rotation={[0, Math.PI, 0]} 
        scale={0.8} 
        map={texture} 
      />
       <Text
        position={[0, -0.6, -1.05]} 
        rotation={[0, Math.PI, 0]}
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  );
};


// Mouse repeller invisible ball
const Pointer = () => {
  const { viewport, mouse } = useThree();
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2], position: [0, 0, 0] }));
  
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0); // Pointer moves an invisible kinematic sphere around
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
      return { id: index, ...skill, position: [x, y, (Math.random() - 0.5) * 2] };
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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} angle={0.3} penumbra={1} castShadow />
          <Environment preset="city" />
          
          <Suspense fallback={null}>
            <Physics gravity={[0, 0, 0]} iterations={10}>
              <Pointer />
              {balls.map((ball) => (
                <SkillBall key={ball.id} text={ball.name} slug={ball.slug} position={ball.position} />
              ))}
            </Physics>
          </Suspense>

        </Canvas>
      </div>
    </section>
  );
};

export default TechStack;
