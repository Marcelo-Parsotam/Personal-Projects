import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }
  //Save button functionality
  onSave(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
  
      this.productService.addProduct(newProduct).subscribe({
        next: (addedProduct) => {
          console.log('Added product:', addedProduct); // Log the added product
          alert('Product added successfully!');
  
          // Prepend the new product to the stored product list
          this.productService.products = [addedProduct, ...this.productService.products];
  
          // Navigate back to product listing
          this.router.navigate(['/product-listing']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add the product. Please try again.');
        },
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/product-listing']); // Navigate back to product listing
  }
}