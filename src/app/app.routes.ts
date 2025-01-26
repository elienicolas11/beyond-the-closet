import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FittingRoomComponent } from './fitting-room/fitting-room.component';


export const routes: Routes = [
  { path: '', component: AccueilComponent }, // La route par défaut
  { path: 'fitting-room/:tenue', component: FittingRoomComponent }
];
