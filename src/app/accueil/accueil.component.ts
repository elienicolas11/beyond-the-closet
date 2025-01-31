import { Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  imports: [RouterModule, CommonModule], 
})
export class AccueilComponent implements OnInit {
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.init3DModels();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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

    // Ajout de lumières
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    let model1: THREE.Object3D | null = null;
    let model2: THREE.Object3D | null = null;
    let model3: THREE.Object3D | null = null; 

    const loader = new GLTFLoader();

    // États pour la rotation des modèles
    let isModel1Rotating = true;
    let isModel2Rotating = true;

    // Détection des clics sur les modèles
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Chargement des modèles 3D
    loader.load('/black_dress.glb', (gltf) => {
      model1 = gltf.scene;
      model1.position.set(-0.5, -3, 0);
      model1.scale.set(1.5, 1.5, 1.5);
      scene.add(model1);
    });

    loader.load('/casual_outfit.glb', (gltf) => {
      model2 = gltf.scene;
      model2.position.set(-3.5, -2.2, 0);
      model2.scale.set(1.5, 1.5, 1.5);
      scene.add(model2);
    });

    loader.load('/closet.glb', (gltf) => {
      model3 = gltf.scene;
      model3.position.set(1.5, -2, -3);
      model3.scale.set(2, 2, 2);
      model3.rotation.y = -Math.PI / 5.5;
      scene.add(model3);
    });

    // Gestion des clics pour arrêter la rotation
    window.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([model1!, model2!], true);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (model1 && clickedObject.parent === model1) isModel1Rotating = !isModel1Rotating;
        if (model2 && clickedObject.parent === model2) isModel2Rotating = !isModel2Rotating;
      }
    });

    // Ajustement de la scène lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation des modèles
    const animate = () => {
      requestAnimationFrame(animate);
      if (model1 && isModel1Rotating) model1.rotation.y += 0.01;
      if (model2 && isModel2Rotating) model2.rotation.y -= 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }
}
