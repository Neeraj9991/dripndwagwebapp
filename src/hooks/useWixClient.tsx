// hooks/useWixClient.ts
import { createClient, OAuthStrategy } from "@wix/sdk";
import { wixModules } from "@/lib/wixClientModules";

let wixClient: ReturnType<typeof createClient> | null = null;

export const useWixClient = () => {
  if (!wixClient) {
    wixClient = createClient({
      modules: wixModules,
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      }),
    });
  }

  return wixClient;
};
