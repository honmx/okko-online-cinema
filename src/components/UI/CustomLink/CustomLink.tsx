import React, { FC, ReactNode } from "react";
import s from "./CustomLink.module.scss";
import Link from "next/link";

interface Props {
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  className?: string;
  children: ReactNode;
}

const CustomLink: FC<Props> = ({ href, target, className, children }) => {
  return (
    <div className={`${s.linkContainer} ${className}`}>
      <Link href={href} target={target && target}>{children}</Link>
    </div>
  )
};

export default CustomLink;
