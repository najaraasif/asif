'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

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
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])


  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1, y: 1, z: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: index * 0.2
        }
      )
      
      gsap.fromTo(groupRef.current.rotation,
        { y: Math.PI * 2 },
        {
          y: rotation[1],
          duration: 1.2,
          ease: 'power2.out',
          delay: index * 0.1
        }
      )
    }
  }, [index, rotation])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (groupRef.current) {
    
      const floatIntensity = isMobile ? 0.1 : 0.2
      const rotationSpeed = isMobile ? 0.3 : 0.5
      
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * floatIntensity
      
    
      if (!hovered) {
        groupRef.current.rotation.y = rotation[1] + Math.sin(time * rotationSpeed + index) * 0.1
        groupRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.05
      }
    }

    if (cardRef.current) {
      if (hovered) {
      
        cardRef.current.scale.setScalar(THREE.MathUtils.lerp(cardRef.current.scale.x, 1.1, 0.1))
        if (glowRef.current) {
          glowRef.current.scale.setScalar(THREE.MathUtils.lerp(glowRef.current.scale.x, 1.3, 0.1))
        }
      } else {
        cardRef.current.scale.setScalar(THREE.MathUtils.lerp(cardRef.current.scale.x, 1, 0.1))
        if (glowRef.current) {
          glowRef.current.scale.setScalar(THREE.MathUtils.lerp(glowRef.current.scale.x, 1, 0.1))
        }
      }
      
    
      const pulseScale = 1 + Math.sin(time * 2 + index) * 0.02
      cardRef.current.scale.multiplyScalar(pulseScale)
    }
  })

  const handleClick = () => {
    setFlipped(!flipped)
    
  
    if (cardRef.current) {
      gsap.to(cardRef.current.rotation, {
        y: flipped ? 0 : Math.PI,
        duration: 0.6,
        ease: 'power2.inOut'
      })
    }
  }
  
  const handleHover = (hovering: boolean) => {
    setHovered(hovering)
    
  
    if (cardRef.current) {
      gsap.to(cardRef.current.position, {
        z: hovering ? 0.2 : 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  return (
    <group 
      ref={groupRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
    >

      <mesh 
        ref={cardRef} 
        rotation={[0, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={hovered ? '#D4AF37' : '#1a1a2e'}
            metalness={0.8}
            roughness={0.2}
            emissive="#D4AF37"
            emissiveIntensity={hovered ? 0.2 : 0.05}
            transparent
            opacity={0.95}
          />
        </RoundedBox>
      </mesh>
      

      <mesh 
        ref={glowRef}
        scale={hovered ? 1.2 : 1.1}
      >
        <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
          <meshBasicMaterial
            color="#D4AF37"
            transparent
            opacity={hovered ? 0.15 : 0.05}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </RoundedBox>
      </mesh>
      

      {hovered && (
        <mesh scale={1.4}>
          <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.08}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </RoundedBox>
        </mesh>
      )}


      {!flipped && (
        <group position={[0, 0, 0.06]}>
    
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.6}
            color="#D4AF37"
            anchorX="center"
            anchorY="middle"
          >
            {achievement.icon}
          </Text>

    
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
      

      {hovered && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={20}
              array={new Float32Array(Array.from({ length: 60 }, () => (Math.random() - 0.5) * 4))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#D4AF37"
            size={0.02}
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  )
}