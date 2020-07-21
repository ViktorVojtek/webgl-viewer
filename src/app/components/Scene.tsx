import React from 'react';
// import { useResource } from 'react-three-fiber';
import Controls from './Controls';
import items from '../objects';
// import Spinner from './Loader';
import Model from './Model';
// import FBXModel from './FBXModel';
import useStore from '../lib/store';
import Lights from './Lights';
// import Box from './Box';
import GroundPlane from './GroundPlane';

interface IScene {
  objIdx?: number;
  loading?: boolean;
  stopLoad?: () => void;
  cameraManage?: boolean;
  toggleCamera?: () => void;
  orderImages?: string[];
  setOrderImages?: (images: string[]) => void;
  showForm?: boolean;
}

export default ({
  loading,
  objIdx,
  stopLoad,
  cameraManage,
  toggleCamera,
  orderImages,
  setOrderImages,
  showForm,
}: IScene) => {
  const [{ matIdx }] = useStore((store) => [store.state]);

  const modelData = {
    materialPath: items[objIdx || 0].material[0],
    modelPath: items[objIdx || 0].model[0],
    texturePath: (items[objIdx || 0].textures[0] as any)[0][matIdx],
    title: items[objIdx || 0].title,
    position: items[objIdx || 0].position,
    scale: items[objIdx || 0].scale,
  };

  return (
    <>
      <Lights />
      <Model
        data={modelData}
        onModelLoaded={stopLoad}
        hide={loading}
        showForm={showForm}
      />
      <GroundPlane />
      <Controls
        manage={cameraManage}
        toggleCamera={toggleCamera}
        orderImages={orderImages}
        setOrderImages={setOrderImages}
      />
    </>
  );
};

/*
<FBXModel
  data={{
    modelPath: '../static/models/fbx/tatran/model.fbx',
    materialPath: '',
    texturePath: {
      map: '../static/models/fbx/tatran/textures/CM.jpg',
      specular: '../static/models/fbx/tatran/textures/CM_bielena_S.jpg',
    },
    title: 'Tatran',
  }}
  onModelLoaded={stopLoad}
/>
*/
