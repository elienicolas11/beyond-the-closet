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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the tenue parameter from the route
    this.tenue = this.route.snapshot.paramMap.get('tenue');
  }
}
