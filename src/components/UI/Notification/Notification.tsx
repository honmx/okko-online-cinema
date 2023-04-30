import React, { FC, useEffect } from "react";
import Image from "next/image";
import s from "./Notification.module.scss";
import { useDelay } from "@/hooks/useDelay";
import { useAppDispatch } from "@/store/hooks";
import { deleteNotification } from "@/store/slices/notificationSlice";
import { INotification } from "@/types/INotification";

interface Props {
  notification: INotification;
}

const Notification: FC<Props> = ({ notification }) => {

  const dispatch = useAppDispatch();

  const active = useDelay(2000);

  useEffect(() => {
    if (!active) return;

    dispatch(deleteNotification(notification.id));
  }, [active]);

  return (
    <div className={`${s.notificationContainer} ${active ? s.hidden : ""}`}>
      {
        notification.image &&
        <div className={s.imgWrapper}>
          <Image src={notification.image.src} alt="notification image" width={20} height={20} />
        </div>
      }
      <div className={s.textContainer}>
        <p className={s.text}>{notification.text}</p>
      </div>
    </div>
  )
};

export default Notification;
