import { handleAPIResponse } from '@/utils/api.ts'
import { UUID } from '@influencer-management/shared/'
import { ManagerId } from '@influencer-management/shared/src'

export async function fetchManagers() {
  const response = await fetch('/api/employees')
  return handleAPIResponse(response, 'Failed to fetch managers')
}

export async function assignManager(influencerId: UUID, managerId: ManagerId) {
  const response = await fetch(`/api/influencers/${influencerId}/manager`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(managerId),
  })
  return handleAPIResponse(response, 'Failed to assign manager')
}

export async function removeManager(influencerId: UUID) {
  const response = await fetch(`/api/influencers/${influencerId}/manager`, {
    method: 'DELETE',
  })
  return handleAPIResponse(response, 'Failed to remove manager')
}
