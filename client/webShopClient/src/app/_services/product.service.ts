import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../_models/product';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  products = signal<Product[]>([]);

  getProducts(skip: number = 0, limit: number = 10): Observable<Product[]> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<Product[]>(this.baseUrl + 'product', { params });
  }

  getProduct(id: number){
    const product = this.products().find(x => x.id === id);
    if(product !== undefined) return of(product);
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

}
