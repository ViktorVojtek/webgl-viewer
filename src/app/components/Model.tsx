import React, { useEffect, useMemo, useState } from 'react';
import {
  Mesh,
  // MeshPhongMaterial,
  // MeshPhongMaterialParameters,
  // LinearFilter,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  // MeshLambertMaterial,
} from 'three';
// import { useThree } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import Sprite from './Sprite';
import useStore from '../lib/store';

interface IModel {
  data: {
    modelPath: string;
    materialPath: string;
    texturePath: {
      map: string;
      specular?: string;
    };
    title: string;
    position: number[];
    scale: number;
  };
  onModelLoaded?: () => void;
  hide?: boolean;
  showForm?: boolean;
}

function Model({ data, hide, onModelLoaded, showForm }: IModel) {
  const { modelPath, materialPath, texturePath, title, position, scale } = data;
  const [object, setObject] = useState(null);
  const [{ matMenuOpen }, dispatch] = useStore((store) => [
    store.state,
    store.dispatch,
  ]);

  // const { scene } = useThree();

  useMemo(() => {
    return new MTLLoader().load(materialPath, (materials) => {
      materials.preload();

      new OBJLoader().setMaterials(materials).load(modelPath, (object) => {
        if (position && position.length > 0) {
        }
        object.position.set(position[0], position[1], position[2]);
        object.scale.set(scale, scale, scale);
        object.castShadow = true;
        object.receiveShadow = true;

        let meshMaterial: MeshPhysicalMaterialParameters; // MeshPhongMaterialParameters;

        const mapT = new TextureLoader().load(texturePath.map);

        meshMaterial = {
          map: mapT,
        };

        /* if (texturePath.map && texturePath.specular) {
          const mapT = new TextureLoader().load(texturePath.map);
          const specularT = new TextureLoader().load(
            texturePath.specular as string
          );

          meshMaterial = {
            map: mapT,
            specularMap: specularT,
          };
        } else {
          const mapT = new TextureLoader().load(texturePath.map);

          meshMaterial = {
            map: mapT,
          };
        } */

        meshMaterial.roughness = 0.25;
        meshMaterial.reflectivity = 0.75; // 0x050505;
        // meshMaterial.map.minFilter = LinearFilter;

        object.traverse((child) => {
          // aka setTexture
          if (child instanceof Mesh) {
            child.material = new MeshPhysicalMaterial(meshMaterial); // new MeshPhongMaterial(meshMaterial);
            child.material.needsUpdate = true;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        setObject(object);
        setTimeout(() => {
          onModelLoaded();
        }, 100);
      });
    });
  }, [modelPath, texturePath]);

  useEffect(() => {
    return () => {};
  }, []);

  const handleObjectClick: () => void = () => {
    if (!matMenuOpen) {
      dispatch({ type: 'MAT_MENU', payload: true });
    }
  };

  const handleChangeCursor: (over: boolean) => void = (over) => {
    if (over) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  };

  // console.log(scene);

  return hide ? null : object ? (
    <group>
      {!showForm && (
        <Sprite
          onClick={handleObjectClick}
          onPointerOver={() => handleChangeCursor(true)}
          onPointerOut={() => handleChangeCursor(false)}
          position={[0.65, 1.35, -0.25]}
          scale={[0.25, 0.25, 0.25]}
          texture='../../../static/images/info.png'
        />
      )}
      <mesh castShadow receiveShadow name={title}>
        <primitive object={object} />
      </mesh>
    </group>
  ) : null;
}

export default Model;
