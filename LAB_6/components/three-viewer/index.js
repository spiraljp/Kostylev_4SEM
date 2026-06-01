import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeViewer {
    constructor(container, modelPath) {
        this.container = container;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.init();
        this.loadModel();
        this.animate();
    }

    init() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 5);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;
        this.controls.enableZoom = true;

        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(2, 5, 3);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        const fillLight = new THREE.PointLight(0x4466cc, 0.5);
        fillLight.position.set(-2, 1, 3);
        this.scene.add(fillLight);

        const gridHelper = new THREE.GridHelper(8, 20, 0x88aaff, 0x335588);
        this.scene.add(gridHelper);
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(this.modelPath,
            (gltf) => {
                const model = gltf.scene;
                model.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                this.scene.add(model);
            },
            undefined,
            (error) => {
                console.warn('3D-модель не загружена, показываем куб:', error);
                const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
                const material = new THREE.MeshStandardMaterial({ color: 0x3a86ff, metalness: 0.7 });
                const cube = new THREE.Mesh(geometry, material);
                cube.castShadow = true;
                this.scene.add(cube);
            }
        );
    }

    animate() {
        const animateFrame = () => {
            requestAnimationFrame(animateFrame);
            this.controls.update();
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };
        animateFrame();
    }

    resize() {
        if (!this.container) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    dispose() {
        if (this.renderer) this.renderer.dispose();
        if (this.container) this.container.innerHTML = '';
        if (this.controls) this.controls.dispose();
    }
}
