import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useCreateInfluencer } from '@/hooks/useCreateInfluencer'
import { useToast } from '@/hooks/use-toast'
import { NameFields } from '@/components/create/NameFields.tsx'
import { SocialMediaSection } from '@/components/create/SocialMediaSection.tsx'
import { useInfluencerForm } from '../hooks/useInfluencerForm'
import { isValidName } from '@influencer-management/shared/'

export function Create() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { formData, newAccount, error, setError, handleInputChange, handleAddAccount, handleRemoveAccount, handleNewAccountChange } =
    useInfluencerForm()

  const { mutate: createInfluencer } = useCreateInfluencer({
    onMutate: () => {
      setIsSubmitting(true)
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Influencer created successfully!',
      })
      navigate('/list')
    },
    onError: error => {
      setError(error.message)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create influencer! Please try again.',
      })
    },
    onSettled: () => {
      setIsSubmitting(false) // Reset submission state whether success or error
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidName(formData.firstName)) {
      setError('First name must be between 1 and 50 characters')
      return
    }

    if (!isValidName(formData.lastName)) {
      setError('Last name must be between 1 and 50 characters')
      return
    }

    const requestData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      socialMediaAccounts: formData.socialMediaAccounts,
    }

    createInfluencer(requestData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Influencer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <NameFields
            firstName={formData.firstName}
            lastName={formData.lastName}
            onInputChange={handleInputChange}
          />

          <SocialMediaSection
            accounts={formData.socialMediaAccounts}
            newAccount={newAccount}
            onAddAccount={handleAddAccount}
            onRemoveAccount={handleRemoveAccount}
            onNewAccountChange={handleNewAccountChange}
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Influencer'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default Create
