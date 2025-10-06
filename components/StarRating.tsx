
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className = '' }: StarRatingProps) {
  const roundedRating = Math.round(rating * 2) / 2; // 0.5'lik adımlarla yuvarla
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FFD4A3" />
            <stop offset="50%" stopColor="rgba(128, 128, 128, 0.3)" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-[#FFD4A3] text-[#FFD4A3]"
          strokeWidth={0}
          style={{
            filter: 'blur(0.3px) drop-shadow(0 1px 1px rgba(255, 212, 163, 0.3))',
          }}
        />
      ))}
      
      {hasHalfStar && (
        <Star
          key="half"
          className="w-5 h-5"
          strokeWidth={0}
          style={{
            fill: 'url(#half-star-gradient)',
            color: '#FFD4A3'
          }}
        />
      )}
      
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-5 h-5"
          strokeWidth={0}
          style={{
            fill: 'rgba(128, 128, 128, 0.3)',
            color: 'rgba(128, 128, 128, 0.3)'
          }}
        />
      ))}
      
      <span className="ml-1 text-xs text-gray-600 montserrat-regular-15 font-medium">
        {roundedRating.toFixed(1)}/5
      </span>
    </div>
  );
}

