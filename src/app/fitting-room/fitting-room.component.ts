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
  tenue: string | null = null; 
  showInitialImages: boolean = true;

  selectedIndexes: { [key: string]: number | null } = {
    haut: null,
    bas: null,
    chaussure: null,
    sac: null,
    talons: null,
    robe : null,
    glamsac: null,
  };

  private readonly defaultSelections = {
    selectedCategory: 'haut' as 'haut' | 'bas' | 'chaussure' | 'sac' | 'robe' | 'talons' | 'glamsac',
    selectedTop: '',
    selectedBottom: '',
    selectedShoe: '',
    selectedBag: '',
    selectedRobe: '',
    selectedTalons: '',
    selectedGlamSac: '',
    selectedTopLabel: '',
    selectedBottomLabel: '',
    selectedShoeLabel: '',
    selectedBagLabel: '',
    selectedRobeLabel: '',
    selectedTalonsLabel: '',
    selectedGlamSacLabel: '',
  };

  selectedCategory = this.defaultSelections.selectedCategory;
  selectedTop = this.defaultSelections.selectedTop;
  selectedBottom = this.defaultSelections.selectedBottom;
  selectedShoe = this.defaultSelections.selectedShoe;
  selectedBag = this.defaultSelections.selectedBag;
  selectedRobe = this.defaultSelections.selectedRobe;
  selectedTalons = this.defaultSelections.selectedTalons;
  selectedGlamSac = this.defaultSelections.selectedGlamSac;
  selectedTopLabel = this.defaultSelections.selectedTopLabel;
  selectedBottomLabel = this.defaultSelections.selectedBottomLabel;
  selectedShoeLabel = this.defaultSelections.selectedShoeLabel;
  selectedBagLabel = this.defaultSelections.selectedBagLabel;
  selectedRobeLabel = this.defaultSelections.selectedRobeLabel;
  selectedTalonsLabel = this.defaultSelections.selectedTalonsLabel;
  selectedGlamSacLabel = this.defaultSelections.selectedGlamSacLabel;

  slideBarItems: { image: string; label: string }[] = [];

  categories = {
    haut: [...Array(6)].map((_, i) => ({ image: `img/clothes/haut${i + 1}.png`, label: `haut ${i + 1}` })),
    bas: [...Array(6)].map((_, i) => ({ image: `img/clothes/bas${i + 1}.png`, label: `bas ${i + 1}` })),
    chaussure: [...Array(4)].map((_, i) => ({ image: `img/clothes/chaussure${i + 1}.png`, label: `Chaussure ${i + 1}` })),
    sac: [...Array(6)].map((_, i) => ({ image: `img/clothes/sac${i + 1}.png`, label: `Sac ${i + 1}` })),
    robe: [...Array(6)].map((_, i) => ({ image: `img/clothes/dress${i + 1}.png`, label: `Robe ${i + 1}` })),
    talons: [...Array(6)].map((_, i) => ({ image: `img/clothes/heels${i + 1}.png`, label: `Talons ${i + 1}` })),
    glamsac: [...Array(5)].map((_, i) => ({ image: `img/clothes/sac${i + 7}.png`, label: `Sac ${i + 7}` })),
  };

  constructor(private route: ActivatedRoute, private location: Location, private library: FaIconLibrary) {
    library.addIcons(faArrowLeft, faRedo, faSave);
  }

  ngOnInit(): void {
    this.tenue = this.route.snapshot.paramMap.get('tenue');
    this.selectedCategory = this.tenue === "Tenue Glam" ? 'robe' : 'haut';
    this.updateSlideBarItems();
  }

  onExit() {
    this.location.back();
  }

  onRestart() {
    Object.assign(this, this.defaultSelections); 
    this.selectedIndexes = { haut: null, bas: null, chaussure: null, sac: null, talons: null, robe : null, glamsac: null };
    this.showInitialImages = true;
    this.updateSlideBarItems();
  }

  onSave() {
    const elementToCapture = document.querySelector('.center-container') as HTMLElement;

    if (elementToCapture) {
      html2canvas(elementToCapture, { backgroundColor: null }).then((canvas) => {
        const minWidth = 800, maxWidth = 1200;
        let finalWidth = canvas.width, finalHeight = canvas.height;

        if (finalWidth < minWidth) {
          finalHeight = (minWidth / finalWidth) * finalHeight;
          finalWidth = minWidth;
        } else if (finalWidth > maxWidth) {
          finalHeight = (maxWidth / finalWidth) * finalHeight;
          finalWidth = maxWidth;
        }

        const padding = 50;
        const finalCanvas = document.createElement('canvas');
        const ctx = finalCanvas.getContext('2d')!;
        finalCanvas.width = finalWidth + 2 * padding;
        finalCanvas.height = finalHeight + 150;
        const centerX = (finalCanvas.width - finalWidth) / 2;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        ctx.font = '64px Pacifico';
        ctx.fillStyle = '#515779';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'whitesmoke';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(this.tenue || 'Tenue', finalCanvas.width / 2, 80);
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, centerX, 120, finalWidth, finalHeight);

        const image = finalCanvas.toDataURL('image/png');
        const now = new Date();
        const fileName = `BTC_${now.toISOString().slice(0, 10)}_${now.toTimeString().split(' ')[0].replace(/:/g, '-')}.png`;
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();

        alert(`Votre tenue a été sauvegardée avec succès sous le nom : ${fileName}`);
      }).catch(() => alert('Erreur lors de la sauvegarde de votre tenue.'));
    } else {
      alert('Veuillez choisir une tenue avant de sauvegarder.');
    }
  }

  updateSlideBarItems() {
    this.slideBarItems = this.categories[this.selectedCategory];
  }

  selectCategory(category: 'haut' | 'bas' | 'chaussure' | 'sac' | 'robe' | 'talons' | 'glamsac') {
    this.selectedCategory = category;
    this.updateSlideBarItems();
  }

  onSlideBarItemClick(item: { image: string; label: string }, index: number) {
    this.showInitialImages = false;
    this.selectedIndexes[this.selectedCategory] = index;

    switch (this.selectedCategory) {
      case 'haut': this.selectedTop = item.image; this.selectedTopLabel = item.label; break;
      case 'bas': this.selectedBottom = item.image; this.selectedBottomLabel = item.label; break;
      case 'chaussure': this.selectedShoe = item.image; this.selectedShoeLabel = item.label; break;
      case 'sac': this.selectedBag = item.image; this.selectedBagLabel = item.label; break;
      case 'robe': this.selectedRobe = item.image; this.selectedRobeLabel = item.label; break;
      case 'glamsac': this.selectedGlamSac = item.image; this.selectedGlamSacLabel = item.label; break;
      case 'talons': this.selectedTalons = item.image; this.selectedTalonsLabel = item.label; break;
    }
  }
}
