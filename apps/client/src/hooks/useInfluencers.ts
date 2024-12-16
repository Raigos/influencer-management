// import { useMemo } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { fetchInfluencers } from '@/api/influencers'
//
// export function useInfluencers(filters?: any) {
//   const {
//     data: influencers = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['influencers', filters],
//     queryFn: () => fetchInfluencers(filters),
//   })
//
//   const sortedInfluencers = useMemo(() => {
//     return [...influencers].sort((a, b) => {
//       const firstNameComparison = a.firstName.localeCompare(b.firstName)
//       if (firstNameComparison !== 0) return firstNameComparison
//
//       return a.lastName.localeCompare(b.lastName)
//     })
//   }, [influencers])
//
//   return {
//     influencers: sortedInfluencers,
//     isLoading,
//     error,
//   }
// }
