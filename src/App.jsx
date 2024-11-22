import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, useGLTF, ContactShadows } from '@react-three/drei';
import { easing } from 'maath';

function Model({ url }) {
  const { scene } = useGLTF(url); // Load the GLTF model
  return <primitive object={scene} position={[0, -2, 0]} castShadow />;
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 3, // Adjusted for a closer horizontal range
        state.pointer.y * 2.5,          // Adjusted for a closer vertical range
        8 + Math.cos(state.pointer.x) * 5, // Adjusted to bring the camera closer to the model
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov:35 }} // Closer initial position
    >
      {/* Lights */}
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 10]}
        penumbra={1}
        castShadow
        angle={0.2}
        shadow-mapSize={2048}
      />

      {/* Floating Model */}
      <Float floatIntensity={2} speed={2} rotationIntensity={0.5}>
        <Model url="./model/black.glb" />
      </Float>

      {/* Ground and Shadows */}
      <ContactShadows
        position={[0, -2.5, 0]}
        scale={10}
        blur={2}
        far={10}
        opacity={0.75}
      />

      {/* Environment */}
      <Environment files="./ShowcaseEnvy.hdr" />

      {/* Camera Rig */}
      <Rig />
    </Canvas>
  );
}
