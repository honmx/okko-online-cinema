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

  // const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
    
    // const a = async () => {
      //   const admin = await axios.post("http://localhost:5000/role", {
        //     value: "ADMIN",
        //     description: "Администратор",
        //   })
        
        //   const user = await axios.post("http://localhost:5000/role", {
          //     value: "USER",
    //     description: "Пользователь",
    //   });
    
    //   console.log(admin);
    //   console.log(user);
    // }

    // a();
  }, []);
  
  // useEffect(() => {
  //   if (localStorage.getItem("vkToken") && !isAuth) {
  //     window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.NEXT_PUBLIC_VK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}&display=page&scope=email&response_type=code&v=5.131`;
  //   }
  // }, [isAuth]);
  
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
