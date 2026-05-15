export function isBearerTokenAuthorized(authorizationHeader: string | null, adminTokenHeader?: string | null): boolean {
  const tokens = [process.env.TITIPILIH_API_TOKEN, process.env.TITIPPILIH_ADMIN_TOKEN]
    .map((token) => token?.trim())
    .filter((token): token is string => Boolean(token))

  if (tokens.length === 0) return false

  return tokens.some(
    (token) => authorizationHeader === `Bearer ${token}` || adminTokenHeader === token,
  )
}
