import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_models/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  private toast = inject(ToastrService);
  products = signal<Product[]>([]);

  addToFavorite(productId: number, quantity: number = 1) {
    return this.http.post(this.baseUrl + `favorite/add?productId=${productId}`, {});
  }

  getFavorites() {
    return this.http.get<Product[]>(this.baseUrl + 'favorite').subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (err) => {
        this.toast.error(err.error, 'Error loading favorites');
      }
    });
  }

  removeFromFavorites(productId: number) {
    return this.http.delete(this.baseUrl + `favorite/remove?productId=${productId}`);
  }
}
