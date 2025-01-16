import React from 'react'

interface ArtFormProps {
  artName: string
  price: string
  isSubmitting: boolean
  onArtNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

const ArtForm: React.FC<ArtFormProps> = ({
  artName,
  price,
  isSubmitting,
  onArtNameChange,
  onPriceChange,
  onSubmit,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Art Name"
        value={artName}
        onChange={onArtNameChange}
        className="mb-2 p-2 border"
      />
      <input
        type="number"
        placeholder="Price ($)"
        value={price}
        onChange={onPriceChange}
        className="mb-2 p-2 border"
      />
      <div className="flex mb-4">
        <button onClick={onSubmit} className="btn-2" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default ArtForm
