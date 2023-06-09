import React, { FC, useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import InputField from "../UI/InputField/InputField";
import TextButton from "../UI/TextButton/TextButton";
import Modal from "../UI/Modal/Modal";
import PersonAutoSuggestCard from "@/components/PersonCard/PersonCard";
import { IPerson } from "@/types/IPerson";
import entitiesService from "@/services/entitiesService";
import { useAppDispatch } from "@/store/hooks";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { useDebounce } from "@/hooks/useDebounce";
import s from "./AutoSuggestModal.module.scss";

interface Props {
  entitiyType: "Актёр" | "Режиссёр";
  onEntityClick: (value: string) => void;
  onClose: () => void;
  className?: string;
}

const AutoSuggestModal: FC<Props> = ({ entitiyType, onEntityClick, onClose, className }) => {

  const { t } = useTranslation("moviesPage");
  
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
        || person.fullNameOrig?.toLowerCase().includes(value.toLowerCase()))))
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
    <Modal onClose={onClose}>
      <InputField
        type="text"
        placeholder={t("autoSuggestPlaceholder")}
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
      <TextButton fs={isSmaller ? "12px" : "16px"} onClick={handleClearClick} className={s.clearBtn}>{t("clearAutoSuggest")}</TextButton>
    </Modal>
  )
};

export default AutoSuggestModal;
