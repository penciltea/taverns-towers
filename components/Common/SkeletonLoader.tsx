interface SkeletonLoaderProps {
  loading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function SkeletonLoader({ loading, skeleton, children }: SkeletonLoaderProps) {
  return <>{loading ? skeleton : children}</>;
}