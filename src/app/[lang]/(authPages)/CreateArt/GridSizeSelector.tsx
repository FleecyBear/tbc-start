import React from 'react'

interface GridSizeSelectorProps {
  onSelectSize: (size: number) => void
}

const GridSizeSelector: React.FC<GridSizeSelectorProps> = ({ onSelectSize }) => {
  return (
    <div className="mb-4 flex flex-col items-center">
      <p className="text-lg font-medium mb-4 p-1">Choose size:</p>
      <div className="flex gap-4">
        <button
          onClick={() => onSelectSize(5)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300"
        >
          5x5
        </button>
        <button
          onClick={() => onSelectSize(10)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-300"
        >
          10x10
        </button>
        <button
          onClick={() => onSelectSize(20)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition-all duration-300"
        >
          20x20
        </button>
      </div>
    </div>
  )
}

export default GridSizeSelector
