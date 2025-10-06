import React from 'react';

export type GoldColor = 'yellow' | 'white' | 'rose';

interface ColorPickerProps {
  selectedColor: GoldColor;
  onColorChange: (color: GoldColor) => void;
  className?: string;
}

const colorConfig: Record<GoldColor, { name: string; bgColor: string; borderColor: string; hex: string }> = {
  yellow: {
    name: 'Yellow Gold',
    bgColor: 'bg-[#E6CA97]',
    borderColor: 'border-[#E6CA97]',
    hex: '#E6CA97'
  },
  white: {
    name: 'White Gold',
    bgColor: 'bg-[#D9D9D9]',
    borderColor: 'border-[#D9D9D9]',
    hex: '#D9D9D9'
  },
  rose: {
    name: 'Rose Gold',
    bgColor: 'bg-[#E1A4A9]',
    borderColor: 'border-[#E1A4A9]',
    hex: '#E1A4A9'
  },
};

export default function ColorPicker({ 
  selectedColor, 
  onColorChange, 
  className = '' 
}: ColorPickerProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {(Object.keys(colorConfig) as GoldColor[]).map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`
            relative w-6 h-6 rounded-full transition-all duration-200
            ${colorConfig[color].bgColor}
            ${selectedColor === color 
              ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
              : 'hover:scale-105 hover:ring-1 hover:ring-offset-1 hover:ring-gray-300'
            }
          `}
          aria-label={`Select ${colorConfig[color].name}`}
          title={colorConfig[color].name}
        >
          {selectedColor === color && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            </span>
          )}
        </button>
      ))}
      <span className="text-sm text-gray-600 ml-1 montserrat-medium-15">
        {colorConfig[selectedColor].name}
      </span>
    </div>
  );
}

export { colorConfig };

