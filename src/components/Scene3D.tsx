'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

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
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-luxury-dark/50 to-luxury-blue/50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-t-2 border-b-2 border-luxury-gold mx-auto mb-4"></div>
        <p className="text-luxury-gold text-sm sm:text-base">Loading 3D Experience...</p>
      </div>
    </div>
  )
}

export default function Scene3D({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  className = "w-full h-full"
}: Scene3DProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [pixelRatio, setPixelRatio] = useState(1)
  
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Limit pixel ratio on mobile for better performance
      setPixelRatio(mobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])
  return (
    <div className={className}>
      <Canvas
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: isMobile, // Better depth precision on mobile
        }}
        dpr={[1, pixelRatio]} // Adaptive pixel ratio
        shadows={!isMobile} // Disable shadows on mobile
        performance={{
          min: isMobile ? 0.3 : 0.5, // Lower minimum fps on mobile
        }}
        camera={{
          position: camera.position,
          fov: camera.fov || 75,
          near: 0.1,
          far: 1000
        }}
      >
        {/* Adaptive DPR and Events for performance */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        {/* Performance-optimized lighting */}
        <ambientLight intensity={isMobile ? 0.3 : 0.2} />
        
        {!isMobile && (
          <>
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <spotLight
              position={[0, 15, 0]}
              intensity={0.8}
              angle={0.3}
              penumbra={1}
              color="#D4AF37"
              castShadow
              shadow-mapSize-width={512}
              shadow-mapSize-height={512}
            />
          </>
        )}
        
        {/* Mobile-optimized lighting */}
        {isMobile && (
          <>
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={0.8}
            />
            <pointLight 
              position={[0, 10, 0]} 
              intensity={0.4}
              color="#D4AF37"
            />
          </>
        )}
        
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={isMobile ? 0.3 : 0.5}
          color="#D4AF37"
        />

        {/* Controls with touch support */}
        {controls && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={isMobile ? 0.3 : 0.5}
            // Touch-specific settings
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN
            }}
          />
        )}

        {/* Scene Content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
        
        {/* Fog for depth and performance */}
        <fog attach="fog" args={['#0A0A0A', 10, 50]} />
      </Canvas>
    </div>
  )
}