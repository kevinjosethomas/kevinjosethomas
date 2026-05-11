import { PostHog } from "posthog-node";

type PostHogClient = Pick<PostHog, "shutdown">;

export default function PostHogClient(): PostHogClient {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    return {
      shutdown: async () => undefined,
    };
  }

  return new PostHog(apiKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}
