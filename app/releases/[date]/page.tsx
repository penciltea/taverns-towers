import ReleaseNotes from  "@/components/Release/ReleaseNotes";
import * as releases from "@/components/Release/content";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    date: string;
  };
}

export default function ReleasePage({ params }: PageProps) {
  // Convert date format to match export naming
  const key = "release" + params.date.replace(/-/g, "");
  const release = (releases as any)[key];

  if (!release) return notFound(); // fallback if the release doesn't exist

  return <ReleaseNotes release={release} />;
}
