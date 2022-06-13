import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, MathUtils } from "three";
import useStore from "../../store";

export const VaporwavePlane = () => {
  const {
    mutation,
    groundHeight,
    vaporwaveTexturePath,
    vaporwaveDisplacementPath,
    groundZ,
    groundOneLength,
  } = useStore((state) => state);
  const loader = new TextureLoader();
  const gridTexture = loader.load(vaporwaveTexturePath);
  const terrainTexture = loader.load(vaporwaveDisplacementPath);

  const terrain = useRef();
  const terrain2 = useRef();

  const multiply = 50;
  /////////////// speeed of stage ///////////////
  const speed = 50;
  const moveGround = () => {
    const elapsedTime = mutation.clock.getElapsedTime();
    /**
     * When the first plane reaches a position of z = 2
     * we reset it to 0, its initial position
     */
    terrain.current.position.z = (elapsedTime * speed) % 400;
    terrain2.current.position.z = ((elapsedTime * speed) % 400) - 400;
  };

  useFrame(() => {
    moveGround();
  });
  return (
    <>
      <group>
        <mesh
          visible
          position={[0, groundHeight, groundZ.ground1]}
          rotation={[-Math.PI / 2, 0, 0]}
          ref={terrain}
        >
          <planeBufferGeometry
            toneMapped={false}
            attach="geometry"
            args={[2.5 * multiply, 8 * multiply, 24 * multiply, 24 * multiply]}
          />
          <meshStandardMaterial
            toneMapped={false}
            attach="material"
            color="#e63b7a"
            roughness={1}
            metalness={0}
            map={gridTexture}
            displacementMap={terrainTexture}
            displacementScale={30}
          />
        </mesh>
      </group>
      <group>
        <mesh
          visible
          // length of first plane and the length pushed back
          position={[0, groundHeight, groundZ.ground1 - groundOneLength - 200]}
          rotation={[-Math.PI / 2, 0, 0]}
          ref={terrain2}
        >
          <planeBufferGeometry
            toneMapped={false}
            attach="geometry"
            args={[2.5 * multiply, 8 * multiply, 24 * multiply, 24 * multiply]}
          />
          <meshStandardMaterial
            toneMapped={false}
            attach="material"
            color="#e63b7a"
            roughness={1}
            metalness={0}
            map={gridTexture}
            displacementMap={terrainTexture}
            displacementScale={30}
          />
        </mesh>
      </group>
    </>
  );
};

// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { TextureLoader, MathUtils } from "three";
// import useStore from "../../store";

// export const VaporwavePlane = () => {
//   const {
//     mutation,
//     groundHeight,
//     vaporwaveTexturePath,
//     vaporwaveDisplacementPath,
//     groundZ,
//     groundOneLength,
//   } = useStore((state) => state);
//   const loader = new TextureLoader();
//   const gridTexture = loader.load(vaporwaveTexturePath);
//   const terrainTexture = loader.load(vaporwaveDisplacementPath);

//   const terrain = useRef();
//   const terrain2 = useRef();

//   const multiply = 70;
//   /////////////// speeed of stage ///////////////
//   const speed = 30;
//   const moveGround = () => {
//     const elapsedTime = mutation.clock.getElapsedTime();
//     /**
//      * When the first plane reaches a position of z = 2
//      * we reset it to 0, its initial position
//      */
//     // terrain.current.position.z = (elapsedTime * speed) % 140;
//     // terrain2.current.position.z = ((elapsedTime * speed) % 140) - 140;
//   };

//   useFrame(() => {
//     moveGround();
//   });
//   return (
//     <>
//       <group>
//         <mesh
//           visible
//           position={[0, groundHeight, -140]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           ref={terrain}
//         >
//           <planeBufferGeometry
//             toneMapped={false}
//             attach="geometry"
//             args={[0.5 * multiply, 2 * multiply, 24 * multiply, 24 * multiply]}
//           />
//           <meshStandardMaterial
//             toneMapped={false}
//             attach="material"
//             color="#e63b7a"
//             roughness={1}
//             metalness={0}
//             map={gridTexture}
//             displacementMap={terrainTexture}
//             displacementScale={10}
//           />
//         </mesh>
//       </group>
//       <group>
//         <mesh
//           visible
//           // length of first plane and the length pushed back
//           position={[0, groundHeight, 140 - 140]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           ref={terrain2}
//         >
//           <planeBufferGeometry
//             toneMapped={false}
//             attach="geometry"
//             args={[0.5 * multiply, 2 * multiply, 24 * multiply, 24 * multiply]}
//           />
//           <meshStandardMaterial
//             toneMapped={false}
//             attach="material"
//             color="#e63b7a"
//             roughness={1}
//             metalness={0}
//             map={gridTexture}
//             displacementMap={terrainTexture}
//             displacementScale={10}
//           />
//         </mesh>
//       </group>
//     </>
//   );
// };
