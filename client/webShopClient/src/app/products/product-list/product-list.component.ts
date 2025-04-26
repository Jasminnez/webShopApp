import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  products$ = this.productService.products; 
  currentPage = signal(1);
  pageSize = signal(12);
  totalProducts = signal(100);
  totalPages = computed(() => Math.ceil(this.totalProducts() / this.pageSize()));

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const skip = (this.currentPage() - 1) * this.pageSize();
    this.productService.getProducts(skip, this.pageSize()).subscribe({
      next: (products) => {
        this.productService.products.set(products);
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }
}
