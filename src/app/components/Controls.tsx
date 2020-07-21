import React, { useRef } from 'react';
import {
  Dom,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { cameraPosStart, cameraPosChange } from '../constants';

extend({ OrbitControls, Dom });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Dom: any;
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}
export default function Controls({
  manage,
  toggleCamera,
  setOrderImages,
}: {
  manage?: boolean;
  toggleCamera?: () => void;
  orderImages?: string[];
  setOrderImages?: (images: string[]) => void;
}) {
  const controls = useRef(null);
  const {
    camera,
    gl: { domElement },
  } = useThree();

  useFrame(() => {
    if (manage) {
      controls.current.enabled = false;
      const strMime = 'image/png';

      setTimeout(() => {
        const newImagesArr: string[] = [];
        camera.position.set(
          cameraPosChange.x,
          cameraPosChange.y,
          cameraPosChange.z
        );
        const imgData1 = domElement.toDataURL(strMime);

        newImagesArr.push(imgData1);

        setTimeout(() => {
          camera.position.set(
            cameraPosStart.x,
            cameraPosStart.y,
            cameraPosStart.z
          );
          const imgData2 = domElement.toDataURL(strMime);

          newImagesArr.push(imgData2);

          setOrderImages(newImagesArr);
        }, 1);
      }, 1);

      controls.current.enabled = true;
      toggleCamera();
    }
    if (controls.current) {
      controls.current.update();
    }
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={2}
    />
  );
}
