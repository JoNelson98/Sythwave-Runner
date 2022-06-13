import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useStore from "../store";

export const Terrain = () => {
  const { groundHeight, clock } = useStore((state) => state);
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.4;
    // terrain.current.position.z = Math.cos(clock) * 0.75 + 1.25;
  });
  return (
    <mesh
      visible
      position={[0, groundHeight, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="#e63b7a"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
};
