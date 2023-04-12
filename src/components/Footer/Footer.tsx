import React, { FC } from "react";
import Container from "../Container/Container";
import { maxWidth } from "@/helpers/constants";
import Image from "next/image";
import vk from "@/assets/vk.svg";
import viber from "@/assets/viber.svg";
import odnoklassniki from "@/assets/odnoklassniki.svg";
import telegram from "@/assets/telegram.svg";
import youtube from "@/assets/youtube.svg";
import chat from "@/assets/chat.svg";
import logo from "@/assets/logo.svg";
import Button from "../UI/Button/Button";
import Title from "../UI/Title/Title";
import Link from "next/link";
import { footerNavbar } from "@/helpers/data/footerNavbar";
import CustomLink from "../UI/CustomLink/CustomLink";
import s from "./Footer.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import Accordion from "../UI/Accordion/Accordion";

interface Props {

}

const Footer: FC<Props> = ({ }) => {

  const isSmaller = useSmallerDevice(767);

  return (
    <Container maxWidth={maxWidth}>
      <footer className={s.footer}>
        <div className={s.contacts}>
          <div className={s.socialNetworksContainer}>
            <Link href="/">
              <Image src={vk} alt="vk" />
            </Link>
            <Link href="/">
              <Image src={viber} alt="viber" />
            </Link>
            <Link href="/">
              <Image src={odnoklassniki} alt="odnoklassniki" />
            </Link>
            <Link href="/">
              <Image src={telegram} alt="telegram" />
            </Link>
            <Link href="/">
              <Image src={youtube} alt="youtube" />
            </Link>
          </div>
          <Button value="Нужна помощь?" bgColor="accent" img={chat} />
        </div>
        <div className={s.navbar}>
          {
            footerNavbar.map(block => (
              <div key={block.title} className={s.block}>
                {
                  !isSmaller &&
                  <>
                    <Title>{block.title}</Title>
                    {
                      block.links.map(link => <CustomLink key={link.name} href={link.to}>{link.name}</CustomLink>)
                    }
                  </>
                }
                {
                  isSmaller &&
                  <Accordion title={block.title}>
                    {
                      block.links.map(link => <CustomLink key={link.name} href={link.to}>{link.name}</CustomLink>)
                    }
                  </Accordion>
                }
              </div>
            ))
          }
        </div>
        <div className={s.rightsContainer}>
          <div className={s.logoWrapper}>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          <div className={s.rights}>
            <p className={s.right}>© 2012-2023 ООО «Окко» 18+</p>
            <p className={s.right}>Общероссийские каналы доступны для бесплатного просмотра круглосуточно</p>
            <div className={s.links}>
              <CustomLink href="/">Пользовательские соглашения</CustomLink>
              <CustomLink href="/">Политика конфиденциальности</CustomLink>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  )
};

export default Footer;
