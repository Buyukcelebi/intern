'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Mousewheel, Scrollbar, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Swiper */}
      <div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Keyboard, Mousewheel, Scrollbar, Navigation]}
          spaceBetween={96}
          slidesPerView={1}
          pagination={false}
          navigation={true}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          scrollbar={{ draggable: true, hide: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
        }

        .swiper-pagination-bullet {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }

        .swiper-pagination-bullet-active {
          background: #6b7280;
          width: 60px;
        }

        .swiper-scrollbar {
          background: #e5e7eb;
          border-radius: 6px;
          height: 12px;
          margin: 0 8px;
          bottom: -2px !important;
        }

        .swiper-scrollbar-drag {
          background: #6b7280;
          border-radius: 6px;
          border: none;
          opacity: 1;
        }

        /* Navigation Buttons */
        .swiper-button-next,
        .swiper-button-prev {
          color: #374151;
          background: transparent;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          box-shadow: none;
          border: none;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: transparent;
          transform: translateY(-50%) scale(1.05);
          opacity: 1;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Butonları resmin ortasına hizla */
        .swiper-button-next {
          top: 50% !important;
          right: 8px !important;
          transform: translateY(-50%);
        }

        .swiper-button-prev {
          top: 50% !important;
          left: 8px !important;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
}
