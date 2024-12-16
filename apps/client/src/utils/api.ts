export async function handleAPIResponse(response: Response, fallbackMessage: string) {
  if (!response.ok) {
    const errorMessage = await response
      .json()
      .then(data => data.error)
      .catch(() => `${fallbackMessage} (Status: ${response.status})`)
    throw new Error(errorMessage || fallbackMessage)
  }
  return response.json()
}
