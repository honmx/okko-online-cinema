import React, { FC } from "react";
import s from "./BreadCrumbs.module.scss";
import CustomLink from "../CustomLink/CustomLink";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/slices/moviesFilterSlice";



interface Props {
  values: {
    value: string;
    href: string;
  }[];
  onClick?: () => void;
  className?: string;
}

const BreadCrumbs: FC<Props> = ({ values, onClick, className }) => {

  const dispatch = useAppDispatch();

  return (
    <div className={`${s.container} ${className}`}>
      {
        values.map((value, i) =>
          <div key={i} onClick={onClick} className={s.breadCrumb}>
            <CustomLink href={value.href} isDisabled={i === values.length - 1}>{value.value}</CustomLink>
            {
              i !== values.length - 1 &&
              <p className={s.divider}>/</p >
            }
          </div>)
      }
    </div >
  )
};

export default BreadCrumbs;
