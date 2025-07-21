import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup; // Declare the FormGroup
  productId!: number; // Store the product ID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}
  // This method is called when the component is initialized
  // It fetches the product ID from the route and populates the form with existing product details
  ngOnInit(): void {
    // Get the product ID from the route
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form with empty values
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    // Fetch the product details and populate the form
    this.productService.getAllProducts().subscribe((products) => {
      const product = products.find((p) => p.id === this.productId);
      if (product) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
        });
      }
    });
  }
  // This method is called when the user clicks the "Save" button
  onSave(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        id: this.productId,
        ...this.productForm.value,
      };
  
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        alert('Product updated successfully!');
  
        // Update the product in the ProductService's products array
        const index = this.productService.products.findIndex((p) => p.id === this.productId);
        if (index !== -1) {
          this.productService.products[index] = updatedProduct;
        }
  
        // Navigate back to the Product Listing page
        this.router.navigate(['/product-listing']);
      });
    }
  }
  // This method is called when the user clicks the "Cancel" button
  onCancel(): void {
    this.router.navigate(['/product-listing']); // Navigate back to product listing
  }
}