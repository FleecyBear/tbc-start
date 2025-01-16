'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../utils/supabase/client'
import { createStripeProduct } from '../../../utils/stripeClient'
import GridSizeSelector from './GridSizeSelector'
import Grid from './Grid'
import ColorPalette from './ColorPalette'
import ArtForm from './ArtForm'
import { checkSubscriptionStatus } from '../../../utils/subscription'

const supabase = createClient()

const CreateArtPage: React.FC = (): React.ReactElement => {
  const [gridSize, setGridSize] = useState<number | null>(null)
  const [cubeSize, setCubeSize] = useState<number>(50)
  const [rightCubeSize] = useState<number>(40)
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false)
  const [cubes, setCubes] = useState<string[][]>([])
  const [rightCubes, setRightCubes] = useState<string[]>([
    '#FF0000', // Red
    '#00FF00', // Lime
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FFFFFF', // White
    '#000000', // Black
  ])
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF')
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [artName, setArtName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [creator, setCreator] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<string>('none') 
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
          setStripeSubscriptionId(data.stripe_subscription_id || null)
          setSubscription(data.subscription || 'none') 
        } else {
          console.error('Error fetching profile:', error)
        }
      } else {
        console.error('Error fetching user:', authError)
      }
    }

    fetchCreator()
  }, [])

useEffect(() => {
  const loadExtraColors = async () => {
    if (stripeSubscriptionId) {
      const subscriptionStatus = await checkSubscriptionStatus(stripeSubscriptionId);

      if (subscriptionStatus.active) {
        if (subscription === 'Basic Plan') {
          setRightCubes((prevColors) => [
            ...prevColors,
            '#FF6347', // Tomato
            '#FFD700', // Gold
            '#8A2BE2', // BlueViolet
            '#A52A2A', // Brown
            '#D2691E', // Chocolate
          ]); 
        } else if (subscription === 'Premium Plan') {
          setRightCubes((prevColors) => [
            ...prevColors,
            '#FF6347', // Tomato
            '#FFD700', // Gold
            '#8A2BE2', // BlueViolet
            '#A52A2A', // Brown
            '#D2691E', // Chocolate
            '#00FFFF', // Aqua
            '#8B0000', // DarkRed
            '#FF1493', // DeepPink
            '#800080', // Purple
            '#008080' // Teal
          ]); 
        }
      }
    }
  };

  loadExtraColors();
}, [stripeSubscriptionId, subscription]); 


  const handleGridSizeChange = (size: number): void => {
    setGridSize(size)
    generateGrid(size)
    setIsGridVisible(true)
  }

  const generateGrid = (size: number): void => {
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill('#FFFFFF'))
    setCubes(grid)
  }

  const handleCubeSizeChange = (change: number): void => {
    setCubeSize((prevSize) => Math.max(prevSize + change, 10))
  }

  const handleColorChange = (color: string): void => {
    setSelectedColor(color)
  }

  const handleLeftCubeClick = (rowIndex: number, colIndex: number): void => {
    const newCubes = [...cubes]
    newCubes[rowIndex][colIndex] = selectedColor
    setCubes(newCubes)
  }

  const handleMouseDown = (): void => {
    setIsDragging(true)
  }

  const handleMouseUp = (): void => {
    setIsDragging(false)
  }

  const handleMouseEnter = (rowIndex: number, colIndex: number): void => {
    if (isDragging) {
      const newCubes = [...cubes]
      newCubes[rowIndex][colIndex] = selectedColor
      setCubes(newCubes)
    }
  }

  const handleArtNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setArtName(event.target.value)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPrice(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    if (!artName || !price) {
      alert('Art Name and Price cannot be empty')
      return
    }

    if (creator) {
      setIsSubmitting(true)
      try {
        const stripeProductId = await createStripeProduct(artName, parseFloat(price))

        const { data, error } = await supabase
          .from('arts')
          .insert([{
            creator,
            price: parseFloat(price),
            art: cubes,
            art_name: artName,
            stripe_id: stripeProductId,
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

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">Create Art</h1>

        {!isGridVisible && <GridSizeSelector onSelectSize={handleGridSizeChange} />}

        {isGridVisible && (
          <>
            <ArtForm
              artName={artName}
              price={price}
              isSubmitting={isSubmitting}
              onArtNameChange={handleArtNameChange}
              onPriceChange={handlePriceChange}
              onSubmit={handleSubmit}
            />

            <div className="flex">
              <Grid
                gridSize={gridSize!}
                cubeSize={cubeSize}
                cubes={cubes}
                selectedColor={selectedColor}
                onCubeClick={handleLeftCubeClick}
                onMouseEnter={handleMouseEnter}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              />
              <ColorPalette colors={rightCubes} onColorChange={handleColorChange} />
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

export default CreateArtPage
