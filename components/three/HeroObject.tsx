"use client";
import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Mesh, ShaderMaterial } from "three";
import type { SceneState } from "./CameraRig";
const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  void main() {
    vec3 p = position;
    p += normal * sin(p.y * 2.8 + uTime * 0.35) * sin(p.x * 2.0 + uTime * 0.2) * uMorph;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vPosition = p;
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragmentShader = `
  uniform float uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - abs(dot(n, vView)), 2.2);
    vec3 lavender = vec3(0.14, 0.36, 0.68);
    vec3 peach = vec3(0.87, 0.23, 0.30);
    vec3 cream = vec3(0.96, 0.97, 1.0);
    float band = sin(vPosition.y * 1.6 + vPosition.x * 1.1 + uColor) * 0.5 + 0.5;
    vec3 color = mix(lavender, peach, smoothstep(0.12, 0.85, band));
    color = mix(color, cream, smoothstep(0.55, 1.0, n.y * 0.5 + 0.5) * 0.75);
    float diffuse = max(dot(n, normalize(vec3(-0.4, 1.0, 1.6))), 0.0);
    color *= 0.73 + diffuse * 0.27;
    float spec = pow(max(dot(reflect(-normalize(vec3(-1.0, 2.0, 3.0)), n), vView), 0.0), 26.0);
    float strip = pow(max(dot(n, normalize(vec3(0.7, 0.0, 1.0))), 0.0), 24.0);
    color = mix(color, vec3(1.0, 0.98, 0.96), fresnel * 0.7 + spec * 0.55 + strip * 0.23);
    gl_FragColor = vec4(color, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
export function HeroObject({ state, mobile }: { state: MutableRefObject<SceneState>; mobile: boolean }) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMorph: { value: 0.08 }, uColor: { value: 0 }, uOpacity: { value: 1 } }), []);
  useFrame(({ clock }, delta) => {
    if (!mesh.current || !material.current) return;
    const target = state.current;
    const dt = Math.min(delta, 0.05);
    const responsiveScale = Math.min(viewport.width / 12.2, 1.2);
    mesh.current.position.x = MathUtils.damp(mesh.current.position.x, mobile ? 0 : target.x * responsiveScale, 4, dt);
    mesh.current.position.y = mobile ? target.y : MathUtils.damp(mesh.current.position.y, target.y, 4, dt);
    mesh.current.rotation.x = MathUtils.damp(mesh.current.rotation.x, 0.3 + target.rotation * 0.3, 4, dt);
    mesh.current.rotation.y = MathUtils.damp(mesh.current.rotation.y, -0.25 + target.rotation, 4, dt);
    mesh.current.rotation.z = -0.35 + Math.sin(clock.elapsedTime * 0.18) * 0.06;
    const scale = MathUtils.damp(mesh.current.scale.x, mobile ? target.scale : target.scale * responsiveScale, 4, dt);
    mesh.current.scale.setScalar(scale);
    material.current.uniforms.uTime.value = clock.elapsedTime;
    for (const [uniform, value] of [["uMorph", target.morph], ["uColor", target.color], ["uOpacity", target.opacity]] as const) {
      material.current.uniforms[uniform].value = MathUtils.damp(material.current.uniforms[uniform].value, value, 4, dt);
    }
  });
  return <mesh ref={mesh} position={[mobile ? 0 : 2.15, mobile ? -1.55 : 0.1, 0]} rotation={[0.3, -0.25, -0.35]} scale={mobile ? 0.7 : 1}>
    <torusKnotGeometry args={[1.3, 0.46, mobile ? 96 : 160, mobile ? 16 : 24, 2, 3]}/>
    <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent/>
  </mesh>;
}
