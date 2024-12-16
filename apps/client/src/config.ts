export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Helper function to construct API endpoints
export const getApiUrl = (endpoint: string) => {
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}
