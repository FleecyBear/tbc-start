import React, { useRef } from 'react'

interface GridProps {
  gridSize: number
  cubeSize: number
  cubes: string[][]
  selectedColor: string
  onCubeClick: (rowIndex: number, colIndex: number) => void
  onMouseEnter: (rowIndex: number, colIndex: number) => void
  onMouseDown: () => void
  onMouseUp: () => void
}

const Grid: React.FC<GridProps> = ({
  gridSize,
  cubeSize,
  cubes,
  onCubeClick,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
}) => {
  const gridRef = useRef<HTMLDivElement>(null)

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cubeSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${cubeSize}px)`,
    gap: '0px',
    height: '500px',
    width: '500px',
    overflow: 'auto',
    marginRight: '20px',
    cursor: 'pointer',
  }

  return (
    <div
      className="bg-gray-500"
      style={containerStyle}
      ref={gridRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {cubes.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              backgroundColor: color,
            }}
            onClick={() => onCubeClick(rowIndex, colIndex)}
            onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
          ></div>
        ))
      )}
    </div>
  )
}

export default Grid
