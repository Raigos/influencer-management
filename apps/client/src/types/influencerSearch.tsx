import { Influencer, ManagerId, UUID } from '@influencer-management/shared'

export interface ManagerBase {
  id: UUID
  firstName: string
  lastName: string
}

export interface ManagerDetails extends ManagerBase {
  email: string
}

export interface InfluencerWithManager extends Omit<Influencer, 'managerId'> {
  managerId: ManagerId
  manager: ManagerDetails | null
}

export interface SearchFilters {
  name: string
  manager: string
}

export interface UseInfluencerSearchResult {
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  influencers: InfluencerWithManager[] | undefined // Using the new interface
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export interface InfluencerSearchProps {
  filters: SearchFilters
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
