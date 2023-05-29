import React, { FC } from "react";
import Container from "../Container/Container";
import { maxWidth } from "@/helpers/constants";
import Image from "next/image";
import chat from "@/assets/chat.svg";
import logo from "@/assets/logo.svg";
import Button from "../UI/Button/Button";
import Link from "next/link";
import Title from "../UI/Title/Title";
import { footerNavbar } from "@/helpers/data/footerNavbar";
import CustomLink from "../UI/CustomLink/CustomLink";
import s from "./Footer.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import Accordion from "../UI/Accordion/Accordion";
import { footerSocialNetworks } from "@/helpers/data/footerSocialNetworks";

interface Props {

}

const Footer: FC<Props> = ({ }) => {

  const isSmaller = useSmallerDevice(767);

  return (
    <Container maxWidth={maxWidth}>
      <footer className={s.footer}>
        <div className={s.contacts}>
          <div className={s.socialNetworksContainer}>
            {
              footerSocialNetworks.map(socialNetwork => (
                <CustomLink key={socialNetwork.alt} href="/">
                  <Image src={socialNetwork.src} alt={socialNetwork.alt} />
                </CustomLink>
              ))
            }
          </div>
          <Button value="Нужна помощь?" bgColor="accent" img={chat} />
        </div>
        <CustomLink href="/admin" className={s.adminLink}>Админ</CustomLink>
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
