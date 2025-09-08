'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Text3D, Center, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface Avatar3DProps {
  position?: [number, number, number]
  scale?: number
}

export default function Avatar3D({ position = [0, 0, 0], scale = 1 }: Avatar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse tracking for desktop
  useEffect(() => {
    if (isMobile) return
    
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // GSAP animations on mount
  useEffect(() => {
    if (meshRef.current) {
      // Animate the mesh scale vector components
      gsap.fromTo(meshRef.current.scale, 
        { x: 0, y: 0, z: 0 },
        { 
          x: scale, y: scale, z: scale, 
          duration: 1.5, 
          ease: 'elastic.out(1, 0.3)',
          delay: 0.5
        }
      )
      
      // Animate rotation
      gsap.fromTo(meshRef.current.rotation,
        { y: Math.PI * 2 },
        { 
          y: 0, 
          duration: 2, 
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
    
    if (ringsRef.current) {
      // Animate each ring individually
      ringsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          gsap.fromTo(child.scale,
            { x: 0, y: 0, z: 0 },
            {
              x: 1, y: 1, z: 1,
              duration: 1.2,
              ease: 'back.out(1.7)',
              delay: 1 + index * 0.2
            }
          )
        }
      })
    }
  }, [scale])
  
  // Enhanced animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (meshRef.current) {
      // Main avatar floating and rotation
      const floatIntensity = isMobile ? 0.05 : 0.1
      const rotationSpeed = isMobile ? 0.3 : 0.5
      
      meshRef.current.rotation.y = Math.sin(time * rotationSpeed) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * floatIntensity
      
      // Mouse interaction for desktop
      if (!isMobile) {
        meshRef.current.rotation.x = mousePosition.y * 0.1
        meshRef.current.rotation.z = mousePosition.x * 0.05
      }
    }
    
    if (glowRef.current) {
      const glowSpeed = isMobile ? 0.01 : 0.02
      glowRef.current.rotation.y += glowSpeed
      glowRef.current.rotation.x += glowSpeed * 0.5
      
      // Pulsing glow effect
      const pulseScale = 1.5 + Math.sin(time * 2) * 0.1
      glowRef.current.scale.setScalar(pulseScale)
    }
    
    if (ringsRef.current) {
      // Rotate rings in different directions
      ringsRef.current.children.forEach((ring, index) => {
        if (ring instanceof THREE.Mesh) {
          const direction = index % 2 === 0 ? 1 : -1
          const speed = isMobile ? 0.005 : 0.01
          ring.rotation.z += direction * speed * (index + 1)
          
          // Add subtle floating motion
          ring.position.y = Math.sin(time * 2 + index) * 0.02
        }
      })
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
      particlesRef.current.rotation.x += 0.001
    }
  })

  // Enhanced materials with better performance
  const goldMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.8,
      roughness: 0.2,
      emissive: '#B8860B',
      emissiveIntensity: 0.1,
    }), []
  )
  
  const ringMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#D4AF37',
      emissiveIntensity: 0.2,
      transparent: true,
    }), []
  )
  
  // Enhanced particle system
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(300)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [])
  
  const particleMaterial = useMemo(() =>
    new THREE.PointsMaterial({
      color: '#D4AF37',
      size: isMobile ? 0.015 : 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    }), [isMobile]
  )

  return (
    <group position={position} scale={scale}>
      {/* Main Avatar Sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          distort={isMobile ? 0.05 : 0.1}
          speed={isMobile ? 1 : 2}
          emissive="#B8860B"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Enhanced Glow Effect */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={isMobile ? 0.08 : 0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh scale={2.2}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Rings */}
      <group ref={ringsRef}>
        {[1.8, 2.2, 2.6].map((radius, index) => (
          <mesh
            key={index}
            rotation={[Math.PI / 2, 0, index * Math.PI / 3]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[
              radius, 
              isMobile ? 0.015 : 0.02, 
              isMobile ? 6 : 8, 
              isMobile ? 24 : 32
            ]} />
            <primitive object={ringMaterial} opacity={0.6 - index * 0.1} />
          </mesh>
        ))}
      </group>
      
      {/* Additional animated rings */}
      <group>
        {[3.0, 3.5].map((radius, index) => (
          <mesh
            key={`outer-${index}`}
            rotation={[Math.PI / 3 + index * Math.PI / 6, Math.PI / 4, 0]}
          >
            <torusGeometry args={[
              radius, 
              0.01, 
              4, 
              16
            ]} />
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.3 - index * 0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Enhanced Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={particleMaterial} />
      </points>
      
      {/* Additional floating particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={useMemo(() => {
              const positions = new Float32Array(150)
              for (let i = 0; i < 50; i++) {
                const radius = 4 + Math.random() * 2
                const theta = Math.random() * Math.PI * 2
                const phi = Math.random() * Math.PI
                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
                positions[i * 3 + 2] = radius * Math.cos(phi)
              }
              return positions
            }, [])}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFD700"
          size={0.01}
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}