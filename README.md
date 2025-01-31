# **👗 Beyond The Closet - Planificateur de tenues interactif**  

## **📖 Description du projet**  
**Beyond The Closet** est une **application web interactive** qui aide les utilisateurs à **composer et organiser leurs tenues** sans effort. Ce projet est conçu pour ceux qui ont du mal à associer des vêtements ou qui veulent **planifier leurs looks à l'avance** pour des événements ou des vacances.  

Avec une **interface intuitive**, l'utilisateur peut :  
✅ **Sélectionner des vêtements et accessoires** parmi différentes catégories.  
✅ **Composer des tenues** avec un affichage clair.  
✅ **Capturer et sauvegarder** ses ensembles.  
✅ **Gagner du temps** en retrouvant facilement ses looks enregistrés.  

L'application utilise Angular, Three.js et html2canvas. Three.js permet d'ajouter un design 3D immersif (éléments en 3D comme le cintre, le stand, etc.), mais l'objectif n'est pas de visualiser les vêtements en 3D. L'application est avant tout un outil de planification de looks
---

## **🛠️ Technologies & Bibliothèques utilisées**  

### **📌 Frontend :**  
- **Angular** *(Framework JS moderne pour le développement web)*  
- **TypeScript** *(Langage robuste avec typage statique)*  
- **SCSS / CSS3** *(Pour un design élégant et fluide)*  
- **HTML5** *(Structuration des composants)*  
- **RouterModule** *(Gestion des routes dans Angular)*  

### **📸 Capture et Sauvegarde des tenues :**  
- **html2canvas** *(Convertit l'affichage en image téléchargeable)*  

### **🎨 Effets 3D & Graphismes :**  
- **Three.js** *(Ajoute un design moderne en 3D à l’interface)*  
- **GLTFLoader** *(Chargement des modèles .glb et .gltf pour le décor et les éléments interactifs comme le cintre et le stand)*  

### **🖼️ Interface utilisateur :**  
- **Affichage organisé des vêtements et accessoires** *(Par catégories)*  
- **Sélection et combinaison facile** *(Clic pour ajouter à la tenue)*  
- **Bouton "Sauvegarder la tenue"** *(Capture et télécharge l’image de la tenue)*  

---

## **🖥️ Installation & Exécution**  

### **1️⃣ Prérequis**  
Avant de commencer, assure-toi d'avoir installé :  
- **Node.js** *(Version 16+ recommandée)*  
- **Angular CLI** *(Installation : `npm install -g @angular/cli`)*  

### **2️⃣ Cloner le projet**  
```bash
git clone https://github.com/ton-repo/beyond-the-closet.git
cd beyond-the-closet
```  

### **3️⃣ Installer les dépendances**  
```bash
npm install
```  

### **4️⃣ Lancer l’application**  
```bash
ng serve
```
**🔹 Ouvre l’URL** `http://localhost:4200/` dans ton navigateur.  

---

## **🎮 Fonctionnalités principales**  

### **👕 Sélection & Composition des tenues**  
✔ **Choix des vêtements** (Hauts, Bas, Chaussures, Sacs...).  
✔ **Affichage clair et organisé** des items sélectionnés.  
✔ **Planification des tenues pour différents jours**.  
✔ **Ajout/Suppression rapide d'éléments à la tenue**.  

### **🖼️ Capture & Enregistrement des tenues**  
✔ **Bouton "Sauvegarder"** qui capture l’image de la tenue via **html2canvas**.  
✔ **Stockage sous forme d'image** pour consultation future.  
✔ **Organisation par jour, événement ou occasion** *(ex : tenue de vacances du lundi...)*.  

### **📱 Interface simple & intuitive**  
✔ **Glisser-déposer pour organiser les éléments**.  
✔ **Interface élégante avec icônes minimalistes**.  
✔ **Aperçu clair pour faciliter la visualisation**.  

---

## **🚀 Améliorations futures**  
🔹 **Ajout d’un calendrier pour organiser ses tenues sur plusieurs jours**.  
🔹 **Sauvegarde des looks dans une base de données pour un accès prolongé**.  
🔹 **Suggestions automatiques d’outfits basées sur l’IA**.  
🔹 **Possibilité de partager ses tenues sur les réseaux sociaux**.  

---

## **💡 Conclusion**  
**Beyond The Closet** n’est pas juste une application de mode, c’est **un véritable outil d’organisation**. Plus besoin de **perdre du temps** à choisir quoi porter chaque jour : sélectionne, sauvegarde et profite pleinement de tes vacances ou événements sans stress.  

✨ **Simplifie ton quotidien en planifiant tes tenues à l’avance  !** ✨  
