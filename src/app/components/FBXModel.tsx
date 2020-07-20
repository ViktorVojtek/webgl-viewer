import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Group,
  Mesh,
  MeshPhongMaterial,
  MeshPhongMaterialParameters,
} from 'three';
import { useThree } from 'react-three-fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface IModel {
  data: {
    modelPath: string;
    materialPath: string;
    texturePath: {
      map: string;
      specular?: string;
    };
    title: string;
  };
  onModelLoaded?: () => void;
}

/* function getMTLMaterials(path: string): Promise<MTLLoader.MaterialCreator> {
  return new Promise((resolve, reject) => {
    return new MTLLoader().load(
      path,
      (materials) => {
        materials.preload();

        resolve(materials);
      },
      () => {},
      (error) => reject(error)
    );
  });
} */
function Model({ data, onModelLoaded }: IModel): any {
  const { modelPath, materialPath, texturePath, title } = data;
  const { scene } = useThree();
  const [object, setObject] = useState(null);
  useMemo(() => {
    return new FBXLoader().load(modelPath, (object: Group) => {
      console.log('FBX');
      console.log(object);
    });
  }, []);
  /* useMemo(() => {
    return new MTLLoader().load(materialPath, (materials) => {
      materials.preload();

      new OBJLoader().setMaterials(materials).load(modelPath, (object) => {
        object.scale.set(0.001, 0.001, 0.001);
        object.castShadow = true;
        object.receiveShadow = true;

        let meshMaterial: MeshPhongMaterialParameters;

        if (texturePath.map && texturePath.specular) {
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
        }

        object.traverse((child) => {
          // aka setTexture
          if (child instanceof Mesh) {
            child.material = new MeshPhongMaterial(meshMaterial);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        setObject(object);
        onModelLoaded();
      });
    });
  }, [modelPath]); */

  useEffect(() => {
    console.log('Model component');
    return () => {};
  }, []);

  console.log(scene);

  return null;

  /*
  object ? (
    <mesh name={title}>
      <primitive object={object} />
    </mesh>
  ) : null
  */
}

export default Model;
