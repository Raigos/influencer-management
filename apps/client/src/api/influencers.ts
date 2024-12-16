import { InfluencerBase, InfluencerFilters } from '@influencer-management/shared/src'
import { handleAPIResponse } from '@/utils/api.ts'

export async function fetchInfluencers(filters: InfluencerFilters) {
  const params = new URLSearchParams()

  if (filters.name?.trim()) {
    params.set('name', filters.name.trim())
  }

  if (filters.manager?.trim()) {
    params.set('manager', filters.manager.trim())
  }

  const response = await fetch(`/api/influencers?${params.toString()}`)

  return handleAPIResponse(response, 'Failed to fetch influencers')
}

export async function createInfluencer(data: InfluencerBase) {
  const response = await fetch('/api/influencers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return handleAPIResponse(response, 'Failed to create influencer')
}
