import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the product list is already stored in the service
    if (this.productService.products.length > 0) {
      console.log('Using stored product list:', this.productService.products);
      this.products = this.productService.products;
      this.cdr.detectChanges(); // Trigger change detection
    } else {
      // Fetch products from the API if not already stored
      this.productService
        .getAllProducts()
        .pipe(
          tap((data) => {
            console.log('Fetched products from API:', data);
  
            // Check if a new product exists in the service
            if (this.productService.newProduct) {
              console.log('New product from service:', this.productService.newProduct);
              this.products = [this.productService.newProduct, ...data];
              this.productService.newProduct = null; // Clear the shared state
            } else {
              this.products = data;
            }
  
            // Store the fetched product list in the service
            this.productService.products = this.products;
  
            this.cdr.detectChanges(); // Trigger change detection
          }),
          catchError((error) => {
            console.error('Error fetching products:', error);
            return of([]); // Return an empty array in case of error
          })
        )
        .subscribe();
    }
  }
  // deletes the product with the given ID for the delete button
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log(`Product with ID ${id} deleted successfully.`);
          this.products = this.products.filter((product) => product.id !== id);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete the product. Please try again.');
        },
      });
    }
  }
}