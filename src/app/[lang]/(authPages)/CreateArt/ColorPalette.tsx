import React from 'react'

interface ColorPaletteProps {
  colors: string[]
  onColorChange: (color: string) => void
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, onColorChange }) => {
  return (
    <div className="ml-8 flex flex-col items-center">
      <h2 className="text-xl mb-4 p-1">Color Palette</h2>
      <div className="flex flex-col items-center">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: color,
              border: '1px solid #c0392b',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
            onClick={() => onColorChange(color)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ColorPalette
