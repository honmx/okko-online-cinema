import React, { FC, ReactElement, ReactNode } from "react";
import s from "./Tabs.module.scss";

interface Props {
  tabs: string[];
  tabIndex: number;
  onChange: (value: number) => void;
  children: ReactNode[];
}

const Tabs: FC<Props> = ({ tabs, tabIndex, onChange, children }) => {

  console.log(children);

  return (
    <div className={s.tabsContainer}>
      <div className={s.tabsHeader}>
        {
          tabs.map((tab, i) => (
            <button className={`${s.tab} ${i === tabIndex ? s.active : ""}`} onClick={() => onChange(i)}>{tab}</button>
          ))
        }
      </div>
      <div className={s.tabsBody}>
        {
          children &&
          children[tabIndex]
        }
      </div>
    </div >
  )
};

export default Tabs;
