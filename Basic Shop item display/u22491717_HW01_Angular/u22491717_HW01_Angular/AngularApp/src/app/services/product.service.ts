import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7292/api/Product'; // This stores the API URL to integrate between the Angular and .NET Core API.
  public newProduct: Product | null = null;
  public products: Product[] = [];
  constructor(private http: HttpClient) {
    console.log('ProductService initialized. HttpClient:', http);
  }

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // Construct the DELETE URL
    return this.http.delete<void>(url);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`; // Construct the PUT URL
    return this.http.put<Product>(url, product);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product); // Call the POST endpoint
  }
  
}