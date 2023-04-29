import React, { FC, useEffect, useState } from "react";
import Title from "../UI/Title/Title";
import s from "./Rate.module.scss";
import Star from "../Star/Star";
import Button from "../UI/Button/Button";

interface Props {
  className?: string;
}

const Rate: FC<Props> = ({ className }) => {

  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleActiveHoverIndexChange = (index: number | null) => {
    setActiveHoverIndex(index);
  }

  const handleActiveIndexChange = (index: number | null) => {
    setActiveIndex(prev => prev === index ? null : index);
  }
  
  const handleDeleteRateClick = () => {
    setActiveIndex(null);
  }

  return (
    <div className={`${s.rateContainer} ${className}`}>
      {
        activeIndex === null
          ? <Title className={s.title}>Поставьте оценку</Title>
          : <Title className={s.title}>Ваша оценка {activeIndex + 1}</Title>
      }
      <p className={s.subtitle}>Оценки улучшают ваши рекомендации</p>
      <div className={s.rate}>
        {
          Array(10).fill("").map((value, i) => (
            <Star
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={handleActiveIndexChange}
              activeHoverIndex={activeHoverIndex}
              setActiveHoverIndex={handleActiveHoverIndexChange}
            />
          ))
        }
      </div>
      {
        activeIndex !== null &&
        <Button value="Удалить" className={s.deleteButton} p="10px" onClick={handleDeleteRateClick} />
      }
    </div>
  )
};

export default Rate;
