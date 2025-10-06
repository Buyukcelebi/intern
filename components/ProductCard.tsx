'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import { GoldColor } from './ColorPicker';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}
const imageStyle = {
  borderRadius: '10%',
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<GoldColor>('yellow');

  return (
    <div className="flex flex-col bg-white">
      <div className="relative aspect-square bg-gray-100 overflow-hidden group mb-3">
        <Image
          src={product.images[selectedColor]}
          alt={`${product.name} - ${selectedColor} gold`}
          fill
          style={imageStyle}
          className={"p-8 transition-all duration-500 group-hover:scale-105"}
        />
        
      </div>

      <div className="flex flex-col">

        <h3 className="montserrat-regular-15 text-gray-900 m-0" style={{
          marginBottom: '8px',
        }}>
          {product.name}
        </h3>

        <p className="montserrat-regular-15 text-gray-900 mb-2" style={{
          marginTop: '0',
        }}>
          ${product.price.toFixed(2)} USD
        </p>

        <div className="flex items-center gap-3 mb-2">
          {(Object.keys(product.images) as Array<keyof typeof product.images>).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color as GoldColor)}
              className={`
                relative h-96!important rounded-full transition-all duration-200 border
                ${color === 'yellow' ? 'bg-[#E6CA97]' : ''}
                ${color === 'white' ? 'bg-[#D9D9D9]' : ''}
                ${color === 'rose' ? 'bg-[#E1A4A9]' : ''}
                ${selectedColor === color 
                  ? 'border-gray-700 ring-1 ring-gray-300 ring-offset-[3px]' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              style={{
                height: '16px',
                width: '16px',
                marginRight: '8px',
              }}
              aria-label={`Select ${color} gold`}
            >
              {selectedColor === color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                </span>
              )}
            </button>
          ))}
        </div>
        
        <p className="montserrat-medium-15 text-gray-600 mb-2">
          {selectedColor === 'yellow' ? 'Yellow Gold' : selectedColor === 'white' ? 'White Gold' : 'Rose Gold'}
        </p>

        <StarRating rating={product.popularityRating} />
      </div>
    </div>
  );
}

