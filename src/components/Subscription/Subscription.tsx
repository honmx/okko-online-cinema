import style from './Subscription.module.scss';
import Button from '../UI/Button/Button';

const Subscription = () => {
  return (
    <section className={style.container}>
      <div className={style.pic}></div>
      <div className={style.block}>
        <div className={style.text}>
          <h1 className={style.title}>Подписка Оптимум</h1>
          <p className={style.descrptn}>Смотрите кино, сериалы и мультфильмы</p>
        </div>
        <div className={style.prices}>
          <span className={style.price}>
            Месяц за 1 ₽, затем месяц за 199 ₽
          </span>
          <span className={style.price}>дальше — 399 ₽⁠/⁠месяц</span>
        </div>
        <div className={style.buttons}>
          <div className={style.button}>
            <Button value={'Оформить подписку'} bgColor={'accent'} className={style.subscribeButton} />
          </div>
          <div className={style.button}>
            <Button value={'Подробнее'} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
