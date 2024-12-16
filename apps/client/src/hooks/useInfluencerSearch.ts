import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchInfluencers } from '../api/influencers'
import { SearchFilters, UseInfluencerSearchResult } from '@/types/influencerSearch.tsx'

// Manages filtered search of influencers with debounced input
export function useInfluencerSearch(): UseInfluencerSearchResult {
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    manager: '',
  })

  const DEBOUNCE_DELAY = 300

  const [debouncedFilters, setDebouncedFilters] = useState(filters)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [filters])

  const query = useQuery({
    queryKey: ['influencers', debouncedFilters],
    queryFn: () => fetchInfluencers(debouncedFilters),
  })

  return {
    filters,
    setFilters,
    influencers: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
