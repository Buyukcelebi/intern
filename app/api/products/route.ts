import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { calculateProductPrice, getGoldPricePerGram } from '@/lib/goldPriceService';
import type { Product, ProductData, ProductsResponse } from '@/types/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minPopularity = searchParams.get('minPopularity');
    const maxPopularity = searchParams.get('maxPopularity');

    const goldPrice = await getGoldPricePerGram();

    const productsWithPrices = await Promise.all(
      (productsData as ProductData[]).map(async (product, index) => {
        const price = await calculateProductPrice(
          product.popularityScore,
          product.weight
        );

        const popularityRating = Math.round(product.popularityScore * 5 * 10) / 10;

        return {
          id: `product-${index + 1}`,
          ...product,
          price,
          popularityRating,
        } as Product;
      })
    );

    let filteredProducts = productsWithPrices;

    if (minPrice) {
      const min = parseFloat(minPrice);
      filteredProducts = filteredProducts.filter(p => p.price >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filteredProducts = filteredProducts.filter(p => p.price <= max);
    }

    if (minPopularity) {
      const min = parseFloat(minPopularity);
      filteredProducts = filteredProducts.filter(p => p.popularityScore >= min);
    }

    if (maxPopularity) {
      const max = parseFloat(maxPopularity);
      filteredProducts = filteredProducts.filter(p => p.popularityScore <= max);
    }

    const response: ProductsResponse = {
      products: filteredProducts,
      goldPrice: Math.round(goldPrice * 100) / 100,
      timestamp: new Date().toISOString(),
      count: filteredProducts.length,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error in products API:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

