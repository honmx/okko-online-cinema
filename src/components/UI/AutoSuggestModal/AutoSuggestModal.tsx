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

interface Props {
  entitiyType: "Актёр" | "Режиссёр";
  onClose: () => void;
  className?: string;
}

const AutoSuggestModal: FC<Props> = ({ entitiyType, onClose, className }) => {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");
  const [persons, setPersons] = useState<IPerson[]>([]);

  useEffect(() => {

    const getPeople = async () => {
      const persons = await entitiesService.getPeople();
      console.log(persons);
      setPersons(persons);
    }

    getPeople();

  }, []);

  const handleChange = (value: string) => {
    setValue(value.trim());
  }

  const handlePersonClick = (person: IPerson) => {
    entitiyType === "Актёр"
      ? dispatch(setSelectedActor(person.fullName))
      : dispatch(setSelectedProducer(person.fullName));

    onClose();
  }

  const handleClearClick = () => {
    entitiyType === "Актёр"
      ? dispatch(setSelectedActor(""))
      : dispatch(setSelectedProducer(""));

    onClose();
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
                (person.fullName.toLowerCase().includes(value.toLowerCase())
                  || person.fullNameOrig.toLowerCase().includes(value.toLowerCase())))
              .slice(0, 18)
              .map(person => (
                <PersonAutoSuggestCard person={person} onClick={handlePersonClick} className={s.person} />
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
