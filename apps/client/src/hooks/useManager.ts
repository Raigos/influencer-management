import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { assignManager, fetchManagers } from '../api/managers'
import { UUID } from '@influencer-management/shared/'
import { ManagerId } from '@influencer-management/shared/src'

// Hook for fetching the list of managers
export function useManagers() {
  return useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
    // Since managers list is static, we never want to consider it stale
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

// Hook for manager assignment
export function useManagerAssignment(influencerId: UUID) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (managerId: ManagerId) => {
      return assignManager(influencerId, managerId)
    },
    onSuccess: () => {
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ['influencers'] })
      queryClient.invalidateQueries({ queryKey: ['influencer', influencerId] })
    },
  })
}
