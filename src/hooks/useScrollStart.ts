import { useEffect } from "react";

export const useScrollStart = (isActive: boolean) => {
  useEffect(() => {

    if (!isActive) return;

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    }
  }, [isActive]);
}