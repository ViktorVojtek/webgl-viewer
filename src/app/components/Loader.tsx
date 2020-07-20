import React, { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default () => {
  const spriteMesh = useRef(null);
  const map = useMemo(
    () => new TextureLoader().load('../../../static/images/spinner2.gif'),
    []
  );

  useFrame(() => {
    if (spriteMesh) {
      spriteMesh.current.children[0].material.rotation += 0.1;
    }
  });

  return (
    <mesh ref={spriteMesh}>
      <sprite>
        <spriteMaterial attach="material" map={map} />
      </sprite>
    </mesh>
  );
};
