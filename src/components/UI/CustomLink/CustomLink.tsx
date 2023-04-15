import React, { FC, ReactNode } from "react";
import s from "./CustomLink.module.scss";
import Link from "next/link";

interface Props {
  href: string;
  className?: string;
  children: ReactNode
}

const CustomLink: FC<Props> = ({ href, className, children }) => {
  return (
    <div className={`${s.linkContainer} ${className}`}>
      <Link href={href}>{children}</Link>
    </div>
  )
};

export default CustomLink;
