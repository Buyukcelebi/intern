/**
 * Product type definitions
 */

export interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

export interface ProductData {
  name: string;
  popularityScore: number;
  weight: number;
  images: ProductImages;
}

export interface Product extends ProductData {
  id: string;
  price: number;
  popularityRating: number;
}

export interface ProductsResponse {
  products: Product[];
  goldPrice: number;
  timestamp: string;
  count: number;
}

