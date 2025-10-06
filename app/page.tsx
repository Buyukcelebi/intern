import React from 'react';
import ProductCarousel from '@/components/ProductCarousel';
import type { ProductsResponse } from '@/types/product';

async function getProducts(): Promise<ProductsResponse> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      goldPrice: 0,
      timestamp: new Date().toISOString(),
      count: 0,
    };
  }
}

export default async function HomePage() {
  const data = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-24 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="avenir-book-45 text-gray-900 inline-block">
            Product List
          </h1>
        </div>

        {data.products.length > 0 ? (
          <ProductCarousel products={data.products} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </div>
    </main>
  );
}
