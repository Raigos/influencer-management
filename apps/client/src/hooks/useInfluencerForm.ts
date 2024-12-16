import { useState } from 'react'
import { CreateInfluencerRequest, SocialMediaAccountBase, SocialMediaAccountUpdate } from '@influencer-management/shared/src'

// Hook to manages form state and validation for creating new influencers
export function useInfluencerForm() {
  const [formData, setFormData] = useState<CreateInfluencerRequest>({
    firstName: '',
    lastName: '',
    socialMediaAccounts: [],
  })

  const [newAccount, setNewAccount] = useState<SocialMediaAccountBase>({
    platform: 'INSTAGRAM',
    username: '',
  })

  const [error, setError] = useState<string | null>(null)

  function validateSocialMediaUsername(username: string): { isValid: boolean; error?: string } {
    const trimmedUsername = username.trim()

    if (!username || typeof username !== 'string') {
      return { isValid: false, error: 'Username is required' }
    }

    if (trimmedUsername.length === 0) {
      return { isValid: false, error: 'Username cannot be only whitespace' }
    }

    if (username.length > 50) {
      return { isValid: false, error: 'Username must not exceed 50 characters' }
    }

    if (/^\s+$/.test(username)) {
      return { isValid: false, error: 'Username cannot contain only spaces' }
    }

    return { isValid: true }
  }

  const handleInputChange = (field: 'firstName' | 'lastName', value: string) => {
    if (value.length <= 50) {
      setFormData(prev => ({ ...prev, [field]: value }))
      setError(null)
    }
  }

  const handleAddAccount = () => {
    if (!newAccount.username) {
      setError('Please enter a username')
      return
    }

    const validation = validateSocialMediaUsername(newAccount.username)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid username')
      return
    }

    const isDuplicate = formData.socialMediaAccounts.some(
      account =>
        account.platform === newAccount.platform && account.username.trim().toLowerCase() === newAccount.username.trim().toLowerCase(),
    )

    if (isDuplicate) {
      setError('This social media account has already been added')
      return
    }

    setFormData(prev => ({
      ...prev,
      socialMediaAccounts: [...prev.socialMediaAccounts, { ...newAccount }],
    }))
    setNewAccount({ platform: 'INSTAGRAM', username: '' })
    setError(null)
  }

  const handleRemoveAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialMediaAccounts: prev.socialMediaAccounts.filter((_, i) => i !== index),
    }))
  }

  const handleNewAccountChange = (update: SocialMediaAccountUpdate) => {
    setNewAccount(prev => ({
      ...prev,
      [update.field]: update.value,
    }))
    setError(null)
  }

  return {
    formData,
    newAccount,
    error,
    setError,
    handleInputChange,
    handleAddAccount,
    handleRemoveAccount,
    handleNewAccountChange,
  }
}
