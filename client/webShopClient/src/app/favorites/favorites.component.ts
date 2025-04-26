import { Component, inject, OnInit } from '@angular/core';
import { FavoritesService } from '../_services/favorites.service';
import { CartProductCardComponent } from '../cart/cart-product-card/cart-product-card.component';

@Component({
  selector: 'app-favorites',
  imports: [CartProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoriteService = inject(FavoritesService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
     this.favoriteService.getFavorites();
  }
}
