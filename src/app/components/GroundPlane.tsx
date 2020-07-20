import React from 'react';

export default () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[1000, 1000, 100, 100]} />
    <shadowMaterial attach="material" transparent opacity={0.4} />
  </mesh>
);
