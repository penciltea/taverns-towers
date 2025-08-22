import Script from "next/script";
import { Metadata } from "next";
import HomeContent from "@/components/Common/HomePage";

export const metadata: Metadata = {
  title: "RealmFoundry - Build Worlds, Craft Stories, Play Better",
  description: "Generate towns, NPCs, and locations with powerful tools for GMs, writers, and world-builders. Currently in limited alpha.",
  keywords: ["TTRPG", "worldbuilding", "settlement generator", "NPC generator", "DnD tools", "D&D tools"],
  authors: [{ name: "RealmFoundry" }],
  openGraph: {
    title: "RealmFoundry",
    description: "Generate towns, NPCs, and locations with powerful tools for GMs, writers, and world-builders.",
    url: "https://www.realmfoundry.com",
    siteName: "RealmFoundry",
    /*
    images: [
      {
        url: "/og-image.png", // 1200x630 recommended // ToDo: Create one
        width: 1200,
        height: 630,
        alt: "RealmFoundry preview image",
      },
    ],
    */
    locale: "en_US",
    type: "website",
  },
  // temporary for alpha testing
  robots: {
    index: false,
    follow: false,
  },
};


export default function Home() {
  return (
    <>
      <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "RealmFoundry",
              applicationCategory: "Game",
              operatingSystem: "Web",
              description:
                "Generate towns, NPCs, and locations with powerful tools for GMs, writers, and world-builders.",
              offers: {
                "@type": "Offer",
                price: "0", // since this is freemium
                priceCurrency: "USD",
              },
            }),
          }}
      />

      <HomeContent />
      
    </>
  );
}
