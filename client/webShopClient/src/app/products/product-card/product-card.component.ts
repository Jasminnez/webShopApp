import { Component, inject, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../_models/product';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { CartService } from '../../_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../_services/favorites.service';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  accountService = inject(AccountService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoritesService);
  private toast = inject(ToastrService);

  addToCart() {
    this.cartService.addToCart(this.product().id, 1).subscribe({
      next: () => {
        this.toast.success('Product has been added to the cart', 'Success');
      },
      error: (err) => {
        this.toast.error(err.error, 'Error adding to cart');
      }
    });
  }

  addToFavorite() {
    this.favoriteService.addToFavorite(this.product().id).subscribe({
      next: () => {
        this.toast.success('Product has been added to the fovorites', 'Success');
      },
      error: (err) => {
        this.toast.error(err.error, 'Error adding to favorites');
      }
    });
  }
}
