import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Learnbiding } from './learnbiding/learnbiding';
import { Ptb1 } from './ptb1/ptb1';
import { Catalog } from './catalog/catalog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Learnbiding, Ptb1, Catalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
