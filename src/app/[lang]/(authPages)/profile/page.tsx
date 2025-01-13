'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client'

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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
        }
      } catch (err) {
        setError('An unexpected error occurred.')
      }
    }

    fetchUserProfile()
  }, [])

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
          <span className="text-gray-500">{profileData?.first_name || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Last Name:</span>
          <span className="text-gray-500">{profileData?.last_name || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Email:</span>
          <span className="text-gray-500">{profileData?.email || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Nickname:</span>
          <span className="text-gray-500">{profileData?.nickname || 'Not set up'}</span>
        </li>
        <li>
          <span className="p-1">Coins:</span>
          <span className="text-gray-500">{profileData?.coins || 'Not set up'}</span>
        </li>
      </ul>
    </div>
  )
}
