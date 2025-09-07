'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

interface Scene3DProps {
  children: React.ReactNode
  camera?: {
    position: [number, number, number]
    fov?: number
  }
  controls?: boolean
  className?: string
}

function Scene3DFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-luxury-gold"></div>
    </div>
  )
}

export default function Scene3D({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  className = "w-full h-full"
}: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        shadows
      >
        <PerspectiveCamera 
          makeDefault 
          position={camera.position} 
          fov={camera.fov || 75}
        />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.5}
          color="#D4AF37"
        />
        <spotLight
          position={[0, 15, 0]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          color="#D4AF37"
          castShadow
        />

        {/* Controls */}
        {controls && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}

        {/* Scene Content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}