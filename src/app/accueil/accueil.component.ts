import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib'; // Pour les modèles compressés
import { OrbitControls } from 'three-stdlib'; // Importer OrbitControls

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.init3DModel();
  }

  init3DModel(): void {
    // Créez la scène
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xcccccc); 

    // Configurez la caméra
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Configurez le rendu
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ajoutez une lumière
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Configurez les contrôles OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Ajoute un effet de fluidité au mouvement
    controls.dampingFactor = 0.1; // Réglage de la fluidité
    controls.enableZoom = true; // Permet le zoom avec la molette de la souris

    // Chargez le modèle .glb avec DRACOLoader
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('assets/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/base.glb', // Chemin vers le modèle GLB
      (gltf) => {
        const model = gltf.scene;
        scene.add(model); // Ajouter le modèle à la scène
        animate();
      },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modèle GLB :', error);
      }
    );

    // Fonction pour animer la scène
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); // Mise à jour des contrôles à chaque frame
      renderer.render(scene, camera);
    };
  }
}
