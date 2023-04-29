import { RefObject, useEffect, useState } from "react";

export const useHover = (
  ref: RefObject<HTMLDivElement>,
  index: number,
  setActiveIndex?: (value: number | null) => void,
  setActiveHoverIndex?: (value: number | null) => void,
) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseOver = () => {
      setIsHovered(true);
      setActiveHoverIndex && setActiveHoverIndex(index);
    }

    const handleMouseOut = () => {
      setIsHovered(false);
      setActiveHoverIndex && setActiveHoverIndex(null);
    }

    const handleClick = () => {
      setActiveIndex && setActiveIndex(index);
    }

    ref.current?.addEventListener("mouseover", handleMouseOver);
    ref.current?.addEventListener("mouseout", handleMouseOut);
    ref.current?.addEventListener("click", handleClick);
    
    return () => {
      ref.current?.removeEventListener("mouseover", handleMouseOver);
      ref.current?.removeEventListener("mouseout", handleMouseOut);
      ref.current?.removeEventListener("click", handleClick);
    }
  }, [ref.current]);

  return isHovered;
}