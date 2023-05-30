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
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  entitiyType: "Актёр" | "Режиссёр";
  onEntityClick: (value: string) => void;
  onClose: () => void;
  className?: string;
}

const AutoSuggestModal: FC<Props> = ({ entitiyType, onEntityClick, onClose, className }) => {

  const dispatch = useAppDispatch();

  const isSmaller = useSmallerDevice(519);

  const [value, setValue] = useState<string>("");
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<IPerson[]>(persons);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const getPeople = async () => {
      const persons = await entitiesService.getPeople();
      setPersons(persons);
    }

    getPeople();
  }, []);

  useEffect(() => {
    setFilteredPersons(persons.filter(person => person.profession === entitiyType &&
      (person.fullName.toLowerCase().includes(value.toLowerCase())
        || person.fullNameOrig.toLowerCase().includes(value.toLowerCase()))))
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setValue(value.trim());
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
            persons.length > 0 &&
            filteredPersons
              .map(person => (
                <PersonAutoSuggestCard key={person.id} person={person} onClick={handlePersonClick} className={s.person} />
              ))
          }
        </div>
        {/* <IconButton onClick={onClose} className={s.closeBtn}>
          <Image src={close} alt="close" />
        </IconButton> */}
        <TextButton fs={isSmaller ? "12px" : "16px"} onClick={handleClearClick} className={s.clearBtn}>Очистить</TextButton>
      </div>
      <IconButton onClick={onClose} className={s.closeBtn}>
        <Image src={close} alt="close" />
      </IconButton>
    </div>
  )
};

export default AutoSuggestModal;
