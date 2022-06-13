import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";
import React, { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MathUtils, Mesh, Points, TextureLoader } from "three";
import * as THREE from "three";
import { SpaceDust } from "./components/environment/SpaceDust";
import useStore from "./store";
import { Terrain } from "./components/Terrain";
import { VaporwavePlane } from "./components/environment/VaporwavePlane";
import { UnrealBloomPass, ShaderPass, RGBShiftShader } from "three-stdlib";
import Track from "./components/environment/Track";
import { Stars, Effects } from "@react-three/drei";
import "./app.css";
import { ArWing, Target } from "./components/Ship";
import Particles from "./components/environment/Particles";

extend({
  OrbitControls,
});

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

extend({ UnrealBloomPass, ShaderPass, RGBShiftShader });

function App() {
  const actions = useStore((state) => state.actions);
  const mutation = useStore((state) => state.mutation);

  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <div className="bg" onPointerMove={actions.updateMouse}>
      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 1.5]}
        gl={{ antiAlias: false }}
        // camera={{ position: [0, 0, -4] }}
        onMouseMove={onMouseMove}
        pixelratio={window.devicePixelRatio}
        onCreated={({ gl, size, camera }) => {
          actions.init(camera);
          mutation.clock.start();

          if (size.width < 600) {
            camera.position.z = 10;
          }
          gl.toneMapping = THREE.ReinhardToneMapping;
          gl.setClearColor(new THREE.Color("#020207"));
        }}
      >
        <fog attach="fog" args={["#070710", 700, 700]} />
        <CameraControls />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}

        <ambientLight intensity={0.75} />
        <Particles />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
        <Target />
        <Effects>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={0.1} strength={0.97} radius={0.8} />
          <shaderPass
            attachArray="passes"
            args={[RGBShiftShader]}
            uniforms-amount={[5.0025]}
            // uniforms-angle={[0.0025]}
            // uniforms-speed={[0.0025]}
            uniforms-distortion={[7.5025]}
            uniforms-color={[0.0025]}
          />
        </Effects>
        <Stars radius={500} depth={50} count={1000} factor={10} />
        <Track />
        <SpaceDust count={5000} />
        <VaporwavePlane />
      </Canvas>
    </div>
  );
}

export default App;
