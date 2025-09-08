'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ContactForm3DProps {
  position: [number, number, number]
  formData: {
    name: string
    email: string
    subject: string
    message: string
  }
  onFieldFocus: (field: string) => void
}

export default function ContactForm3D({ position, formData, onFieldFocus }: ContactForm3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const fields = [
    { name: 'name', label: 'Name', value: formData.name, position: [0, 1.5, 0] as [number, number, number] },
    { name: 'email', label: 'Email', value: formData.email, position: [0, 0.8, 0] as [number, number, number] },
    { name: 'subject', label: 'Subject', value: formData.subject, position: [0, 0.1, 0] as [number, number, number] },
    { name: 'message', label: 'Message', value: formData.message, position: [0, -0.8, 0] as [number, number, number], large: true },
  ]

  return (
    <group ref={groupRef} position={position}>

      <mesh position={[0, 0.4, -0.1]}>
        <RoundedBox args={[4, 5, 0.2]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
      </mesh>


      {fields.map((field) => (
        <group key={field.name} position={field.position}>
    
          <mesh
            onClick={() => onFieldFocus(field.name)}
            onPointerOver={() => setHoveredField(field.name)}
            onPointerOut={() => setHoveredField(null)}
          >
            <RoundedBox 
              args={[3.5, field.large ? 1.2 : 0.5, 0.1]} 
              radius={0.1} 
              smoothness={4}
            >
              <meshStandardMaterial
                color={hoveredField === field.name ? "#2a2a3e" : "#1a1a2e"}
                transparent
                opacity={0.8}
                metalness={0.6}
                roughness={0.3}
                emissive="#D4AF37"
                emissiveIntensity={hoveredField === field.name ? 0.05 : 0.02}
              />
            </RoundedBox>
          </mesh>

    
          <Text
            position={[-1.5, field.large ? 0.3 : 0.1, 0.06]}
            fontSize={0.15}
            color="#D4AF37"
            anchorX="left"
            anchorY="middle"
          >
            {field.label}
          </Text>

    
          <Text
            position={[-1.5, field.large ? -0.1 : -0.1, 0.06]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            maxWidth={3}
          >
            {field.value || `Enter your ${field.label.toLowerCase()}...`}
          </Text>

    
          {hoveredField === field.name && (
            <mesh scale={1.05}>
              <RoundedBox 
                args={[3.5, field.large ? 1.2 : 0.5, 0.1]} 
                radius={0.1} 
                smoothness={4}
              >
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
      ))}


      <group position={[0, -2, 0]}>
        <mesh
          onPointerOver={() => setHoveredField('submit')}
          onPointerOut={() => setHoveredField(null)}
        >
          <RoundedBox args={[2, 0.6, 0.15]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={hoveredField === 'submit' ? "#FFD700" : "#D4AF37"}
              metalness={0.8}
              roughness={0.2}
              emissive="#D4AF37"
              emissiveIntensity={hoveredField === 'submit' ? 0.2 : 0.1}
            />
          </RoundedBox>
        </mesh>

        <Text
          position={[0, 0, 0.08]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Send Message
        </Text>

        {hoveredField === 'submit' && (
          <mesh scale={1.1}>
            <RoundedBox args={[2, 0.6, 0.15]} radius={0.1} smoothness={4}>
              <meshBasicMaterial
                color="#D4AF37"
                transparent
                opacity={0.2}
                side={THREE.BackSide}
              />
            </RoundedBox>
          </mesh>
        )}
      </group>


      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(Array.from({ length: 150 }, () => (Math.random() - 0.5) * 6))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D4AF37"
          size={0.01}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}