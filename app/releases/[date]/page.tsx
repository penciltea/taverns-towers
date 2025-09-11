import ReleaseNotes from "@/components/Release/ReleaseNotes";
import * as releases from "@/components/Release/content";
import { notFound } from "next/navigation";

// Define a type for the releases object
type ReleasesMap = typeof releases;

export default async function ReleasePage({ params }: { params: Promise<{ date: string }> }) {
  // Await params in case it is a Promise
  const resolvedParams = await params;

  // Convert date format to match export naming
  const key = "release" + resolvedParams.date.replace(/-/g, "");

  // Type-safe access using keyof
  const release = releases[key as keyof ReleasesMap];

  if (!release) return notFound();

  return <ReleaseNotes release={release} />;
}
