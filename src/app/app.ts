import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Learnbiding } from './learnbiding/learnbiding';
import { Ptb1 } from './ptb1/ptb1';
import { Catalog } from './catalog/catalog';
import { Ex28 } from './ex28/ex28';
import { Ex27 } from './ex27/ex27';
import { Ex26 } from './ex26/ex26';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Learnbiding, Ptb1, Catalog, Ex28, Ex27, Ex26],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
