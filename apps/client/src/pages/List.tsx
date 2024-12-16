import { useInfluencerSearch } from '../hooks/useInfluencerSearch'

import { UseInfluencerSearchResult } from '@/types/influencerSearch.tsx'
import { InfluencerCard } from '@/components/InfluencerCard.tsx'
import { InfluencerSearch } from '@/components/Search.tsx'
import React, { useCallback } from 'react'

export const List = () => {
  const { filters, setFilters, influencers, isLoading, isError, error }: UseInfluencerSearchResult = useInfluencerSearch()

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFilters({ ...filters, [name]: value })
    },
    [filters, setFilters],
  )

  return (
    <>
      {/*ToDo: Make it possible to change managers*/}
      <InfluencerSearch
        filters={filters}
        onSearchChange={handleSearchChange}
      />
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin h-8 w-8 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
      )}
      {isError && (
        <div className="text-red-600 bg-red-50 p-4 rounded-md">{error instanceof Error ? error.message : 'An error occurred'}</div>
      )}
      {!isLoading && !isError && <InfluencerCard influencers={influencers} />}
    </>
  )
}

export default List
