import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UUID } from '@influencer-management/shared/'
import { removeManager } from '@/api/managers.ts'

//Hook for removing a manager from a influencer
export function useManagerRemoval(influencerId: UUID) {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error>({
    mutationFn: () => {
      return removeManager(influencerId)
    },
    onSuccess: () => {
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ['influencers'] })
      queryClient.invalidateQueries({ queryKey: ['influencer', influencerId] })
    },
  })
}
