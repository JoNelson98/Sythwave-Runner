const Sphere = () => (
  <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
    <sphereGeometry attach="geometry" args={[1, 16, 16]} />
    <meshStandardMaterial
      attach="material"
      color="white"
      transparent
      roughness={0.1}
      metalness={0.1}
    />
  </mesh>
);

const Light = ({ brightness, color }) => (
  <rectAreaLight
    width={3}
    height={3}
    color={color}
    intensity={brightness}
    position={[-2, 0, 5]}
    lookAt={[0, 0, 0]}
    penumbra={1}
    castShadow
  />
);

const GroundPlane = () => (
  <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
    <planeBufferGeometry attach="geometry" args={[500, 500]} />
    <meshStandardMaterial attach="material" color="white" />
  </mesh>
);

const Backdrop = () => (
  <mesh receiveShadow position={[0, -1, -5]}>
    <planeBufferGeometry attach="geometry" args={[500, 500]} />
    <meshStandardMaterial attach="material" color="white" />
  </mesh>
);
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}
function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}

export { Sphere, Light, GroundPlane, Backdrop, KeyLight, FillLight, RimLight };
