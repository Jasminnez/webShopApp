import { Component, inject, Input, input } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { Product } from '../../_models/product';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { FavoritesService } from '../../_services/favorites.service';

@Component({
  selector: 'app-cart-product-card',
  imports: [RouterLink, TitleCasePipe, CurrencyPipe, NgSwitch, NgSwitchCase],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.scss',
})
export class CartProductCardComponent {
  @Input() context: 'default' | 'cart' | 'favorites' = 'default';
  product = input.required<Product>();
  accountService = inject(AccountService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoritesService);
  private toast = inject(ToastrService);

  removeFromCart() {
    this.cartService.removeFromCart(this.product().id).subscribe({
      next: () => {
        this.toast.success('Product has been removed from the cart', 'Success');
        refreshPage();
        function refreshPage() {
          window.location.reload();
        }
      },
      error: (err) => {
        this.toast.error(err.error, 'Error removing from cart');
      },
    });
  }

  removeFromFavorites() {
    this.favoriteService.removeFromFavorites(this.product().id).subscribe({
      next: () => {
        this.toast.success(
          'Product has been removed from the favorites',
          'Success'
        );
        refreshPage();
        function refreshPage() {
          window.location.reload();
        }
      },
      error: (err) => {
        this.toast.error(err.error, 'Error removing from favorites');
      },
    });
  }
}
