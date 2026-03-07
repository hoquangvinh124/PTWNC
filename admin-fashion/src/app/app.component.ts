import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <i class="bi bi-shop"></i> Fashion Admin Panel
        </a>
        <span class="navbar-text text-white-50">
          Port 4001
        </span>
      </div>
    </nav>
    <router-outlet></router-outlet>
    <footer class="text-center text-muted py-4 mt-5 border-top">
      <p>&copy; 2026 Fashion Admin. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    footer {
      margin-top: auto;
    }
  `]
})
export class AppComponent {
  title = 'admin-fashion';
}
