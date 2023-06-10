import { FC } from 'react';
import s from './Subscription.module.scss';
import Button from '../UI/Button/Button';
import { useTranslation } from 'next-i18next';

interface Props {

}

const Subscription: FC<Props> = ({ }) => {

  const { t } = useTranslation("homepage");

  return (
    <section className={s.container}>
      <div className={s.pic}></div>
      <div className={s.block}>
        <div className={s.text}>
          <h1 className={s.title}>{t("subsciption")}</h1>
          <p className={s.descrptn}>{t("subscriptionDescription")}</p>
        </div>
        <div className={s.prices}>
          <span className={s.price}>{t("price")}</span>
          <span className={s.price}>{t("nextPrice")}</span>
        </div>
        <div className={s.buttons}>
          <div className={s.button}>
            <Button bgColor="accent" className={s.subscribeButton}>{t("subscribe")}</Button>
          </div>
          <div className={s.button}>
            <Button className={s.subscribeButton}>{t("more")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
