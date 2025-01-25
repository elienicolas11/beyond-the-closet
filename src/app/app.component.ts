import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importez RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Ajoutez RouterModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'beyond-the-closet';
}
