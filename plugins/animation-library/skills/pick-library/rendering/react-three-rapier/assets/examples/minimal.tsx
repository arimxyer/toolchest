import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

/**
 * Minimal r3/rapier scene:
 * - A sphere falls under gravity and bounces off a static floor.
 * - Wrap <Physics> in <Suspense> — rapier WASM loads asynchronously.
 */
function Scene() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* Dynamic sphere — falls and bounces */}
      <RigidBody position={[0, 5, 0]} restitution={0.7} colliders="ball">
        <mesh castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
      </RigidBody>

      {/* Static floor — type="fixed" never moves */}
      <RigidBody type="fixed" position={[0, -1, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      </RigidBody>
    </Physics>
  );
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 4, 10], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} castShadow />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
