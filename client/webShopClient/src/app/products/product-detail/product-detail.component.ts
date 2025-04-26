import { Component, inject, input, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_models/product';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccountService } from '../../_services/account.service';
import { CartService } from '../../_services/cart.service';
import { FavoritesService } from '../../_services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [TabsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  accountService = inject(AccountService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoritesService);
  private toast = inject(ToastrService);
  product?: Product;
  productCF = input.required<Product>();



  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.route.snapshot.paramMap.get('id');
    const numericId = Number(id); // ili parseInt(id, 10)
    if(!numericId) return;
    this.productService.getProduct(numericId).subscribe({
      next: product => this.product = product
    })
  }
  
    addToCart() {
      this.cartService.addToCart(this.productCF().id, 1).subscribe({
        next: () => {
          this.toast.success('Product has been added to the cart', 'Success');
        },
        error: (err) => {
          this.toast.error(err.error, 'Error adding to cart');
        }
      });
    }
  
    addToFavorite() {
      this.favoriteService.addToFavorite(this.productCF().id).subscribe({
        next: () => {
          this.toast.success('Product has been added to the fovorites', 'Success');
        },
        error: (err) => {
          this.toast.error(err.error, 'Error adding to favorites');
        }
      });
    }
}
