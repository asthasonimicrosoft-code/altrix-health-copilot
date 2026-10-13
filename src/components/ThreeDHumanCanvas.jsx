import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { organsData } from '../data/patientData';
import { sounds } from '../utils/audio';
import { Eye, RotateCcw, Play, Pause, Layers, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function ThreeDHumanCanvas({
  selectedOrgan,
  onSelectOrgan,
  systemFilter = 'all',
  onFilterChange,
  isLiveTelemetry = true
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const organMeshesRef = useRef({});
  const hotspotGroupRef = useRef(null);
  const scanPlaneRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const isInteractingRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetCameraPosRef = useRef(new THREE.Vector3(0, 1.2, 5.2));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 1.1, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 1.1, 0));
  const isAutoRotatingRef = useRef(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  // Sync state ref
  useEffect(() => {
    isAutoRotatingRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 2.2);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7000ff, 1.8);
    dirLight2.position.set(-3, 2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00e699, 1.5, 10);
    pointLight.position.set(0, 1.5, 1.5);
    scene.add(pointLight);

    // Group for entire human body
    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // 5. Construct Procedural Holographic Anatomy
    // Head / Cranium
    const headGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.3,
      metalness: 0.8
    });
    const headMesh = new THREE.Mesh(headGeo, wireMat);
    headMesh.position.set(0, 2.7, 0);
    headMesh.scale.set(0.9, 1.15, 0.95);
    bodyGroup.add(headMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 16, 4, true);
    const neckMesh = new THREE.Mesh(neckGeo, wireMat);
    neckMesh.position.set(0, 2.2, 0);
    bodyGroup.add(neckMesh);

    // Torso / Chest & Ribcage
    const chestGeo = new THREE.CylinderGeometry(0.62, 0.5, 1.2, 24, 12, true);
    const chestMesh = new THREE.Mesh(chestGeo, wireMat);
    chestMesh.position.set(0, 1.45, 0);
    chestMesh.scale.set(1.15, 1, 0.72);
    bodyGroup.add(chestMesh);

    // Pelvis / Hips
    const pelvisGeo = new THREE.CylinderGeometry(0.5, 0.45, 0.55, 20, 6, true);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, wireMat);
    pelvisMesh.position.set(0, 0.65, 0);
    pelvisMesh.scale.set(1.05, 1, 0.75);
    bodyGroup.add(pelvisMesh);

    // Limbs - Upper Arms & Forearms
    const armGeo = new THREE.CylinderGeometry(0.12, 0.09, 1.1, 12, 8, true);
    const leftArm = new THREE.Mesh(armGeo, wireMat);
    leftArm.position.set(-0.85, 1.35, 0);
    leftArm.rotation.z = 0.12;
    bodyGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, wireMat);
    rightArm.position.set(0.85, 1.35, 0);
    rightArm.rotation.z = -0.12;
    bodyGroup.add(rightArm);

    // Legs - Thighs & Calves
    const legGeo = new THREE.CylinderGeometry(0.19, 0.12, 1.8, 16, 12, true);
    const leftLeg = new THREE.Mesh(legGeo, wireMat);
    leftLeg.position.set(-0.35, -0.45, 0);
    bodyGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, wireMat);
    rightLeg.position.set(0.35, -0.45, 0);
    bodyGroup.add(rightLeg);

    // Anatomical Spine Column
    const spineGroup = new THREE.Group();
    for (let i = 0; i < 18; i++) {
      const vertGeo = new THREE.TorusGeometry(0.09 - i * 0.002, 0.02, 8, 16);
      const vertMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        wireframe: true
      });
      const vertebra = new THREE.Mesh(vertGeo, vertMat);
      vertebra.position.set(0, 0.5 + i * 0.095, -0.06);
      vertebra.rotation.x = Math.PI / 2;
      spineGroup.add(vertebra);
    }
    bodyGroup.add(spineGroup);
    organMeshesRef.current.spine = spineGroup;

    // Internal 3D Organs
    // 1. Brain Mesh
    const brainGroup = new THREE.Group();
    const brainLobeGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const brainMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const leftBrain = new THREE.Mesh(brainLobeGeo, brainMat);
    leftBrain.position.set(-0.09, 0, 0);
    leftBrain.scale.set(0.85, 1, 1.15);
    const rightBrain = new THREE.Mesh(brainLobeGeo, brainMat);
    rightBrain.position.set(0.09, 0, 0);
    rightBrain.scale.set(0.85, 1, 1.15);
    brainGroup.add(leftBrain, rightBrain);
    brainGroup.position.set(0, 2.7, 0);
    bodyGroup.add(brainGroup);
    organMeshesRef.current.brain = brainGroup;

    // 2. Heart Mesh (Pulsing cardiac organ)
    const heartGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff1744,
      emissive: 0xff3b69,
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.position.set(0.12, 1.48, 0.12);
    bodyGroup.add(heartMesh);
    organMeshesRef.current.heart = heartMesh;

    // 3. Lungs (Paired lobes)
    const lungGroup = new THREE.Group();
    const lungGeo = new THREE.CapsuleGeometry(0.16, 0.38, 8, 12);
    const lungMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.65,
      wireframe: true
    });
    const leftLung = new THREE.Mesh(lungGeo, lungMat);
    leftLung.position.set(-0.24, 0, 0.05);
    leftLung.rotation.z = -0.15;
    const rightLung = new THREE.Mesh(lungGeo, lungMat);
    rightLung.position.set(0.24, 0, 0.05);
    rightLung.rotation.z = 0.15;
    lungGroup.add(leftLung, rightLung);
    lungGroup.position.set(0, 1.5, 0);
    bodyGroup.add(lungGroup);
    organMeshesRef.current.lungs = lungGroup;

    // 4. Liver Mesh
    const liverGeo = new THREE.ConeGeometry(0.26, 0.32, 8);
    const liverMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.75
    });
    const liverMesh = new THREE.Mesh(liverGeo, liverMat);
    liverMesh.position.set(-0.22, 1.05, 0.1);
    liverMesh.rotation.z = Math.PI / 2.8;
    bodyGroup.add(liverMesh);
    organMeshesRef.current.liver = liverMesh;

    // 5. Kidneys
    const kidneyGroup = new THREE.Group();
    const kidneyGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const kidneyMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8
    });
    const leftKidney = new THREE.Mesh(kidneyGeo, kidneyMat);
    leftKidney.position.set(-0.25, 0, -0.08);
    leftKidney.scale.set(1.2, 1.5, 0.8);
    const rightKidney = new THREE.Mesh(kidneyGeo, kidneyMat);
    rightKidney.position.set(0.25, 0, -0.08);
    rightKidney.scale.set(1.2, 1.5, 0.8);
    kidneyGroup.add(leftKidney, rightKidney);
    kidneyGroup.position.set(0, 0.85, 0);
    bodyGroup.add(kidneyGroup);
    organMeshesRef.current.kidneys = kidneyGroup;

    // Particle Point Cloud Matrix for Hologram effect
    const particleCount = 2200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.45;
      
      const y = (Math.random() * 4.2) - 1.2;
      let radiusSpread = 0.55;
      if (y > 2.2) radiusSpread = 0.38; // head
      else if (y > 1.0) radiusSpread = 0.65; // torso
      else if (y > 0.4) radiusSpread = 0.48; // hips
      else radiusSpread = 0.35; // legs

      const px = Math.cos(theta) * Math.sin(phi) * radiusSpread * (0.4 + Math.random() * 0.6);
      const py = y;
      const pz = Math.sin(theta) * Math.sin(phi) * radiusSpread * 0.55 * (0.4 + Math.random() * 0.6);

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
      colors[i * 3 + 2] = 0.95 + Math.random() * 0.05;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    bodyGroup.add(particleCloud);

    // Holographic Scanning Beam
    const scanPlaneGeo = new THREE.RingGeometry(0.01, 1.1, 32);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.rotation.x = Math.PI / 2;
    scanPlane.position.y = 1.0;
    bodyGroup.add(scanPlane);
    scanPlaneRef.current = scanPlane;

    // Interactive 3D Hotspot Pins
    const hotspotGroup = new THREE.Group();
    hotspotGroupRef.current = hotspotGroup;
    bodyGroup.add(hotspotGroup);

    Object.values(organsData).forEach((organ) => {
      const pinAnchor = new THREE.Group();
      pinAnchor.position.set(...organ.position);
      pinAnchor.userData = { organId: organ.id, organName: organ.name };

      // Center glowing beacon sphere
      const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(organ.color),
        transparent: true,
        opacity: 0.95
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.userData = { organId: organ.id };
      pinAnchor.add(beaconMesh);

      // Ripple Ring
      const ringGeo = new THREE.RingGeometry(0.09, 0.12, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(organ.color),
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { isPulseRing: true };
      pinAnchor.add(ringMesh);

      hotspotGroup.add(pinAnchor);
    });

    // 6. Raycasting for organ hotspot selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotGroup.children, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== hotspotGroup) {
          root = root.parent;
        }
        if (root.userData?.organId) {
          setHoveredOrgan(root.userData.organId);
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredOrgan(null);
      renderer.domElement.style.cursor = 'grab';
    };

    const handlePointerDown = (e) => {
      isInteractingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotGroup.children, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== hotspotGroup) {
          root = root.parent;
        }
        if (root.userData?.organId) {
          sounds.organSelect();
          onSelectOrgan(root.userData.organId);
        }
      }
    };

    const handlePointerUp = () => {
      isInteractingRef.current = false;
      if (renderer.domElement) {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleDragRotate = (e) => {
      if (!isInteractingRef.current) return;
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      bodyGroup.rotation.y += deltaX * 0.008;
      // Clamp vertical tilt
      bodyGroup.rotation.x = Math.max(-0.25, Math.min(0.25, bodyGroup.rotation.x + deltaY * 0.005));
    };

    const handleWheelZoom = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0025;
      camera.position.z = Math.max(2.6, Math.min(7.5, camera.position.z + zoomDelta));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointermove', handleDragRotate);
    domElement.addEventListener('wheel', handleWheelZoom, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let clock = new THREE.Clock();
    let scanDirection = 1;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle auto-rotation if enabled and not dragging
      if (isAutoRotatingRef.current && !isInteractingRef.current) {
        bodyGroup.rotation.y += 0.004;
      }

      // Heart pulsation animation (synced with realistic heart beat)
      if (organMeshesRef.current.heart) {
        const pulse = 1 + Math.sin(elapsedTime * 6.8) * 0.08 + Math.sin(elapsedTime * 13.6) * 0.03;
        organMeshesRef.current.heart.scale.set(pulse, pulse, pulse);
      }

      // Lung gentle breathing respiration cycle
      if (organMeshesRef.current.lungs) {
        const breath = 1 + Math.sin(elapsedTime * 1.8) * 0.05;
        organMeshesRef.current.lungs.scale.set(breath, 1, breath);
      }

      // Brain neural electric shimmer
      if (organMeshesRef.current.brain) {
        const brainShimmer = 0.7 + Math.sin(elapsedTime * 3.2) * 0.3;
        organMeshesRef.current.brain.children.forEach(lobe => {
          if (lobe.material) lobe.material.emissiveIntensity = brainShimmer;
        });
      }

      // Vertical holographic laser scan plane
      if (scanPlaneRef.current) {
        scanPlaneRef.current.position.y += 0.015 * scanDirection;
        if (scanPlaneRef.current.position.y > 3.2) {
          scanDirection = -1;
        } else if (scanPlaneRef.current.position.y < -0.8) {
          scanDirection = 1;
        }
      }

      // Hotspot pulse ripples
      if (hotspotGroupRef.current) {
        hotspotGroupRef.current.children.forEach(anchor => {
          anchor.children.forEach(child => {
            if (child.userData?.isPulseRing) {
              const ringScale = 1 + ((elapsedTime * 1.6) % 1) * 0.8;
              child.scale.set(ringScale, ringScale, 1);
              child.material.opacity = Math.max(0, 0.7 - ((elapsedTime * 1.6) % 1) * 0.7);
            }
          });
        });
      }

      // Smooth camera interpolation towards selected organ target
      camera.position.lerp(targetCameraPosRef.current, 0.045);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.045);
      camera.lookAt(currentLookAtRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handleDragRotate);
      domElement.removeEventListener('wheel', handleWheelZoom);
      renderer.dispose();
    };
  }, []);

  // Update target camera based on selected organ
  useEffect(() => {
    if (selectedOrgan && organsData[selectedOrgan]) {
      const pos = organsData[selectedOrgan].position;
      targetLookAtRef.current.set(pos[0], pos[1], pos[2]);
      targetCameraPosRef.current.set(pos[0], pos[1] + 0.1, 2.9);
      setAutoRotate(false);
    } else {
      targetLookAtRef.current.set(0, 1.1, 0);
      targetCameraPosRef.current.set(0, 1.2, 5.2);
    }
  }, [selectedOrgan]);

  // Handle system filter highlighting
  useEffect(() => {
    const meshes = organMeshesRef.current;
    if (!meshes) return;

    Object.keys(meshes).forEach((key) => {
      const obj = meshes[key];
      if (!obj) return;

      let isHighlight = true;
      if (systemFilter === 'cardio' && key !== 'heart') isHighlight = false;
      if (systemFilter === 'neural' && key !== 'brain' && key !== 'spine') isHighlight = false;
      if (systemFilter === 'metabolic' && key !== 'liver' && key !== 'kidneys') isHighlight = false;
      if (systemFilter === 'respiratory' && key !== 'lungs') isHighlight = false;

      obj.visible = isHighlight;
    });
  }, [systemFilter]);

  const handleResetCamera = () => {
    sounds.click();
    onSelectOrgan(null);
    targetLookAtRef.current.set(0, 1.1, 0);
    targetCameraPosRef.current.set(0, 1.2, 5.2);
    setAutoRotate(true);
  };

  const toggleAutoRotate = () => {
    sounds.click();
    setAutoRotate(!autoRotate);
  };

  return (
    <div className="relative w-full h-[540px] lg:h-[640px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#080d1a] via-[#050811] to-[#03050a] border border-slate-800/80 shadow-2xl">
      {/* Background Holographic Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Top Left Status & Layer Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-glow-cyan/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>DIGITAL TWIN V4.2 • 3D HOLOGRAPHIC SCAN</span>
        </div>

        {/* Anatomical System Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 backdrop-blur-lg border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Systems', icon: Layers },
            { id: 'cardio', label: 'Cardio', icon: Activity },
            { id: 'neural', label: 'Neural', icon: Sparkles },
            { id: 'metabolic', label: 'Metabolic', icon: ShieldCheck },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.click();
                onFilterChange(tab.id);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                systemFilter === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-cyan-200 border border-cyan-400/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleAutoRotate}
          title={autoRotate ? "Pause 3D Orbit" : "Resume 3D Orbit"}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
            autoRotate 
              ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' 
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Hovered / Active Organ Tooltip HUD */}
      {hoveredOrgan && organsData[hoveredOrgan] && (
        <div className="absolute top-20 right-4 z-10 pointer-events-none p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-glow-cyan/30 text-xs w-64 animate-fade-in">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="font-semibold text-slate-100">{organsData[hoveredOrgan].name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {organsData[hoveredOrgan].score}/100
            </span>
          </div>
          <p className="mt-1.5 text-slate-400 text-[11px] leading-relaxed">
            {organsData[hoveredOrgan].statusText}
          </p>
          <div className="mt-2 text-cyan-300 font-mono text-[10px] flex items-center gap-1">
            <Eye className="w-3 h-3" /> Click to inspect clinical markers & AI review
          </div>
        </div>
      )}

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>

      {/* Bottom Floating Organ Selector Pill Bar */}
      <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-center pointer-events-auto">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 shadow-2xl max-w-2xl">
          <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            ORGANS:
          </span>
          {Object.values(organsData).map((organ) => {
            const isSelected = selectedOrgan === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => {
                  sounds.organSelect();
                  onSelectOrgan(isSelected ? null : organ.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: organ.color }}></span>
                <span>{organ.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({organ.score})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
