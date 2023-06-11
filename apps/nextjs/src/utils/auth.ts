import { clerkClient } from "@clerk/nextjs";
import { cache } from "react";

export const getSpotifyToken = cache(async (userId: string) => {
  const [token] = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_spotify",
  );
  return token?.token;
});
