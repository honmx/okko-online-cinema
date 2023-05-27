import React, { FC, useEffect, useState } from "react";
import IconButton from "../IconButton/IconButton";
import Image from "next/image";
import close from "../../../assets/close.svg";
import s from "./AutoSuggestModal.module.scss";
import InputField from "../InputField/InputField";
import $entitiesAPI from "@/http/entities";
import { IPerson } from "@/types/IPerson";
import entitiesService from "@/services/entitiesService";
import PersonAutoSuggestCard from "@/components/PersonAutoSuggestCard/PersonAutoSuggestCard";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedActor, setSelectedProducer } from "@/store/slices/moviesFilterSlice";
import TextButton from "../TextButton/TextButton";
import { useScrollStart } from "@/hooks/useScrollStart";

interface Props {
  entitiyType: "Актёр" | "Режиссёр";
  onEntityClick: (value: string) => void;
  onClose: () => void;
  className?: string;
}

const AutoSuggestModal: FC<Props> = ({ entitiyType, onEntityClick, onClose, className }) => {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");
  const [persons, setPersons] = useState<IPerson[]>([]);

  useEffect(() => {

    const getPeople = async () => {
      const persons = await entitiesService.getPeople();
      setPersons(persons);
    }

    getPeople();

  }, []);

  const handleChange = (value: string) => {
    setValue(value);
  }

  const handlePersonClick = (person: IPerson) => {
    onEntityClick(person.fullName);
  }

  const handleClearClick = () => {
    onEntityClick("");
  }

  return (
    <div className={`${s.modalWrapper} ${className}`}>
      <div className={s.window}>
        <InputField
          type="text"
          placeholder="Введите имя"
          appearanceType="transparent"
          value={value}
          onChange={handleChange}
          className={s.input}
        />
        <div className={s.resultContainer}>
          {
            value.length > 0 && persons.length > 0 &&
            persons
              .filter(person => person.profession === entitiyType &&
                (person.fullName.toLowerCase().includes(value.trim().toLowerCase())
                  || person.fullNameOrig.toLowerCase().includes(value.trim().toLowerCase())))
              .slice(0, 18)
              .map(person => (
                <PersonAutoSuggestCard key={person.id} person={person} onClick={handlePersonClick} className={s.person} />
              ))
          }
        </div>
        <IconButton onClick={onClose} className={s.closeBtn}>
          <Image src={close} alt="close" />
        </IconButton>
        <IconButton onClick={onClose} className={s.closeBtn}>
          <Image src={close} alt="close" />
        </IconButton>
        <TextButton fs="16px" onClick={handleClearClick} className={s.clearBtn}>Очистить</TextButton>
      </div>
    </div>
  )
};

export default AutoSuggestModal;
