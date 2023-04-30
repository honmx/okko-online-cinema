import React, { FC, ReactNode } from "react";
import s from "./Layout.module.scss";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import { maxWidth } from "@/helpers/constants";
import { Roboto } from "next/font/google";
import Header from "../Header/Header";
import Notification from "../UI/Notification/Notification";
import { useAppSelector } from "@/store/hooks";

interface Props {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
})

const Layout: FC<Props> = ({ children }) => {

  const notifications = useAppSelector(state => state.notifications.notifications);

  return (
    <div className={`${s.container} ${roboto.className}`}>
      <Container maxWidth={maxWidth}>
        <Header />
      </Container>
      <main className={s.main}>
        <div className={s.notifications}>
          {
            notifications &&
            notifications
              .slice(0)
              .reverse()
              .map(value => <Notification key={value.id} notification={value} />)
          }
        </div>
        <Container maxWidth={maxWidth}>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
