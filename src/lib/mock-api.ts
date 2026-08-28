export const DEFAULT_MOCK_LATENCY_MS = 400;

export function waitForMockApi(latencyMs = DEFAULT_MOCK_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, latencyMs));
}
