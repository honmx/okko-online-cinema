import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      handler();
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);
}