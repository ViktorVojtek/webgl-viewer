import React, { useMemo } from 'react';
import { NearestFilter } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface IProps {
  texture?: string;
}
export default (props: IProps | any) => {
  const { texture } = props;

  const map = useMemo(() => new TextureLoader().load(texture), []);
  map.anisotropy = 0;
  map.magFilter = NearestFilter;
  map.minFilter = NearestFilter;

  return (
    <mesh {...props}>
      <sprite>
        <spriteMaterial attach="material" map={map} color={0xffffff} />
      </sprite>
    </mesh>
  );
};
