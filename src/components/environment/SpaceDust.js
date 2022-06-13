import React, { useMemo, useRef } from "react";
import { MathUtils } from "three"; // this is to handle the random number generation
import { useFrame } from "@react-three/fiber"; // this is for the animation
import * as THREE from "three";

export const SpaceDust = ({ count }) => {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const time = MathUtils.randFloat(0, 100);
      const factor = MathUtils.randFloat(20, 120);
      const speed = MathUtils.randFloat(0.1, 0.15) / 8;
      const x = MathUtils.randFloat(-100, 100);
      const y = MathUtils.randFloat(-100, 100);
      const z = MathUtils.randFloat(-5000, 5000);
      temp.push({ time: time, factor: factor, speed: speed, x: x, y: y, z: z });
    }

    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    // run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // update particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      // console.log(dummy);

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t);
      dummy.scale.set(s, s, s + 1.5);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
      // mesh.current.position.z += 0.4;
    });
    mesh.current.position.z += 0.4;
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* <pointLight ref={light} distance={40} intensity={8} color="lightBlue" /> */}
      <instancedMesh toneMapped={false} ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="white" />
      </instancedMesh>
    </>
  );
};
