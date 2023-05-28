import { useEffect, useState } from "react"

export const useDelay = (milliseconds: number, isActive?: boolean) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {

    if (isActive === false) {
      setActive(false);
      return;
    }

    setTimeout(() => {
        setActive(true);
    }, milliseconds);

  }, [milliseconds, isActive]);

  return active;
}