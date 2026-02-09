import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books implements OnInit, OnDestroy {
  books: any[] = [];
  errMessage: string = '';
  private routerSubscription?: Subscription;
  
  constructor(private _service: BookAPIService, private router: Router) {
  }

  ngOnInit() {
    this.loadBooks();
    
    // Reload books when navigating to this route again
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/books' || event.urlAfterRedirects === '/books') {
        this.loadBooks();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadBooks() {
    console.log('Loading books...');
    this._service.getBooks().subscribe({
      next: (data) => { 
        console.log('Books data received:', data);
        this.books = data;
      },
      error: (err) => { 
        console.error('Books error:', err);
        this.errMessage = err.message || err;
      }
    });
  }

  viewBookDetail(bookId: string) {
    this.router.navigate(['/book-detail', bookId]);
  }
}
