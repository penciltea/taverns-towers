import { oauthProvidersConfig } from "@/constants/ui.options";
import { OAuthProvider } from "@/interfaces/ui.interface";
import { signIn } from "next-auth/react";
import Image from "next/image";


export function buildOAuthProviders(callbackUrl?: string): OAuthProvider[] {
  return oauthProvidersConfig.map((provider) => ({
    name: provider.name,
    icon: (
      <Image
        src={provider.iconSrc}
        alt={provider.name}
        width={15}
        height={15}
        style={{ display: "block" }}
      />
    ),
    signInFunction: () =>
      signIn(provider.providerId, { callbackUrl: callbackUrl || "/account/dashboard" }),
  }));
}