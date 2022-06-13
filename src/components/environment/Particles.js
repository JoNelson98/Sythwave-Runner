import React, { useRef, useEffect } from "react";
import useStore from "../../store";
import { useFrame } from "@react-three/fiber"; // this is for the animation

export default function Particles() {
  const instancedMesh = useRef();
  const { particles, dummy } = useStore((state) => state.mutation);

  useEffect(() => {
    particles.forEach((particle, i) => {
      const { offset, scale } = particle;
      dummy.position.copy(offset);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(
        Math.sin(Math.random()) * Math.PI,
        Math.sin(Math.random()) * Math.PI,
        Math.cos(Math.random()) * Math.PI
      );
      dummy.updateMatrix();
      instancedMesh.current.setMatrixAt(i, dummy.matrix);
    });

    instancedMesh.current.position.z += 10;
    instancedMesh.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    instancedMesh.current.position.z += 0.4;
    instancedMesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      toneMapped={false}
      ref={instancedMesh}
      args={[null, null, particles.length]}
      frustumCulled={false}
    >
      <coneGeometry args={[2, 2, 3]} />
      <meshBasicMaterial color="#606060" />
    </instancedMesh>
  );
}
