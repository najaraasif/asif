'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface Avatar3DProps {
  position?: [number, number, number]
  scale?: number
}

export default function Avatar3D({ position = [0, 0, 0], scale = 1 }: Avatar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.01
      glowRef.current.rotation.x += 0.005
    }
  })

  const goldMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.8,
      roughness: 0.2,
      emissive: '#B8860B',
      emissiveIntensity: 0.1,
    }), []
  )

  return (
    <group position={position} scale={scale}>
      {/* Main Avatar Sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          distort={0.1}
          speed={2}
          emissive="#B8860B"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glow Effect */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating Rings */}
      {[1.8, 2.2, 2.6].map((radius, index) => (
        <mesh
          key={index}
          rotation={[Math.PI / 2, 0, index * Math.PI / 3]}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[radius, 0.02, 8, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6 - index * 0.1}
          />
        </mesh>
      ))}

      {/* Particle System */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 8))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D4AF37"
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}