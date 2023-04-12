import { useEffect, useState } from "react"

export const useSmallerDevice = (maxWidth: number) => {

  const [isSmaller, setisSmaller] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < maxWidth) {
        setisSmaller(true);
      } else {
        setisSmaller(false);
      }
    }

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return isSmaller;
} 