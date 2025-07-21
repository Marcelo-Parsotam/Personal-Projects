import { TestBed } from '@angular/core/testing';
import { ProductListingComponent } from './product-listing.component';
import { ProductService } from '../services/product.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProductListingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Use provideHttpClient instead of HttpClientTestingModule
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductListingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});