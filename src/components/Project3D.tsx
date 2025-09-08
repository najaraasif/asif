'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text, Image as DreiImage } from '@react-three/drei'
import * as THREE from 'three'
import { Project } from '@/types'

interface Project3DProps {
  project: Project
  position: [number, number, number]
  rotation: [number, number, number]
  isActive: boolean
  onClick: () => void
}

export default function Project3D({ 
  project, 
  position, 
  rotation, 
  isActive, 
  onClick 
}: Project3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      if (isActive) {
      
        groupRef.current.position.lerp(new THREE.Vector3(0, 0, 1), 0.1)
        groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
      } else {
      
        groupRef.current.position.lerp(new THREE.Vector3(...position), 0.1)
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y, 
          rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1, 
          0.1
        )
      }
    }

    if (frameRef.current && hovered) {
      const material = frameRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity, 
        0.2, 
        0.1
      )
    } else if (frameRef.current) {
      const material = frameRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity, 
        0.05, 
        0.1
      )
    }
  })

  return (
    <group 
      ref={groupRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >

      <mesh ref={frameRef} castShadow receiveShadow>
        <RoundedBox args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={isActive ? 0.15 : 0.05}
          />
        </RoundedBox>
      </mesh>


      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#1a1a2e"}
          transparent
          opacity={0.9}
        />
      </mesh>


      <Text
        position={[0, -1.2, 0.11]}
        fontSize={0.2}
        color={isActive ? "#D4AF37" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
        font="/fonts/Inter-Bold.woff"
      >
        {project.title}
      </Text>


      {isActive && (
        <group position={[0, -1.6, 0.11]}>
          {project.technologies.slice(0, 3).map((tech, index) => (
            <mesh key={tech} position={[(index - 1) * 0.8, 0, 0]}>
              <RoundedBox args={[0.7, 0.2, 0.05]} radius={0.05} smoothness={2}>
                <meshStandardMaterial
                  color="#1a1a2e"
                  transparent
                  opacity={0.8}
                />
              </RoundedBox>
              <Text
                position={[0, 0, 0.03]}
                fontSize={0.08}
                color="#D4AF37"
                anchorX="center"
                anchorY="middle"
              >
                {tech}
              </Text>
            </mesh>
          ))}
        </group>
      )}


      {isActive && (
        <mesh scale={1.1}>
          <RoundedBox args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </RoundedBox>
        </mesh>
      )}


      {hovered && !isActive && (
        <mesh scale={1.05}>
          <RoundedBox args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </RoundedBox>
        </mesh>
      )}
    </group>
  )
}