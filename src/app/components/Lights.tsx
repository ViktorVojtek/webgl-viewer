import React, { useRef } from 'react';
import { Color } from 'three';
import { useThree, useFrame } from 'react-three-fiber';

const SpotLightOnCam = () => {
  const light = useRef(null);
  const { camera } = useThree();

  useFrame(() => {
    if (light) {
      light.current.position.set(
        camera.position.x + 5,
        camera.position.y + 5,
        camera.position.z + 5
      );
    }
  });

  return <spotLight ref={light} color={0xffa95c} intensity={2} />;
};

export default () => (
  <group>
    <ambientLight color={0xaaaaaa} position={[0, 0, 0]} intensity={1.25} />
    <hemisphereLight
      color={0xffffff}
      groundColor={new Color(0xaaaaaa)}
      intensity={4}
    />
    <directionalLight
      castShadow
      color={0xffffff}
      position={[1, 8, 3]}
      intensity={0.25}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-near={0.5}
      shadow-camera-far={50}
      shadow-camera-left={-5}
      shadow-camera-right={5}
      shadow-camera-top={5}
      shadow-camera-bottom={-5}
    />
    <SpotLightOnCam />
  </group>
);
