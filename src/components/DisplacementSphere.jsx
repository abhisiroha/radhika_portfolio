import React, { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from 'three';

// Import your shader files
// Note: You'll need to set up a way to import these GLSL files in your project
import fragmentShader from '../assets/displacement-sphere-fragment.glsl?raw';
import vertexShader from '../assets/displacement-sphere-vertex.glsl?raw';

const throttle = (func, timeFrame) => {
  let lastTime = 0;

  return function (...args) {
    const now = new Date();

    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
};

/**
 * A customizable 3D displacement sphere with interactive mouse tracking
 */
const DisplacementSphere = ({ 
  color = '#ffffff', 
  position = { x: 22, y: 16, z: 0 },
  scale = 24,
  detail = 128,
  rotationSpeed = 0.001,
  distortionSpeed = 0.00005,
  reduceMotion = false,
  className = '-z-10',
}) => {
  const canvasRef = useRef(null);
  const timeStart = useRef(Date.now());
  const [isInViewport, setIsInViewport] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  // Three.js objects
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const sphereRef = useRef(null);
  const materialRef = useRef(null);
  const geometryRef = useRef(null);
  const lightsRef = useRef([]);
  const uniformsRef = useRef(null);
  const mouseRef = useRef(new Vector2(0.8, 0.5));
  const rotationRef = useRef({ x: 0, y: 0 });

  // Clean up functions
  const cleanMaterial = (material) => {
    if (!material) return;
    material.dispose();
    
    // Only dispose objects that have a dispose method
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === 'object' && typeof value.dispose === 'function') {
        value.dispose();
      }
    }
  };

  const cleanScene = (scene) => {
    if (!scene) return;
    scene.traverse(object => {
      if (!object.isMesh) return;
      
      // Dispose geometry if it exists
      if (object.geometry && typeof object.geometry.dispose === 'function') {
        object.geometry.dispose();
      }
      
      // Dispose material if it exists
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => {
            if (mat && typeof mat.dispose === 'function') {
              cleanMaterial(mat);
            }
          });
        } else if (typeof object.material.dispose === 'function') {
          cleanMaterial(object.material);
        }
      }
    });
  };

  const cleanRenderer = (renderer) => {
    if (renderer && typeof renderer.dispose === 'function') {
      renderer.dispose();
    }
  };

  const removeLights = (lights) => {
    if (!lights || !lights.length) return;
    for (const light of lights) {
      if (light && light.parent) {
        light.parent.remove(light);
      }
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const { innerWidth, innerHeight } = window;
    
    // Setup renderer
    rendererRef.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    rendererRef.current.setSize(innerWidth, innerHeight);
    rendererRef.current.setPixelRatio(1);
    rendererRef.current.outputColorSpace = LinearSRGBColorSpace;

    // Setup camera
    cameraRef.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    cameraRef.current.position.z = 52;

    // Setup scene
    sceneRef.current = new Scene();

    // Setup material with shaders
    materialRef.current = new MeshPhongMaterial();
    materialRef.current.onBeforeCompile = shader => {
      uniformsRef.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { type: 'f', value: 0 } },
      ]);

      shader.uniforms = uniformsRef.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };

    // Create sphere geometry and mesh
    geometryRef.current = new SphereGeometry(scale, detail, detail);
    sphereRef.current = new Mesh(geometryRef.current, materialRef.current);
    sphereRef.current.position.set(position.x, position.y, position.z);
    sphereRef.current.modifier = Math.random();
    sceneRef.current.add(sphereRef.current);

    // Setup lights
    const dirLight = new DirectionalLight(0xffffff, 1.8);
    const ambientLight = new AmbientLight(0xffffff, 2.7);

    dirLight.position.set(100, 100, 200);
    
    lightsRef.current = [dirLight, ambientLight];
    lightsRef.current.forEach(light => sceneRef.current.add(light));

    // Setup intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef.current);

    // Render initial frame
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    // Cleanup function
    return () => {
      observer.disconnect();
      
      // Safer cleanup
      try {
        removeLights(lightsRef.current);
        
        // Directly dispose geometry and material
        if (geometryRef.current && typeof geometryRef.current.dispose === 'function') {
          geometryRef.current.dispose();
        }
        
        if (materialRef.current && typeof materialRef.current.dispose === 'function') {
          materialRef.current.dispose();
        }
        
        // Remove mesh from scene before cleaning
        if (sphereRef.current && sceneRef.current) {
          sceneRef.current.remove(sphereRef.current);
        }
        
        cleanRenderer(rendererRef.current);
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, [detail, position, scale]);

  // Handle window resize
  useEffect(() => {
    const handleResize = throttle(() => {
      if (!canvasRef.current) return;
      
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update renderer and sphere position on window resize
  useEffect(() => {
    if (!rendererRef.current || !cameraRef.current || !sphereRef.current) return;
    
    const { width, height } = windowSize;
    const adjustedHeight = height + height * 0.3;
    
    rendererRef.current.setSize(width, adjustedHeight);
    cameraRef.current.aspect = width / adjustedHeight;
    cameraRef.current.updateProjectionMatrix();

    // Adjust sphere position based on screen size
    if (width <= 696) { // mobile
      sphereRef.current.position.x = 14;
      sphereRef.current.position.y = 10;
    } else if (width <= 1040) { // tablet
      sphereRef.current.position.x = 18;
      sphereRef.current.position.y = 14;
    } else { // desktop
      sphereRef.current.position.x = position.x;
      sphereRef.current.position.y = position.y;
    }

    // Render a single frame when not animating
    if (reduceMotion && sceneRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [windowSize, reduceMotion, position]);

  // Mouse movement tracking
  useEffect(() => {
    if (reduceMotion || !isInViewport) return;

    const onMouseMove = throttle(event => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      rotationRef.current.x = position.y / 2;
      rotationRef.current.y = position.x / 2;
    }, 10);

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInViewport, reduceMotion]);

  // Animation loop
  useEffect(() => {
    if (!sphereRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (uniformsRef.current) {
        uniformsRef.current.time.value = distortionSpeed * (Date.now() - timeStart.current);
      }

      sphereRef.current.rotation.z += rotationSpeed;
      sphereRef.current.rotation.x = rotationRef.current.x;
      sphereRef.current.rotation.y = rotationRef.current.y;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else {
      // Render a single frame when not animating
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInViewport, reduceMotion, rotationSpeed, distortionSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default DisplacementSphere;