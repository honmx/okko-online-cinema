import React, {FC, useEffect} from 'react';
import close from '@/assets/close.svg';
import s from "./Promocode.module.scss";
import Image from "next/image";
import devices from "@/assets/promo/devices.png";
import arrow from '@/assets/promo/arrow-down.svg';
import volume from '@/assets/promo/volume.svg';
import monitor from "@/assets/promo/monitor.svg";
import plus from "@/assets/promo/plus.svg";


import IconButton from "@/components/UI/IconButton/IconButton";
import Title from "@/components/UI/Title/Title";

type PromocodeProps = {
  onClose: () => void;
}

const Promocode: FC<PromocodeProps> = ({onClose}) => {

  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={s.promo}>
      <div className={s.promo__close} onClick={handleCloseClick}>
        <IconButton>
          <Image width={16} height={16} alt={close} src={close}/>
        </IconButton>
      </div>
      <div className={s.promo__block}>
        <div className={s.promo__block_title}>
          <Title variant={"h2"} children={"АКТИВАЦИЯ ПРОМОКОДА"} />

        </div>
        <div className={s.promo__block_main}>
          <section className={s.promo__block_main_steps}>
            <div>
              <span className={s.promo__block_main_steps_number}>
                Шаг 1
              </span>
              <div className={s.promo__block_main_steps_title}>
                <Title variant={"h3"} fw={600} children={"Введите промокод"} />
              </div>
              <form>
                <div className={s.promo__block_main_steps_input}>
                  <input placeholder="Промокод"/>
                </div>
                <div className={s.promo__block_main_steps_button}>
                  {/*todo заменить на Button*/}
                  <button disabled={true}>Активировать</button>
                </div>
              </form>
              <div className={s.promo__block_main_steps_support}>
                  <span>
                    {/*todo нужна ли CustomLink?*/}
                    Служба технической поддержки: <a href="mailto: mail@okko.tv">mail@okko.tv</a> или бесплатно <br /> по телефону в России — 8 800 700 55 33 <br/> и в Казахстане — 8 800 200 55 33
                  </span>
              </div>
            </div>
          </section>

          <section className={s.promo__block_main_advantages}>
            <div>
              <div className={s.promo__block_main_advantages_title}>
                <Title variant={"h3"} fw={600} children={"Преимущества Okko"} />
              </div>
              <div className={s.promo__block_main_advantages_images}>
                <Image src={devices} alt={"devices"}/>
                <ul>
                  <li>
                    <Image width={30} height={30} src={plus} alt="plus"/>
                    <span>
                      <strong>Премьеры</strong> каждый день и сотни подборок
                    </span>
                  </li>
                  <li>
                    <Image width={30} height={30} src={monitor} alt="monitor"/>
                    <span>
                      Доступ для всей семьи на <strong>5 устройствах</strong>
                    </span>
                  </li>
                  <li>
                    <Image width={30} height={30} src={arrow} alt="arrow"/>
                    <span>
                      <strong>Загрузка</strong> на мобильные устройства
                    </span>
                  </li>
                  <li>
                    <Image width={30} height={30} src={volume} alt="volume"/>
                    <span>
                      Смотрите <strong> на языке оригинала</strong> с субтитрами
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
export default Promocode;