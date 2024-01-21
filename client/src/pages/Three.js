import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { capsule_model } from '../assets';

const Three = () => {
  const Model = () => {
    const gltf = useLoader(GLTFLoader, './capsule_light.glb');
    return (
      <>
        <primitive
          object={gltf.scene}
          scale={[10, 10, 10]}
          position={[0, -10, -10]}
        />
      </>
    );
  };
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ widht: 'inherit', height: 'inherit' }}>
        <Canvas>
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Three;
