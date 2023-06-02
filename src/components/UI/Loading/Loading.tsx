import React, { FC } from "react";
import s from "./Loading.module.scss";

interface Props {

}

const Loading: FC<Props> = ({ }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
};

export default Loading;
