import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faRedo, faSave } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-fitting-room',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './fitting-room.component.html',
  styleUrls: ['./fitting-room.component.css'],
})
export class FittingRoomComponent implements OnInit {
  tenue: string | null = null; // Tenue sélectionnée depuis la route
  showInitialImages: boolean = true; // Contrôle de l'affichage initial des images
  
  selectedIndexes: { [key: string]: number | null } = {
    haut: null,
    bas: null,
    chaussure: null,
    sac: null,
  };
  
  // Centralized default values
  private readonly defaultSelections = {
    selectedCategory: 'haut' as 'haut' | 'bas' | 'chaussure' | 'sac',
    selectedTop: '',
    selectedBottom: '',
    selectedShoe: '',
    selectedBag: '',
    selectedTopLabel: '',
    selectedBottomLabel: '',
    selectedShoeLabel: '',
    selectedBagLabel: '',
  };

  // Sélections dynamiques
  selectedCategory = this.defaultSelections.selectedCategory;
  selectedTop = this.defaultSelections.selectedTop;
  selectedBottom = this.defaultSelections.selectedBottom;
  selectedShoe = this.defaultSelections.selectedShoe;
  selectedBag = this.defaultSelections.selectedBag;
  selectedTopLabel = this.defaultSelections.selectedTopLabel;
  selectedBottomLabel = this.defaultSelections.selectedBottomLabel;
  selectedShoeLabel = this.defaultSelections.selectedShoeLabel;
  selectedBagLabel = this.defaultSelections.selectedBagLabel;

  slideBarItems: { image: string; label: string }[] = [];
  categories = {
    haut: [
      { image: 'img/clothes/haut1.png', label: 'haut 1' },
      { image: 'img/clothes/haut2.png', label: 'haut 2' },
      { image: 'img/clothes/haut3.png', label: 'haut 3' },
      { image: 'img/clothes/haut4.png', label: 'haut 4' },
      { image: 'img/clothes/haut5.png', label: 'haut 5' },
      { image: 'img/clothes/haut6.png', label: 'haut 6' },
    ],
    bas: [
      { image: 'img/clothes/bas1.png', label: 'bas 1' },
      { image: 'img/clothes/bas2.png', label: 'bas 2' },
      { image: 'img/clothes/bas3.png', label: 'bas 3' },
      { image: 'img/clothes/bas4.png', label: 'bas 4' },
      { image: 'img/clothes/bas5.png', label: 'bas 5' },
      { image: 'img/clothes/bas6.png', label: 'bas 6' },
    ],
    chaussure: [
      { image: 'img/clothes/chaussure1.png', label: 'Chaussure 1' },
      { image: 'img/clothes/chaussure2.png', label: 'Chaussure 2' },
      { image: 'img/clothes/chaussure3.png', label: 'Chaussure 3' },
      { image: 'img/clothes/chaussure4.png', label: 'Chaussure 4' },
    ],
    sac: [
      { image: 'img/clothes/sac1.png', label: 'Sac 1' },
      { image: 'img/clothes/sac2.png', label: 'Sac 2' },
      { image: 'img/clothes/sac3.png', label: 'Sac 3' },
      { image: 'img/clothes/sac4.png', label: 'Sac 4' },
      { image: 'img/clothes/sac5.png', label: 'Sac 5' },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private library: FaIconLibrary
  ) {
    library.addIcons(faArrowLeft, faRedo, faSave);
  }

  ngOnInit(): void {
    // Récupérer la tenue depuis la route
    this.tenue = this.route.snapshot.paramMap.get('tenue');
    this.updateSlideBarItems();
  }

  // Action pour quitter
  onExit() {
    console.log('Exit button clicked');
    this.location.back();
  }

  // Action pour redémarrer
  onRestart() {
    console.log('Restart button clicked');
    Object.assign(this, this.defaultSelections); 
    this.selectedIndexes = {
      haut: null,
      bas: null,
      chaussure: null,
      sac: null,
    };
    this.showInitialImages = true;
    this.updateSlideBarItems();
    console.log('Application reset to default values.');
  }

  onSave() {
    console.log('Save button clicked');
    const elementToCapture = document.querySelector('.center-container') as HTMLElement;
  
    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        const minWidth = 800; // Largeur minimale
        const maxWidth = 1200; // Largeur maximale
  
        let finalWidth = canvas.width;
        let finalHeight = canvas.height;
  
        if (finalWidth < minWidth) {
          finalHeight = (minWidth / finalWidth) * finalHeight;
          finalWidth = minWidth;
        } else if (finalWidth > maxWidth) {
          finalHeight = (maxWidth / finalWidth) * finalHeight;
          finalWidth = maxWidth;
        }
  
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const formattedTime = now
          .toTimeString()
          .split(' ')[0]
          .replace(/:/g, '-'); // HH-MM-SS
        const fileName = `BTC_${formattedDate}_${formattedTime}.png`;
  
        const finalCanvas = document.createElement('canvas');
        const ctx = finalCanvas.getContext('2d')!;
        finalCanvas.width = finalWidth;
        finalCanvas.height = finalHeight + 120; 
  
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  
        ctx.font = '64px Pacifico'; 
        ctx.fillStyle = '#515779'; 
        ctx.textAlign = 'center';
        ctx.shadowColor = 'whitesmoke'; 
        ctx.shadowBlur = 4; 
        ctx.shadowOffsetX = 2; 
        ctx.shadowOffsetY = 2; 
        ctx.fillText(this.tenue || 'Tenue', finalCanvas.width / 2, 80); // Ajustez la valeur Y pour le titre
  
        ctx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          120, 
          finalWidth,
          finalHeight
        );
  
        const image = finalCanvas.toDataURL('image/png');
  
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();
  
        alert(`Votre tenue a été sauvegardée avec succès sous le nom : ${fileName}`);
      }).catch((error) => {
        console.error('Erreur lors de la capture de l\'élément :', error);
        alert('Erreur lors de la sauvegarde de votre tenue.');
      });
    } else {
      console.error('Erreur : élément ".center-container" introuvable.');
      alert('Veuillez choisir une tenue avant de sauvegarder.');
    }
  }
  
  

  // Mise à jour des éléments de la barre de défilement
  updateSlideBarItems() {
    this.slideBarItems = this.categories[this.selectedCategory];
  }

  // Gestion de la sélection d'une catégorie
  selectCategory(category: 'haut' | 'bas' | 'chaussure' | 'sac') {
    this.selectedCategory = category;
    this.updateSlideBarItems();
  }

  // Gestion du clic sur un élément de la barre de défilement
  onSlideBarItemClick(item: { image: string; label: string }, index: number) {
    this.showInitialImages = false; // Masquer les images initiales
    this.selectedIndexes[this.selectedCategory] = index; // Mémoriser l'index sélectionné pour la catégorie active
  
    switch (this.selectedCategory) {
      case 'haut':
        this.selectedTop = item.image;
        this.selectedTopLabel = item.label;
        break;
      case 'bas':
        this.selectedBottom = item.image;
        this.selectedBottomLabel = item.label;
        break;
      case 'chaussure':
        this.selectedShoe = item.image;
        this.selectedShoeLabel = item.label;
        break;
      case 'sac':
        this.selectedBag = item.image;
        this.selectedBagLabel = item.label;
        break;
    }
  }  
}
