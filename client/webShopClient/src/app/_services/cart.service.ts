import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../_models/product';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  products = signal<Product[]>([]);
  private toast = inject(ToastrService);
  addToCart(productId: number, quantity: number = 1) {
    return this.http.post(this.baseUrl + `cart/add?productId=${productId}&quantity=${quantity}`, {});
  }

  getCart() {
    return this.http.get<Product[]>(this.baseUrl + 'cart').subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (err) => {
        this.toast.error(err.error, 'Error loading cart');
      }
    });
  }

  removeFromCart(productId: number) {
    return this.http.delete(this.baseUrl + `cart/remove?productId=${productId}`);
  }

}
