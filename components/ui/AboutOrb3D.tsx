'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

export function Model() {
  const groupRef = useRef<Group>(null);
  const targetRotationY = useRef(0);
  const { nodes } = useGLTF('/medias/Circle.glb') as any;
  const { viewport } = useThree();

  useEffect(() => {
    const onScroll = () => {
      targetRotationY.current = -window.scrollY * 0.003;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const lerpFactor = Math.min(1, delta);
    groupRef.current.rotation.y +=
      (targetRotationY.current - groupRef.current.rotation.y) * lerpFactor;
  });

  return (
    <group ref={groupRef} scale={viewport.width / 4.8}>
      <mesh geometry={nodes.Sphere.geometry}>
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.02}
          backside
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/medias/Circle.glb');

export default function AboutOrb3D() {
  return (
    <div className="absolute top-0.5 z-10 h-full w-full overflow-visible sm:h-85 md:h-105">
      <div className="absolute -inset-28 overflow-visible">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow />
          <pointLight intensity={3} position={[0, 3, 2]} />
          <Environment preset="city" />
          <Model />
        </Canvas>
      </div>
    </div>
  );
}
