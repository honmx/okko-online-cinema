import React, { FC, useState } from "react";
import Title from "../UI/Title/Title";
import Star from "../Star/Star";
import Button from "../UI/Button/Button";
import { useAppDispatch } from "@/store/hooks";
import { addNotification } from "@/store/slices/notificationSlice";
import check from "@/assets/check.svg";
import filledStar from "@/assets/filledStar.svg";
import s from "./Rate.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";

interface Props {
  className?: string;
}

const Rate: FC<Props> = ({ className }) => {

  const dispatch = useAppDispatch();

  const isSmaller = useSmallerDevice(599);

  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleActiveHoverIndexChange = (index: number | null) => {
    setActiveHoverIndex(index);
  }

  const handleActiveIndexChange = (index: number) => {
    setActiveIndex(index);
    dispatch(addNotification({
      text: "Спасибо! Учтём эту оценку в рекомендациях для вас",
      image: filledStar
    }))
  }

  const handleDeleteRateClick = () => {
    setActiveIndex(null);
    dispatch(addNotification({
      text: "Мы удалили вашу оценку",
      image: check
    }));
  }

  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={s.rateContainer}>
        {
          activeIndex === null
            ? <Title className={s.title} fs={isSmaller ? "20px" : "26px"}>Поставьте оценку</Title>
            : <Title className={s.title} fs={isSmaller ? "20px" : "26px"}>Ваша оценка {activeIndex + 1}</Title>
        }
        <p className={s.subtitle}>Оценки улучшают ваши рекомендации</p>
        <div className={s.rate}>
          {
            Array(10).fill("").map((value, i) => (
              <Star
                key={i}
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
    </div>
  )
};

export default Rate;
