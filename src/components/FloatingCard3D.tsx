'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingCard3DProps {
  achievement: {
    title: string
    value: string
    description: string
    icon: string
  }
  position: [number, number, number]
  rotation?: [number, number, number]
  index: number
}

export default function FloatingCard3D({ 
  achievement, 
  position, 
  rotation = [0, 0, 0],
  index 
}: FloatingCard3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.2
      
      // Gentle rotation
      if (!hovered) {
        groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      }
    }

    if (cardRef.current && hovered) {
      // Hover animation
      cardRef.current.scale.setScalar(THREE.MathUtils.lerp(cardRef.current.scale.x, 1.1, 0.1))
    } else if (cardRef.current) {
      cardRef.current.scale.setScalar(THREE.MathUtils.lerp(cardRef.current.scale.x, 1, 0.1))
    }
  })

  const handleClick = () => {
    setFlipped(!flipped)
  }

  const cardMaterial = new THREE.MeshStandardMaterial({
    color: hovered ? '#D4AF37' : '#1a1a2e',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#D4AF37',
    emissiveIntensity: hovered ? 0.1 : 0.05,
    transparent: true,
    opacity: 0.9,
  })

  return (
    <group 
      ref={groupRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Card */}
      <mesh ref={cardRef} rotation={[0, flipped ? Math.PI : 0, 0]} castShadow receiveShadow>
        <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={hovered ? '#D4AF37' : '#1a1a2e'}
            metalness={0.8}
            roughness={0.2}
            emissive="#D4AF37"
            emissiveIntensity={hovered ? 0.1 : 0.05}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
      </mesh>

      {/* Front Side Content */}
      {!flipped && (
        <group position={[0, 0, 0.06]}>
          {/* Icon */}
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.6}
            color="#D4AF37"
            anchorX="center"
            anchorY="middle"
          >
            {achievement.icon}
          </Text>

          {/* Value */}
          <Text
            position={[0, 0.2, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            {achievement.value}
          </Text>

          {/* Title */}
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.2}
            color="#D4AF37"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
            textAlign="center"
          >
            {achievement.title}
          </Text>
        </group>
      )}

      {/* Back Side Content */}
      {flipped && (
        <group position={[0, 0, 0.06]} rotation={[0, Math.PI, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.6}
            textAlign="center"
          >
            {achievement.description}
          </Text>
        </group>
      )}

      {/* Glow Effect */}
      {hovered && (
        <mesh scale={1.2}>
          <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </RoundedBox>
        </mesh>
      )}
    </group>
  )
}