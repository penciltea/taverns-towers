import { useState, useEffect } from "react";
import { generateWildernessContext } from "@/lib/modules/settlements/rules/settlement.rules";

type EnvironmentContext = {
  terrain: string[];
  climate: string;
  tags: string[];
};

export function useEnvironmentContext(
  initialContext?: Partial<EnvironmentContext>
) {
  const [env, setEnv] = useState<EnvironmentContext | null>(null);

  useEffect(() => {
    const needsEnv =
      !initialContext?.terrain?.length ||
      !initialContext?.climate ||
      !initialContext?.tags?.length;

    if (needsEnv) {
      generateWildernessContext()
        .then((context) => setEnv(context))
        .catch((err) => {
          console.error("Failed to generate environment context", err);
          setEnv({
            terrain: [],
            climate: "",
            tags: [],
          });
        });
    } else {
      setEnv({
        terrain: initialContext?.terrain || [],
        climate: initialContext?.climate || "",
        tags: initialContext?.tags || [],
      });
    }
  }, [initialContext?.terrain, initialContext?.climate, initialContext?.tags]);

  return { env, setEnv };
}
