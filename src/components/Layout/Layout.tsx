import React, { FC, ReactNode, useEffect } from "react";
import { Roboto } from "next/font/google";
import NotFound from "@/pages/404";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Header from "../Header/Header";
import Notification from "../UI/Notification/Notification";
import { maxWidth } from "@/helpers/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/thunks/checkAuth";
import $commentsAPI from "@/http/comments";
import s from "./Layout.module.scss";
import axios from "axios";

interface Props {
  children: ReactNode;
  isOnlyAdmin?: boolean | undefined;
}

const roboto = Roboto({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
})

const Layout: FC<Props> = ({ children, isOnlyAdmin }) => {

  const dispatch = useAppDispatch();

  const { isAuth, user } = useAppSelector(state => state.auth);
  const notifications = useAppSelector(state => state.notifications.notifications);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    const createRoles = async () => {
      try {
        const adminResponse = await axios.post(
          "http://localhost:5000/role",
          {
            value: "ADMIN",
            description: "Администратор"
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
        const response = await axios.post(
          "http://localhost:5000/role",
          {
            value: "USER",
            description: "Пользователь"
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      } catch (error) {}
    }

    createRoles();
  }, []);

  return (
    <div className={`${s.container} ${roboto.className}`}>
      <Container maxWidth={maxWidth}>
        <Header />
      </Container>
      <main className={s.main}>
        {
          isOnlyAdmin && (isAuth && user.roles.length > 0 && !user.roles.some(role => role.value === "ADMIN") || !isAuth)
            ? <NotFound />
            : <>
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
            </>
        }
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
