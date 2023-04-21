import React, {FC, useEffect, useState} from 'react';
import close from '@/assets/close.svg';
import s from "./SubscriptionSection.module.scss";
import Image from "next/image";
import visa from '@/assets/payment/visa.svg';
import mir from '@/assets/payment/mir.svg';
import mastercard from '@/assets/payment/mastercard.svg';
import cards from '@/assets/payment/two_cards.svg';
import lock from '@/assets/payment/lock.svg';
import mastercard_secure  from '@/assets/payment/mastercard_securecode.svg';
import visa_secure  from '@/assets/payment/verified_by_visa.svg';
import IconButton from "@/components/UI/IconButton/IconButton";
import Title from "@/components/UI/Title/Title";


type SubscriptionProps = {
  onClose: () => void;
}

const SubscriptionSection: FC<SubscriptionProps> = ({onClose}) => {

  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <div className={s.subscription}>
      <div className={s.subscription__close} onClick={handleCloseClick}>
        <IconButton>
          <Image width={16} height={16} alt={close} src={close}/>
        </IconButton>
      </div>
      <div className={s.subscription__block}>
        <div className={s.subscription__block_title}>
          <Title variant={"h2"} fw={700} children={"ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ"} />
        </div>

        <div className={s.subscription__block_top}>
          <div className={s.subscription__block_top_main}>
            <div className={s.subscription__block_top_main_title}>
              <Title variant={"h4"} fw={600} children={"Подписка Оптимум"} />
            </div>
            <div className={s.subscription__block_top_advantages}>
              <div className={s.subscription__block_top_advantages_price}>
                <span>
                  Стоимость
                </span>
                <span>
                  <span className={s.subscription__block_top_advantages_price_yellow}>Месяц за 1 ₽, затем месяц за 199 ₽,</span> дальше — 399/месяц
                </span>
              </div>
              <div className={s.subscription__block_top_advantages_line}></div>
              <div className={s.subscription__block_top_advantages_pay}>
                <span>
                  К оплате:
                </span>
                <span>
                  1 ₽
                </span>
              </div>
              <div className={s.subscription__block_top_advantages_additionally}>
                <span>
                  Подписка продлится автоматически. Мы уведомим о продлении за 3 дня. Отменить подписку можно в любой момент
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*todo вынести в отедльный компанент*/}
        <div className={s.subscription__block_main}>
          <div className={s.subscription__block_main_container}>
            <div>
              <span>Оплата в размере 1 ₽ будет произведена с карты, средства будут списаны мгновенно и без комиссии</span>
            </div>
            <div>
              <div className={s.subscription__block_main_container_form}>
                <form onSubmit={handleSubmit}>
                  <div className={s.subscription__block_main_container_form_card_name}>
                    <div className={s.subscription__block_main_container_form_card_name_input}>
                      <label htmlFor="cardNumber"></label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        placeholder="Номер карты"
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className={s.subscription__block_main_container_form_card_name_images}>
                      <Image width={45} height={45} src={visa} alt={visa}/>
                      <Image width={45} height={45} src={mir} alt={mir}/>
                      <Image width={38} height={38} src={mastercard} alt={mastercard}/>
                    </div>
                  </div>
                  <div className={s.subscription__block_main_container_form_card_bottom}>
                    <div className={s.subscription__block_main_container_form_card_bottom_date}>
                      <label htmlFor="expirationMonth"></label>
                      <input
                        type="text"
                        id="expirationMonth"
                        value={expirationMonth}
                        placeholder="ММ"
                        onChange={(e) => setExpirationMonth(e.target.value)}
                      />
                      <label htmlFor="expirationYear"></label>
                      <input
                        type="text"
                        id="expirationYear"
                        value={expirationYear}
                        placeholder="ГГ"
                        onChange={(e) => setExpirationYear(e.target.value)}
                      />
                    </div>
                    <div className={s.subscription__block_main_container_form_card_bottom_code}>
                      <label htmlFor="securityCode"></label>
                      <input
                        type="text"
                        id="securityCode"
                        value={securityCode}
                        placeholder="Код CVV"
                        onChange={(e) => setSecurityCode(e.target.value)}
                      />
                      <Image width={38} height={38} src={cards} alt={cards}/>
                    </div>
                  </div>
                  {/*todo заменить на Button*/}
                  <div className={s.subscription__block_main_container_form_button}>
                    <button disabled={true}
                            type="submit">Продолжить
                    </button>
                  </div>
                  <div className={s.subscription__block_main_container_form_version}>
                    <p >v:3.154.1</p>
                  </div>
                </form>
                <div className={s.subscription__block_main_container_after}>
                  <p>Персональная информация хранится исключительно банком. Okko поддерживает 128-битное
                    SSL-шифрование для безопасности. Информация, переданная в Okko,
                    в безопасности и защищена специальными средствами.</p>
                  <div className={s.subscription__block_main_container_after_images}>
                    <Image width={30} height={30} src={lock} alt={lock}></Image>
                    <Image width={70} height={70} src={visa_secure} alt={visa_secure}></Image>
                    <Image width={70} height={70} src={mastercard_secure} alt={mastercard_secure}></Image>
                  </div>
                </div>
              </div>
              <div className={s.subscription__block_main_container_bonus}>
                <span>
                  {/*todo сделать при клике на "?" div'ку и переключение в useState*/}
                  Обменивать бонусы «СберСпасибо» на скидку при оплате подписки ?
                </span>
                <div>
                  {/*todo сделать в UI Toggle checkbox*/}
                  <span>Вкл / выкл</span>
                </div>
              </div>
              <div className={s.subscription__block_main_container_rules}>
                <p>
                  Нажимая на кнопку «ВКЛ» вы соглашаетесь с <a href="http://terms.okko.tv/spasibo_sberbank.pdf"> Правилами Акции.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubscriptionSection;