import React, { FC, ReactNode, useEffect } from "react";
import s from "./Layout.module.scss";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import { maxWidth } from "@/helpers/constants";
import { Roboto } from "next/font/google";
import Header from "../Header/Header";
import Notification from "../UI/Notification/Notification";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/thunks/checkAuth";
import $authAPI from "@/http/auth";
import axios from "axios";
import $commentsAPI from "@/http/comments";

interface Props {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
})

const Layout: FC<Props> = ({ children }) => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  // adding roles to user with user id
  // useEffect(() => {
    
  //   if (!user.id) return;

  //   const a = async () => {
  //     const response = await $commentsAPI.post(`/user/addrole/${user.id}`);
  //     console.log(response);

  // //     const response = await $commentsAPI.post("/role", {
  // //       value: "ADMIN",
  // //       description: "Администратор"
  // //     })

  // //     const response2 = await $commentsAPI.post("/role", {
  // //       value: "USER",
  // //       description: "Пользователь"
  // //     })
  // //     console.log(response.data);
  //   }

  //   a();
  // }, [user]);
  
  // creating roles
  useEffect(() => {
    const a = async () => {
      const response = await $commentsAPI.post("role", {
        value: "USER",
        description: "Пользователь"
      });

      console.log(response.data);
    }

    // a();
  }, []);
  
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
