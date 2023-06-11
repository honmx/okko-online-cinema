import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import Container from "../Container/Container";
import Button from "../UI/Button/Button";
import Title from "../UI/Title/Title";
import CustomLink from "../UI/CustomLink/CustomLink";
import Accordion from "../UI/Accordion/Accordion";
import { maxWidth } from "@/helpers/constants";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { footerSocialNetworks } from "@/helpers/data/footerSocialNetworks";
import { useAppSelector } from "@/store/hooks";
import chat from "@/assets/chat.svg";
import logo from "@/assets/logo.svg";
import s from "./Footer.module.scss";

interface Props {

}

const Footer: FC<Props> = ({ }) => {

  const { t } = useTranslation("footer");

  const { isAuth, user } = useAppSelector(state => state.auth);

  const isSmaller = useSmallerDevice(767);

  const footerNavbar = [
    {
      title: "Okko",
      links: [
        {
          name: t("footer:okko.about"),
          to: "https://okko.tv/about",
        },
        {
          name: t("footer:okko.blog"),
          to: "https://okko.tv/blog",
        },
        {
          name: t("footer:okko.career"),
          to: "https://okko.tv/careers",
        },
        {
          name: t("footer:okko.agents"),
          to: "https://agents.okko.tv",
        },
      ]
    },
    {
      title: t("footer:help.title"),
      links: [
        {
          name: t("footer:help.faq"),
          to: "https://help.okko.tv",
        },
        {
          name: t("footer:help.devices"),
          to: "https://okko.tv/devices",
        },
        {
          name: t("footer:help.distributors"),
          to: "https://promo.okko.tv/partner",
        },
        {
          name: t("footer:help.contacts"),
          to: "https://okko.tv/contact",
        },
      ]
    },
    {
      title: t("footer:other.title"),
      links: [
        {
          name: t("footer:other.promotions"),
          to: "https://okko.tv/promos",
        },
        {
          name: t("footer:other.certificates"),
          to: "https://promo.okko.tv/sertificates",
        },
      ]
    },
  ];

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
          <Button bgColor="accent" img={chat}>{t("footer:helpButton")}</Button>
        </div>
        {
          isAuth && user.roles.some(role => role.value === "ADMIN") &&
          <CustomLink href="/admin" className={s.adminLink}>{t("footer:admin")}</CustomLink>
        }
        <div className={s.navbar}>
          {
            footerNavbar.map(block => (
              <div key={block.title} className={s.block}>
                {
                  !isSmaller &&
                  <>
                    <Title>{block.title}</Title>
                    {
                      block.links.map(link => <CustomLink key={link.name} href={link.to} target="_blank">{link.name}</CustomLink>)
                    }
                  </>
                }
                {
                  isSmaller &&
                  <Accordion title={block.title}>
                    {
                      block.links.map(link => <CustomLink key={link.name} href={link.to} target="_blank">{link.name}</CustomLink>)
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
            <p className={s.right}>{t("footer:rights.period")}</p>
            <p className={s.right}>{t("footer:rights.channels")}</p>
            <div className={s.links}>
              <CustomLink href="/">{t("footer:rights.userAgreement")}</CustomLink>
              <CustomLink href="/">{t("footer:rights.privacyPolicy")}</CustomLink>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  )
};

export default Footer;
