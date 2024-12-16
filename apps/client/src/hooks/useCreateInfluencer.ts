import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInfluencer } from '@/api/influencers'
import { CreateInfluencerRequest } from '@influencer-management/shared/src'

interface APIError extends Error {
  statusCode?: number
  details?: string
}

interface UseCreateInfluencerOptions {
  onError?: (error: APIError) => void
  onMutate?: () => void
  onSuccess?: () => void
  onSettled?: () => void
}

export const INFLUENCERS_QUERY_KEY = ['influencers'] as const

// Hook for making a new influencer
export function useCreateInfluencer(options: UseCreateInfluencerOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateInfluencerRequest) => createInfluencer(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INFLUENCERS_QUERY_KEY })

      options.onSuccess?.()
    },

    onError: (error: Error) => {
      console.error('Failed to create influencer:', error)

      options.onError?.(error)
    },
  })
}
