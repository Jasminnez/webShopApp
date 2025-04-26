import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { CartProductCardComponent } from '../cart-product-card/cart-product-card.component';

@Component({
  selector: 'app-cart-product-list',
  imports: [CartProductCardComponent],
  templateUrl: './cart-product-list.component.html',
  styleUrl: './cart-product-list.component.scss'
})
export class CartProductListComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
     this.cartService.getCart();
  }
}
