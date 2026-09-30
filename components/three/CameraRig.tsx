"use client";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import type { MutableRefObject } from "react";
export type SceneState = { x: number; y: number; scale: number; rotation: number; morph: number; color: number; opacity: number; cameraZ: number };
export function CameraRig({ state, mobile }: { state: MutableRefObject<SceneState>; mobile: boolean }) {
  useFrame(({ camera, pointer }, delta) => {
    const dt = Math.min(delta, 0.05);
    camera.position.z = MathUtils.damp(camera.position.z, state.current.cameraZ, 4, dt);
    camera.position.x = MathUtils.damp(camera.position.x, mobile ? 0 : pointer.x * 0.13, 3, dt);
    camera.position.y = MathUtils.damp(camera.position.y, mobile ? 0 : pointer.y * 0.1, 3, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}
