'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client'

type ProfileData = {
  name: string
  last_name: string
  nickname: string
  coins: number
  email: string
  stripe_subscription_id?: string
  subscription: string 
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    last_name: '',
    nickname: '',
    coins: 0,
    email: '',
    subscription: 'none', 
  })
  const [nicknameError, setNicknameError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError) {
          setError('Error fetching user session.')
          return
        }

        if (!user) {
          setError('You are not logged in. Please log in to view your profile.')
          return
        }

        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileError) {
          setError(`Error fetching profile data: ${profileError.message}`)
        } else {
          setProfileData(data)
          setFormData({
            name: data.name || '',
            last_name: data.last_name || '',
            nickname: data.nickname || '',
            coins: data.coins || 0,
            email: user.email || '',
            subscription: data.subscription || 'none', 
          })

          if (data.subscription !== 'none' && data.stripe_subscription_id) {
            try {
              const response = await fetch(`/api/subscription-status?subscriptionId=${data.stripe_subscription_id}`)
              const subscriptionData = await response.json()

              if (subscriptionData.active) {
                console.log('Subscription is active.')
              } else {
                console.log('Subscription is not active.')
                const { error: updateError } = await supabase
                  .from('profiles')
                  .upsert({
                    user_id: user.id,
                    subscription: 'none',
                    stripe_subscription_id: '',
                  })

                if (updateError) {
                  console.error('Error updating profile:', updateError)
                } else {
                  setProfileData(prevData => ({
                    ...prevData!,
                    subscription: 'none',
                    stripe_subscription_id: '',
                  }))
                }
              }
            } catch (error) {
              console.error('Error retrieving subscription status:', error)
            }
          }
        }
      } catch (err) {
        setError('An unexpected error occurred.')
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'nickname') {
      setNicknameError(null)
    }
  }

  const checkNicknameAvailability = async (nickname: string) => {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      setError('You are not logged in. Please log in to check nickname availability.')
      return 'User session is missing.'
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('nickname', nickname)
      .neq('user_id', user.id) 
      .single()

    if (error) {
      return null
    }

    return 'This nickname is already taken. Please choose another one.'
  }

  const handleSubmit = async (e: React.FormEvent, field: keyof ProfileData) => {
    e.preventDefault()

    if (field === 'nickname') {
      const nicknameTakenError = await checkNicknameAvailability(formData.nickname)
      if (nicknameTakenError) {
        setNicknameError(nicknameTakenError)
        return
      }
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      setError('You are not logged in. Please log in to update your profile.')
      return
    }

    const updatedField = { [field]: formData[field] }

    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        ...updatedField,
      })

    if (updateError) {
      setError(`Error updating profile: ${updateError.message}`)
    } else {
      setProfileData({
        ...profileData!,
        ...updatedField,
      })
      setEditingField(null) 
    }
  }

  if (error) {
    return <div className="text-red-600 text-xl text-center mt-12">{error}</div>
  }

  if (!profileData) {
    return <div className="text-xl text-center mt-12">Loading your profile...</div>
  }

  return (
    <div className="section-1">
      <h1 className="h2-1">Your Profile</h1>
      <ul className="space-y-4">
        <li>
          <span className="p-1">Name:</span>
          {editingField === 'name' ? (
            <form onSubmit={(e) => handleSubmit(e, 'name')} className="inline">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-blue-700 border border-gray-300 rounded w-32"
                required
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <span className="text-gray-500">{profileData?.name || 'Not set up'}</span>
          )}
          <button
            onClick={() => setEditingField(editingField === 'name' ? null : 'name')}
            className="ml-2 text-blue-600"
          >
            {editingField === 'name' ? 'Cancel' : 'Edit'}
          </button>
        </li>
        <li>
          <span className="p-1">Last Name:</span>
          {editingField === 'last_name' ? (
            <form onSubmit={(e) => handleSubmit(e, 'last_name')} className="inline">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="text-blue-700 border border-gray-300 rounded w-32"
                required
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <span className="text-gray-500">{profileData?.last_name || 'Not set up'}</span>
          )}
          <button
            onClick={() => setEditingField(editingField === 'last_name' ? null : 'last_name')}
            className="ml-2 text-blue-600"
          >
            {editingField === 'last_name' ? 'Cancel' : 'Edit'}
          </button>
        </li>
        <li>
          <span className="p-1">Nickname:</span>
          {editingField === 'nickname' ? (
            <form onSubmit={(e) => handleSubmit(e, 'nickname')} className="inline">
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="text-blue-700 border border-gray-300 rounded w-32"
                required
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <span className="text-gray-500">{profileData?.nickname || 'Not set up'}</span>
          )}
          <button
            onClick={() => setEditingField(editingField === 'nickname' ? null : 'nickname')}
            className="ml-2 text-blue-600"
          >
            {editingField === 'nickname' ? 'Cancel' : 'Edit'}
          </button>
          {nicknameError && <div className="text-red-600 mt-2">{nicknameError}</div>}
        </li>
        <li>
          <span className="p-1">Email:</span>
          <span className="text-gray-500">{profileData?.email || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Coins:</span>
          <span className="text-gray-500">{profileData?.coins || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Subscription:</span>
          <span className="text-gray-500">{profileData?.subscription || 'None'}</span>
        </li>
      </ul>
    </div>
  )
}
