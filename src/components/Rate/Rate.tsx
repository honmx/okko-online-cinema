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
import { useTranslation } from "next-i18next";

interface Props {
  className?: string;
}

const Rate: FC<Props> = ({ className }) => {

  const { t } = useTranslation("moviePage");

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
      text: t("moviePage:notifications.settingRate"),
      image: filledStar
    }))
  }

  const handleDeleteRateClick = () => {
    setActiveIndex(null);
    dispatch(addNotification({
      text: t("moviePage:notifications.deletingRate"),
      image: check
    }));
  }

  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={s.rateContainer}>
        {
          activeIndex === null
            ? <Title className={s.title} fs={isSmaller ? "20px" : "26px"}>{t("moviePage:rate")}</Title>
            : <Title className={s.title} fs={isSmaller ? "20px" : "26px"}>{t("moviePage:yourRate")} {activeIndex + 1}</Title>
        }
        <p className={s.subtitle}>{t("moviePage:rateAndRecs")}</p>
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
          <Button className={s.deleteButton} p="10px" onClick={handleDeleteRateClick}>{t("moviePage:delete")}</Button>
        }
      </div>
    </div>
  )
};

export default Rate;
