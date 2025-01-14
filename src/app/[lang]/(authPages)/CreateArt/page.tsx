'use client'

import { useState, useEffect } from 'react'

export default function CreateArtPage() {
  const [gridSize, setGridSize] = useState<number | null>(null)
  const [cubeSize, setCubeSize] = useState(50)
  const [rightCubeSize, setRightCubeSize] = useState(50)
  const [isGridVisible, setIsGridVisible] = useState(false)
  const [cubes, setCubes] = useState<string[][]>([])
  const [rightCubes, setRightCubes] = useState<string[]>([
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#00FFFF', // Cyan
    '#FF00FF', // Magenta
    '#800000', // Maroon
    '#008000', // Dark Green
    '#FFFFFF', // White
    '#000000', // Black
  ])

  const handleGridSizeChange = (size: number) => {
    setGridSize(size)
    generateGrid(size)
    setIsGridVisible(true)
  }

  const generateGrid = (size: number) => {
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill('#FFFFFF')) 
    setCubes(grid)
  }

  const handleCubeSizeChange = (change: number) => {
    setCubeSize((prevSize) => Math.max(prevSize + change, 10))
  }

  const handleRightCubeSizeChange = (change: number) => {
    setRightCubeSize((prevSize) => Math.max(prevSize + change, 10))
  }

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cubeSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${cubeSize}px)`,
    gap: '4px',
    height: '500px',
    width: '500px',
    overflow: 'auto',
    marginRight: '20px',
  }

  useEffect(() => {
    console.log('Left cubes (grid):', cubes)
    console.log('Right cubes (sample):', rightCubes)
  }, [cubes, rightCubes])

  return (
    <div className="flex items-center justify-center">
      <div className="flex">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-4">Create Art</h1>

          {!isGridVisible && (
            <div className="mb-4">
              <p>Size of cube?</p>
              <button onClick={() => handleGridSizeChange(5)} className="mx-2">
                5x5
              </button>
              <button onClick={() => handleGridSizeChange(10)} className="mx-2">
                10x10
              </button>
              <button onClick={() => handleGridSizeChange(20)} className="mx-2">
                20x20
              </button>
            </div>
          )}

          {isGridVisible && (
            <div className="flex">
              <div className="bg-gray-200" style={containerStyle}>
                {cubes.map((row, rowIndex) =>
                  row.map((color, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        width: `${cubeSize}px`,
                        height: `${cubeSize}px`,
                        backgroundColor: color,
                        border: '1px solid #2980b9',
                      }}
                    ></div>
                  ))
                )}
              </div>

              <div className="ml-8 flex flex-col items-center">
                <h2 className="text-xl mb-4">Sample Cubes</h2>

                <div className="flex flex-col items-center">
                  {rightCubes.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        width: `${rightCubeSize}px`,
                        height: `${rightCubeSize}px`,
                        backgroundColor: color,
                        border: '1px solid #c0392b',
                        marginBottom: '10px',
                      }}
                    ></div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleRightCubeSizeChange(5)}
                    className="mx-2 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    + Cube Size
                  </button>
                  <button
                    onClick={() => handleRightCubeSizeChange(-5)}
                    className="mx-2 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    - Cube Size
                  </button>
                </div>
              </div>
            </div>
          )}

          {isGridVisible && (
            <div className="mt-4">
              <button
                onClick={() => handleCubeSizeChange(5)}
                className="mx-2 px-3 py-1 bg-blue-500 text-white rounded"
              >
                + Cube Size
              </button>
              <button
                onClick={() => handleCubeSizeChange(-5)}
                className="mx-2 px-3 py-1 bg-blue-500 text-white rounded"
              >
                - Cube Size
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
