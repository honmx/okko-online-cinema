import { useEffect, useRef, useState } from "react";

export const useCarouselScroll = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  const [isAbleToScrollLeft, setIsAbleToScrollLeft] = useState<boolean>(false);
  const [isAbleToScrollRight, setIsAbleToScrollRight] = useState<boolean>(true);

  useEffect(() => {

    const onScroll = () => {

      if (!ref.current) return;

      ref.current.scrollLeft > 5
        ? setIsAbleToScrollLeft(true)
        : setIsAbleToScrollLeft(false);

      ref.current.scrollWidth <= ref.current.clientWidth + ref.current.scrollLeft + 5
        ? setIsAbleToScrollRight(false)
        : setIsAbleToScrollRight(true);
    }

    ref.current?.addEventListener("scroll", onScroll);

    return () => ref.current?.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, isAbleToScrollLeft, isAbleToScrollRight };
}