import { useEffect, useState } from "react"

export const useDelay = (milliseconds: number) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, milliseconds);
  }, [milliseconds]);

  return active;
}