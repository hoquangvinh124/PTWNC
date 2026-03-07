import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <i class="bi bi-bag-heart-fill"></i> Fashion Store
        </a>
        <span class="navbar-text text-muted">
          Port 4002
        </span>
      </div>
    </nav>
    <router-outlet></router-outlet>
    <footer class="bg-dark text-white text-center py-4 mt-5">
      <div class="container">
        <p class="mb-0">&copy; 2026 Fashion Store. All rights reserved.</p>
        <p class="mb-0 text-muted small">Discover the latest fashion trends</p>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    router-outlet {
      flex: 1;
    }
    footer {
      margin-top: auto;
    }
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
    }
  `]
})
export class AppComponent {
  title = 'client-fashion';
}
