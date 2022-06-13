import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";
import React, { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MathUtils, Mesh, Points, TextureLoader } from "three";
import * as THREE from "three";

import useStore from "../store";

export const Target = () => {
  // Create refs for the two sprites we will create.
  const rearTarget = useRef();
  // const frontTarget = useRef();

  const loader = new TextureLoader();
  // A png with transparency to use as the target sprite.
  // const rearTexture = loader.load(require("./assets/images/g2316.png"));
  const frontTexture = loader.load(require("../assets/images/g4177.png"));

  useFrame(({ mouse }) => {
    // rearTarget.current.position.y = -mouse.y * 10;
    // rearTarget.current.position.x = -mouse.x * 30;
    rearTarget.current.position.y = MathUtils.lerp(
      rearTarget.current.position.y,
      -mouse.y * 10,
      0.3
    );
    rearTarget.current.position.x = MathUtils.lerp(
      rearTarget.current.position.x,
      -mouse.x * 30,
      0.3
    );

    // frontTarget.current.position.y = -mouse.y * 20;
    // frontTarget.current.position.x = -mouse.x * 60;
  });
  // Return a group containing two sprites. One positioned eight units in front of the ship, and the other 16 in front.
  // We give the spriteMaterial a map prop with the loaded sprite texture as a value/
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={rearTarget}>
        <spriteMaterial
          toneMapped={false}
          attach="material"
          map={frontTexture}
        />
      </sprite>
      {/* <sprite position={[0, 0, -16]} ref={frontTarget}>
          <spriteMaterial emissive attach="material" map={frontTexture} />
        </sprite> */}
    </group>
  );
};

export const ArWing = () => {
  const mutation = useStore((state) => state.mutation);
  const { clock, mouse, ray } = mutation;

  const [shipPosition, setShipPosition] = React.useState();
  const ship = useRef();
  // const exhaust = useRef();
  const { nodes } = useLoader(
    GLTFLoader,
    require("../assets/models/arwing.gltf")
  );

  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
    });
  });

  // Update the ships position from the updated state.
  useFrame(({ camera }) => {
    ship.current.rotation.z = THREE.MathUtils.lerp(
      ship.current.rotation.z,
      shipPosition.rotation.z,
      0.1
    );
    ship.current.rotation.y = THREE.MathUtils.lerp(
      ship.current.rotation.y,
      shipPosition.rotation.x,
      0.1
    );
    ship.current.rotation.x = THREE.MathUtils.lerp(
      ship.current.rotation.x,
      shipPosition.rotation.y,
      0.1
    );
    ////
    ship.current.position.y = THREE.MathUtils.lerp(
      ship.current.position.y,
      shipPosition.position.y,
      0.1
    );
    ship.current.position.x = THREE.MathUtils.lerp(
      ship.current.position.x,
      shipPosition.position.x,
      0.1
    );

    // exhaust.current.scale.x = 1 + Math.sin(clock.getElapsedTime() * 200);
    // exhaust.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 200);

    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      shipPosition.rotation.x / 2,
      0.1
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      shipPosition.rotation.y / 2,
      0.1
    );
  });

  return (
    <group ref={ship}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshNormalMaterial
          // toneMapped={false}
          attach="material"
          color="#3f7b9d"
          roughness={0.7}
          metalness={0}
        />
        {/* <meshDepthMaterial
          //   toneMapped={false}
          attach="material"
          color="#3f7b9d"
          roughness={0.7}
          metalness={0}
          gradientMap="fiveTone"
        /> */}
      </mesh>
      {/* <mesh ref={exhaust} scale={[1, 1, 30]} position={[0, -0.4, 43]}>
          <dodecahedronBufferGeometry args={[1.5, 0]} />
          <meshBasicMaterial toneMapped={false} color="lightblue" />
        </mesh> */}
    </group>
  );
};
