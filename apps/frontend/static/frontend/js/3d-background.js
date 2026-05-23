class ThreeDBackground {
  constructor() {
    this.canvas = document.getElementById('3d-bg-canvas');
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0f172a, 0);

    this.camera.position.z = 30;

    this.objects = [];
    this.mouse = { x: 0, y: 0 };

    this.initLights();
    this.createObjects();
    this.setupEventListeners();
    this.animate();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.4);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight1.position.set(20, 20, 20);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
    pointLight2.position.set(-20, -20, 20);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 0.6, 100);
    pointLight3.position.set(0, 20, -20);
    this.scene.add(pointLight3);
  }

  createObjects() {
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({
        color: [0x3b82f6, 0x8b5cf6, 0xec4899, 0x06b6d4, 0x10b981][i],
        shininess: 100,
        wireframe: false
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );

      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      cube.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        positionSpeed: {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1
        }
      };

      this.scene.add(cube);
      this.objects.push(cube);
    }

    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.IcosahedronGeometry(0.5, 4);
      const material = new THREE.MeshPhongMaterial({
        color: [0x3b82f6, 0x8b5cf6, 0xec4899][Math.floor(Math.random() * 3)],
        shininess: 50,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.3
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );

      sphere.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.008
        },
        initialY: sphere.position.y
      };

      this.scene.add(sphere);
      this.objects.push(sphere);
    }

    const torusGeometry = new THREE.TorusGeometry(8, 0.8, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
      wireframe: false
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -15;
    torus.userData = {
      rotationSpeed: { x: 0, y: 0.003, z: 0 }
    };
    this.scene.add(torus);
    this.objects.push(torus);
  }

  setupEventListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.objects.forEach((obj) => {
      if (obj.userData.rotationSpeed) {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
      }

      if (obj.userData.positionSpeed) {
        obj.position.x += obj.userData.positionSpeed.x;
        obj.position.y += obj.userData.positionSpeed.y;

        if (Math.abs(obj.position.x) > 30) {
          obj.userData.positionSpeed.x *= -1;
        }
        if (Math.abs(obj.position.y) > 30) {
          obj.userData.positionSpeed.y *= -1;
        }
      }

      if (obj.userData.initialY !== undefined) {
        obj.position.y = obj.userData.initialY + Math.sin(Date.now() * 0.001) * 5;
      }
    });

    this.camera.position.x = this.mouse.x * 3;
    this.camera.position.y = this.mouse.y * 3;

    this.renderer.render(this.scene, this.camera);
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThreeDBackground();
  });
} else {
  new ThreeDBackground();
}