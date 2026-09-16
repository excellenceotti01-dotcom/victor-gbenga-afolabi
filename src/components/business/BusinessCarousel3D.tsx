import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import type { BusinessRecord } from "./types";

type BusinessCarousel3DProps = {
  businesses: readonly BusinessRecord[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onActivate: (business: BusinessRecord) => void;
};

type CarouselCardProps = {
  business: BusinessRecord;
  index: number;
  activeIndex: number;
  texture: THREE.Texture;
  onSelect: (index: number) => void;
  onActivate: (business: BusinessRecord) => void;
};

function CarouselCard({
  business,
  index,
  activeIndex,
  texture,
  onSelect,
  onActivate,
}: CarouselCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const imageMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const veilMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const target = useMemo(() => ({
    x: offset * 0.28,
    y: -offset * 3.05,
    z: -distance * 1.85,
    rotationY: distance === 0 ? -0.32 : -0.42,
    rotationZ: -0.055 + offset * -0.065,
    scale: distance === 0 ? 1.12 : distance === 1 ? 0.73 : distance === 2 ? 0.5 : 0.34,
    opacity: distance === 0 ? 1 : distance === 1 ? 0.68 : distance === 2 ? 0.35 : 0.16,
    veil: distance === 0 ? 0.08 : distance === 1 ? 0.28 : distance === 2 ? 0.48 : 0.66,
  }), [distance, offset]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    const imageMaterial = imageMaterialRef.current;
    const veilMaterial = veilMaterialRef.current;
    if (!group || !imageMaterial || !veilMaterial) return;

    const tweens = [
      gsap.to(group.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.15,
        ease: "power3.out",
        overwrite: true,
      }),
      gsap.to(group.rotation, {
        y: target.rotationY,
        z: target.rotationZ,
        duration: 1.15,
        ease: "power3.out",
        overwrite: true,
      }),
      gsap.to(group.scale, {
        x: target.scale,
        y: target.scale,
        z: target.scale,
        duration: 1.15,
        ease: "power3.out",
        overwrite: true,
      }),
      gsap.to(imageMaterial, {
        opacity: target.opacity,
        duration: 0.9,
        ease: "power2.out",
        overwrite: true,
      }),
      gsap.to(veilMaterial, {
        opacity: target.veil,
        duration: 0.9,
        ease: "power2.out",
        overwrite: true,
      }),
    ];

    return () => tweens.forEach((tween) => tween.kill());
  }, [target]);

  return (
    <group
      ref={groupRef}
      position={[target.x, target.y, target.z]}
      rotation={[0, target.rotationY, target.rotationZ]}
      scale={target.scale}
      onPointerDown={(event) => {
        event.stopPropagation();
        if (index === activeIndex) onActivate(business);
        else onSelect(index);
      }}
    >
      <mesh>
        <planeGeometry args={[4.4, 2.72, 1, 1]} />
        <meshBasicMaterial ref={imageMaterialRef} map={texture} side={THREE.DoubleSide} transparent opacity={target.opacity} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[4.4, 2.72, 1, 1]} />
        <meshBasicMaterial ref={veilMaterialRef} color="#050505" transparent opacity={target.veil} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CarouselScene(props: BusinessCarousel3DProps) {
  const textures = useLoader(THREE.TextureLoader, props.businesses.map((business) => business.selectorImage));

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  return (
    <group position={[0.35, 0, 0]}>
      {props.businesses.map((business, index) => (
        <CarouselCard
          key={business.id}
          business={business}
          index={index}
          activeIndex={props.activeIndex}
          texture={textures[index]}
          onSelect={props.onSelect}
          onActivate={props.onActivate}
        />
      ))}
    </group>
  );
}

export default function BusinessCarousel3D(props: BusinessCarousel3DProps) {
  const activeBusiness = props.businesses[props.activeIndex];

  return (
    <div className="business-carousel-3d" aria-label="Business carousel">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <CarouselScene {...props} />
        </Suspense>
      </Canvas>
      <button
        type="button"
        className="business-carousel-3d__active-hit"
        aria-label={`Explore ${activeBusiness.name}`}
        onClick={() => props.onActivate(activeBusiness)}
      />
    </div>
  );
}
