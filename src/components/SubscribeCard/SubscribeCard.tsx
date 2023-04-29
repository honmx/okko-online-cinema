import React, { FC } from "react";
import s from "./SubscribeCard.module.scss";
import Title from "../UI/Title/Title";
import Button from "../UI/Button/Button";

interface Props {
  title: string;
  subtitle: string;
  accentText?: string;
  usualText: string;
  className?: string;
}

const SubscribeCard: FC<Props> = ({ title, subtitle, accentText, usualText, className }) => {
  return (
    <div className={`${s.subscribeCardContainer} ${className}`}>
      <div className={s.topItems}>
        <Title fs="18px" className={s.title}>{title}</Title>
        <p className={s.subtitle}>{subtitle}</p>
      </div>
      <div className={s.bottomItems}>
        <div className={s.price}>
          {
            accentText &&
            <p className={s.accentText}>{accentText}</p>
          }
          <p className={s.usualText}>{usualText}</p>
        </div>
        <Button value="Оформить" className={s.buyButton} />
      </div>
    </div>
  )
};

export default SubscribeCard;
