'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../utils/supabase/client'

const supabase = createClient()

export default function CreateArtPage() {
  const [gridSize, setGridSize] = useState<number | null>(null)
  const [cubeSize, setCubeSize] = useState(50)
  const [rightCubeSize] = useState(40) 
  const [isGridVisible, setIsGridVisible] = useState(false)
  const [cubes, setCubes] = useState<string[][]>([])
  const [rightCubes, setRightCubes] = useState<string[]>([
    '#FF0000', // red 
    '#00FF00', // green
    '#0000FF', // blue
    '#FFFF00', // yellow
    '#FFFFFF', // #white
    '#000000', // #black
  ])
  
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF')
  const [isDragging, setIsDragging] = useState(false)
  const [artName, setArtName] = useState('')
  const [price, setPrice] = useState('')
  const [creator, setCreator] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCreator = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id) 
          .single()

        if (data) {
          setCreator(data.nickname)
        } else {
          console.error('Error fetching profile:', error)
        }
      } else {
        console.error('Error fetching user:', authError)
      }
    }

    fetchCreator()
  }, [])

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

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handleLeftCubeClick = (rowIndex: number, colIndex: number) => {
    const newCubes = [...cubes]
    newCubes[rowIndex][colIndex] = selectedColor
    setCubes(newCubes)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDragging) {
      const newCubes = [...cubes]
      newCubes[rowIndex][colIndex] = selectedColor
      setCubes(newCubes)
    }
  }

  const handleArtNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtName(event.target.value)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }

  const handleSubmit = async () => {
    if (!artName || !price) {
      alert('Art Name and Price cannot be empty')
      return
    }

    if (creator) {
      setIsSubmitting(true)

      try {
        const { data, error } = await supabase
          .from('arts')
          .insert([{
            creator,
            price: parseFloat(price),
            art: cubes,
            art_name: artName,
          }])

        if (error) {
          console.error('Error inserting art:', error)
        } else {
          console.log('Art inserted:', data)
          router.push('/') 
        }
      } catch (err) {
        console.error('Error during submission:', err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

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
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4 h2-1">Create Art</h1>

        {!isGridVisible && (
        <div className="mb-4 flex flex-col items-center">
          <p className="text-lg font-medium mb-4 p-1">Choose size:</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleGridSizeChange(5)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300"
            >
              5x5
            </button>
            <button
              onClick={() => handleGridSizeChange(10)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-300"
            >
              10x10
            </button>
            <button
              onClick={() => handleGridSizeChange(20)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition-all duration-300"
            >
              20x20
            </button>
          </div>
        </div>
      )}


        {isGridVisible && (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Art Name"
                value={artName}
                onChange={handleArtNameChange}
                className="mb-2 p-2 border"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={price}
                onChange={handlePriceChange}
                className="mb-2 p-2 border"
              />
            </div>

            <div className="flex mb-4">
              <button
                onClick={handleSubmit}
                className="btn-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            <div className="flex">
              <div
                className="bg-gray-500"
                style={containerStyle}
                ref={gridRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
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
                      onClick={() => handleLeftCubeClick(rowIndex, colIndex)}
                      onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    ></div>
                  ))
                )}
              </div>

              <div className="ml-8 flex flex-col items-center">
                <h2 className="text-xl mb-4 p-1">Color Pallete</h2>
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
                        cursor: 'pointer',
                      }}
                      onClick={() => handleColorChange(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleCubeSizeChange(5)}
                className="my-2 px-3 py-1 btn-2"
              >
                + Cube Size
              </button>
              <button
                onClick={() => handleCubeSizeChange(-5)}
                className="my-2 px-3 py-1 btn-2"
              >
                - Cube Size
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
