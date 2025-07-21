import { Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { EditProductComponent } from './edit-product/edit-product.component'; // Add this import
import { AddProductComponent } from './add-product/add-product.component'; 

export const routes: Routes = [
    {path: '', redirectTo: 'product-listing', pathMatch: 'full'},
    {path: "product-listing", component: ProductListingComponent},
    { path: 'edit-product/:id', component: EditProductComponent },
    {path: "add-product", component: AddProductComponent},
    {path:'**',redirectTo: 'product-listing'}
];
