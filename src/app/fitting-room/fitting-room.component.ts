import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fitting-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fitting-room.component.html',
  styleUrls: ['./fitting-room.component.css'],
})
export class FittingRoomComponent implements OnInit {
  tenue: string | null = null;

  // Default categories and selections
  selectedCategory: 'haut' | 'bas' | 'chaussure' | 'sac' = 'haut';

  selectedTop = 'img/clothes/haut1.png';
  selectedBottom = 'img/clothes/bas1.png';
  selectedShoe = 'img/clothes/chaussure1.png';
  selectedBag = 'img/clothes/sac1.png';

  selectedTopLabel = 'haut 1';
  selectedBottomLabel = 'bas 1';
  selectedShoeLabel = 'Chaussure 1';
  selectedBagLabel = 'Sac 1';

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
      { image: 'img/clothes/chaussure4.png', label: 'Chaussure 4' }
    ],
    sac: [
      { image: 'img/clothes/sac1.png', label: 'Sac 1' },
      { image: 'img/clothes/sac2.png', label: 'Sac 2' },
      { image: 'img/clothes/sac3.png', label: 'Sac 3' },
      { image: 'img/clothes/sac4.png', label: 'Sac 4' },
      { image: 'img/clothes/sac5.png', label: 'Sac 5' },
    ]
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get tenue parameter from the route
    this.tenue = this.route.snapshot.paramMap.get('tenue');
    this.updateSlideBarItems();
  }

  updateSlideBarItems() {
    this.slideBarItems = this.categories[this.selectedCategory];
  }

  selectCategory(category: 'haut' | 'bas' | 'chaussure' | 'sac') {
    this.selectedCategory = category;
    this.updateSlideBarItems();
  }

  onSlideBarItemClick(item: { image: string; label: string }) {
    switch (this.selectedCategory) {
      case 'haut': this.selectedTop = item.image; this.selectedTopLabel = item.label; break;
      case 'bas': this.selectedBottom = item.image; this.selectedBottomLabel = item.label; break;
      case 'chaussure': this.selectedShoe = item.image; this.selectedShoeLabel = item.label; break;
      case 'sac': this.selectedBag = item.image; this.selectedBagLabel = item.label; break;
    }
  }
}
