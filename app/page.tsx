import React from 'react';
import ProductCarousel from '@/components/ProductCarousel';
import type { ProductsResponse } from '@/types/product';

async function getProducts(): Promise<ProductsResponse> {
  // Vercel'de direkt API'yi import et
  try {
    const { GET } = await import('@/app/api/products/route');
    const request = new Request('http://localhost:3000/api/products');
    const response = await GET(request);
    return await response.json();
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
