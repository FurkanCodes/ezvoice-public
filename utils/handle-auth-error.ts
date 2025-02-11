const handleAuthError = async (error: unknown, fallbackMessage: string): Promise<string> => {
  if (error instanceof Response) {
    try {
      const errorData = await error.json()
      return errorData.message || fallbackMessage
    } catch {
      return fallbackMessage
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export default handleAuthError;