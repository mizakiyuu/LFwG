"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CommunityScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 1.2, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(1.45, -0.2, 0);
    group.scale.setScalar(1.18);
    scene.add(group);

    const palette = [0x2563eb, 0x2dd4bf, 0xfb5d5d, 0xfbbf24, 0x8b5cf6];
    const geometry = new THREE.IcosahedronGeometry(0.36, 1);
    const members: THREE.Mesh[] = [];

    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 2.1 + (i % 4) * 0.28;
      const material = new THREE.MeshStandardMaterial({
        color: palette[i % palette.length],
        roughness: 0.36,
        metalness: 0.22,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.2, Math.sin(angle) * radius * 0.35);
      mesh.userData.speed = 0.35 + i * 0.018;
      group.add(mesh);
      members.push(mesh);
    }

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const line = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(line);

    const center = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.72, 0.18, 120, 12),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.2,
        metalness: 0.35,
      }),
    );
    group.add(center);

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const keyLight = new THREE.PointLight(0xfff2c7, 20, 14);
    keyLight.position.set(2.8, 4, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x2dd4bf, 12, 12);
    rimLight.position.set(-4, -1, 2);
    scene.add(rimLight);

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animationId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.16;
      group.rotation.x = Math.sin(elapsed * 0.4) * 0.08;
      center.rotation.x = elapsed * 0.5;
      center.rotation.y = elapsed * 0.7;

      members.forEach((mesh, index) => {
        const pulse = Math.sin(elapsed * mesh.userData.speed + index) * 0.08;
        mesh.scale.setScalar(1 + pulse);
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.01;
      });

      frame += 1;
      if (frame % 2 === 0) {
        const points: number[] = [];
        for (let i = 0; i < members.length; i += 1) {
          const current = members[i].position;
          const next = members[(i + 1) % members.length].position;
          points.push(current.x, current.y, current.z, next.x, next.y, next.z);
        }
        lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
      }

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
      lineGeometry.dispose();
      geometry.dispose();
      members.forEach((mesh) => {
        (mesh.material as THREE.Material).dispose();
      });
      (center.geometry as THREE.BufferGeometry).dispose();
      (center.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
