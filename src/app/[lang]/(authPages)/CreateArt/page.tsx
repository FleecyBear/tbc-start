'use client'

import { useState } from 'react'

export default function CreateArtPage() {
  const [gridSize, setGridSize] = useState<number | null>(null) 
  const [cubeSize, setCubeSize] = useState(50) 
  const [rightCubeSize, setRightCubeSize] = useState(50) 
  const [isGridVisible, setIsGridVisible] = useState(false) 
  const [cubes, setCubes] = useState<number[][]>([]) 
  const [rightCubes, setRightCubes] = useState<number[]>([0, 1, 2, 3, 4]) 

  const handleGridSizeChange = (size: number) => {
    setGridSize(size)
    generateGrid(size)
    setIsGridVisible(true) 
  }

  const generateGrid = (size: number) => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(0))
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

  return (
    <div className="flex items-center justify-center">
      <div className="flex">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-4">Create Art</h1>

          {!isGridVisible && (
            <div className="mb-4">
              <p>Size of cube?</p>
              <button onClick={() => handleGridSizeChange(5)} className="mx-2">5x5</button>
              <button onClick={() => handleGridSizeChange(10)} className="mx-2">10x10</button>
              <button onClick={() => handleGridSizeChange(20)} className="mx-2">20x20</button>
            </div>
          )}

          {isGridVisible && (
            <div className="flex">
              <div
                className="bg-gray-200"
                style={containerStyle}
              >
                {cubes.map((row, rowIndex) =>
                  row.map((_, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        width: `${cubeSize}px`,
                        height: `${cubeSize}px`,
                        backgroundColor: '#3498db',
                        border: '1px solid #2980b9',
                      }}
                    ></div>
                  ))
                )}
              </div>

              <div className="ml-8 flex flex-col items-center">
                <h2 className="text-xl mb-4">Sample Cubes</h2>

                {isGridVisible && (
                  <div className="flex flex-col items-center">
                    {rightCubes.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: `${rightCubeSize}px`,
                          height: `${rightCubeSize}px`,
                          backgroundColor: '#e74c3c',
                          border: '1px solid #c0392b',
                          marginBottom: '10px',
                        }}
                      ></div>
                    ))}
                  </div>
                )}

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
