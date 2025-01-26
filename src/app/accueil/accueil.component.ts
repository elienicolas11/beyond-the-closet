import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  imports: [RouterModule], // Import RouterModule here

})
export class AccueilComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.init3DModels();
  }

  init3DModels(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById('model-container');
    if (container) {
      container.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    let model1: THREE.Object3D | null = null;
    let model2: THREE.Object3D | null = null;
    let model3: THREE.Object3D | null = null; // New model (closet)

    const loader = new GLTFLoader();

    // State to track rotation
    let isModel1Rotating = true;
    let isModel2Rotating = true;

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Load the first model
    loader.load(
      '/black_dress.glb',
      (gltf) => {
        model1 = gltf.scene;
        model1.position.set(-0.5, -3, 0); // Adjust position of the first model
        model1.scale.set(1.5, 1.5, 1.5);
        scene.add(model1);
      },
      undefined,
      (error) => {
        console.error('Error loading the first model:', error);
      }
    );

    // Load the second model
    loader.load(
      '/casual_outfit.glb',
      (gltf) => {
        model2 = gltf.scene;
        model2.position.set(-3.5, -2.2, 0);
        model2.scale.set(1.5, 1.5, 1.5);
        scene.add(model2);
      },
      undefined,
      (error) => {
        console.error('Error loading the second model:', error);
      }
    );

    // Load the third model (closet)
    loader.load(
      '/closet.glb',
      (gltf) => {
        model3 = gltf.scene;
        model3.position.set(1.5, -2, -3); // Adjust position of the closet model
        model3.scale.set(2, 2, 2); // Scale adjustment for the closet
        model3.rotation.y = -Math.PI/5.5;
        scene.add(model3);
      },
      undefined,
      (error) => {
        console.error('Error loading the third model (closet):', error);
      }
    );

    // Add event listener for mouse clicks
    window.addEventListener('click', (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster with camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with only the rotating models
      const intersects = raycaster.intersectObjects([model1!, model2!], true);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Toggle rotation state for the clicked model
        if (model1 && clickedObject.parent === model1) {
          isModel1Rotating = !isModel1Rotating;
        }
        if (model2 && clickedObject.parent === model2) {
          isModel2Rotating = !isModel2Rotating;
        }
      }
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the first model if it's rotating
      if (model1 && isModel1Rotating) {
        model1.rotation.y += 0.01;
      }

      // Rotate the second model if it's rotating
      if (model2 && isModel2Rotating) {
        model2.rotation.y -= 0.01;
      }

      // The closet model (model3) does not rotate

      renderer.render(scene, camera);
    };

    animate();
  }
}
