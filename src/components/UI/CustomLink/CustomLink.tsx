import React, { FC, ReactNode } from "react";
import s from "./CustomLink.module.scss";
import Link from "next/link";

interface Props {
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
}

const CustomLink: FC<Props> = ({ href, target, isDisabled, className, children }) => {
  return (
    <div className={`${s.linkContainer} ${className} ${isDisabled ? s.disabled : ""}`}>
      <Link href={href} target={target && target} className={s.link}>{children}</Link>
    </div>
  )
};

export default CustomLink;
