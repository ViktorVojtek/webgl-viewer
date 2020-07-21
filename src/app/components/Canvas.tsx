import React, { useState, useEffect } from 'react';
import { Uncharted2ToneMapping, PCFSoftShadowMap, LinearEncoding } from 'three';
import { Canvas } from 'react-three-fiber';
import ProductItems, { itemsCount } from '../objects';
import Scene from './Scene';
import { ArrowBtn, FormBtn, Wall } from './UI';
import MaterialsMenu from './MenuMaterials';
import Form from './Form';
import useStore from '../lib/store';
import { cameraPosStart } from '../constants';

const mImages = [
  '../../../static/images/material_set/natur.png',
  '../../../static/images/material_set/whitewashed.png',
  '../../../static/images/material_set/coffee.png',
];
const rootStyle = {
  position: 'relative' as 'relative',
  width: '100%',
  height: '100%',
};
export default () => {
  const [showForm, toggleForm] = useState(false);
  const [orderImgs, setOrderImgs] = useState([]);
  const [cameraManaged, toggleCameraManaged] = useState(false);
  const [loading, toggleLoader] = useState(true);
  const [itemIdx, setItemIdx] = useState(0);
  const [{ matMenuOpen }, dispatch] = useStore((store) => [
    store.state,
    store.dispatch,
  ]);

  useEffect(() => {
    const clicked = () => {
      if (matMenuOpen) {
        dispatch({ type: 'MAT_MENU', payload: false });
      }
    };
    document
      .getElementById('app')
      .querySelector('canvas')
      .addEventListener('click', clicked, true);

    return () =>
      document
        .getElementById('app')
        .querySelector('canvas')
        .removeEventListener('click', clicked, true);
  }, [matMenuOpen]);

  const handleStopLoad: () => void = () => {
    toggleLoader(false);
  };
  const handleNextItem: () => void = () => {
    if (itemIdx < itemsCount - 1) {
      toggleLoader(true);
      setItemIdx(itemIdx + 1);
      dispatch({ type: 'SET_MAT_IDX', payload: 0 });
    }
  };
  const handlePrevItem: () => void = () => {
    if (itemIdx > 0) {
      toggleLoader(true);
      setItemIdx(itemIdx - 1);
      dispatch({ type: 'SET_MAT_IDX', payload: 0 });
    }
  };
  const handleCamera = () => {
    toggleCameraManaged(!cameraManaged);
  };
  const handleOpenForm = () => {
    if (!cameraManaged) {
      toggleCameraManaged(true);
    }
    toggleForm(true);
  };
  const handleCloseForm = () => {
    toggleForm(false);
  };
  const handleSetOrderImages: (images: string[]) => void = (images) => {
    setOrderImgs(images);
  };

  return (
    <div style={rootStyle}>
      <Canvas
        shadowMap
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        onCreated={({ camera, gl, scene }) => {
          camera.near = 1;
          camera.position.set(
            cameraPosStart.x,
            cameraPosStart.y,
            cameraPosStart.z
          );
          camera.lookAt(scene.position);

          gl.setPixelRatio(window.devicePixelRatio);

          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;

          gl.outputEncoding = LinearEncoding;
          gl.toneMapping = Uncharted2ToneMapping;
          gl.toneMappingExposure = 0.69;

          gl.autoClear = true;

          gl.physicallyCorrectLights = true;
        }}
      >
        <Scene
          objIdx={itemIdx}
          loading={loading}
          stopLoad={handleStopLoad}
          cameraManage={cameraManaged}
          toggleCamera={handleCamera}
          orderImages={orderImgs}
          setOrderImages={handleSetOrderImages}
          showForm={showForm}
        />
      </Canvas>
      {itemIdx > 0 && <ArrowBtn onClick={handlePrevItem} direction='left' />}
      {itemIdx < itemsCount - 1 && (
        <ArrowBtn direction='right' onClick={handleNextItem} />
      )}
      <FormBtn onClick={handleOpenForm} show={showForm}>
        Objednávka
      </FormBtn>
      <MaterialsMenu
        images={ProductItems[itemIdx].matThumbs}
        open={matMenuOpen}
      />
      <Form
        images={orderImgs}
        product={ProductItems[itemIdx]}
        show={showForm}
        toggle={handleCloseForm}
      />
      <Wall show={showForm || loading} />
    </div>
  );
};
