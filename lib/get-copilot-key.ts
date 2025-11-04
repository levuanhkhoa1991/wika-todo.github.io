export function getCopilotPublicKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY

  if (!apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY environment variable. Please add it to .env.local",
    )
  }

  return apiKey
}
