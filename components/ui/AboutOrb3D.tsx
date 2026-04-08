
'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Text } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Box3, Group, Mesh, Object3D, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';

const carouselItems = [
  'what make me alive',
  'programming experiences',
  'interaction design',
  'creative coding',
];

function SceneNode({ object }: { object: Object3D }) {
  if (object instanceof Mesh) {
    return (
      <mesh geometry={object.geometry} position={object.position} rotation={object.rotation} scale={object.scale}>
        <MeshTransmissionMaterial
          color="#ff7300"
          thickness={1}
          roughness={0.03}
          transmission={1}
          ior={1.3}
          chromaticAberration={1}
          attenuationDistance={0.05}
          backside
        />
      </mesh>
    );
  }

  return (
    <group position={object.position} rotation={object.rotation} scale={object.scale}>
      {object.children.map((child, index) => (
        <SceneNode key={`${child.uuid}-${index}`} object={child} />
      ))}
    </group>
  );
}

export function Model() {
  const groupRef = useRef<Group>(null);
  const targetRotationY = useRef(0);
  const { scene } = useGLTF('/medias/abstract_gold_ring/scene.gltf') as any;
  const { viewport } = useThree();
  const { model, scale } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    const size = new Vector3();

    box.getCenter(center);
    box.getSize(size);

    cloned.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const fittedScale = 2.25 / maxDimension;

    return { model: cloned, scale: fittedScale };
  }, [scene]);

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
    const lerpFactor = Math.min(.1, delta);
    groupRef.current.rotation.z +=
      (targetRotationY.current - groupRef.current.rotation.z) * lerpFactor;

  });
  const modelX = - viewport.width / 2;

  return (
    <group ref={groupRef} position={[modelX, 0, 0]} scale={(viewport.width / 3) * scale}>
      <color attach="background" args={["#0a0a0a"]} />
      <SceneNode object={model} />
    </group>
  );
}

function TextCarousel() {
  const carouselRef = useRef<Group>(null);
  const trackRef = useRef<Group>(null);
  const { viewport } = useThree();
  const duplicatedItems = [...carouselItems, ...carouselItems];
  const itemSpacing = 15;
  const totalWidth = carouselItems.length * itemSpacing;
  const topY = viewport.height / 2;

  useFrame((_, delta) => {
    if (!trackRef.current) return;

    trackRef.current.position.x -= delta * 1.2;
    if (trackRef.current.position.x <= -totalWidth) {
      trackRef.current.position.x = 0;
    }
  });

  return (
    <group ref={carouselRef} position={[0, topY, -2]}>
      <group ref={trackRef} position={[0, 0, 0]}>
        {duplicatedItems.map((item, index) => (
          <Text
            key={`${item}-${index}`}
            font="/fonts/nicholas/Nicholas.ttf"
            fontSize={1.3}
            color="#ffffff"
            anchorX="center"
            anchorY="top"
            position={[index * itemSpacing, 0, 0]}
            maxWidth={25}

          >
            {item.toUpperCase()}
          </Text>
        ))}
      </group>
    </group>
  );
}

useGLTF.preload('/medias/abstract_gold_ring/scene.gltf');

export default function AboutOrb3D() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen  overflow-visible">
      <div className="absolute -inset-28 overflow-visible">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
          {/* <color attach="background" args={["#e9e9e9"]} /> */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow />
          <pointLight intensity={1.5} position={[0, 3, 2]} />
         <Environment preset="studio" />

          <TextCarousel />
          <Model />
        </Canvas>
      </div>
    </div>
  );
}
