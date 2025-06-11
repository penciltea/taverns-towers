import { useEffect, useRef } from "react";


// A safer version of useEffect for async operations.
// Prevents state updates after unmount.

export function useAsyncEffect(
  asyncFn: () => Promise<void>,
  deps: React.DependencyList
) {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    asyncFn().catch((err) => {
      if (isMountedRef.current) {
        console.error("Error in useAsyncEffect:", err);
      }
    });

    return () => {
      isMountedRef.current = false;
    };
  }, deps);
}
