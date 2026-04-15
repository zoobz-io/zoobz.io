export function useApiError(response: Response, message: string): void {
  if (!response.ok) {
    throw createError({ statusCode: response.status, message });
  }
}
