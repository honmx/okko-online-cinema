// import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
// import s from "./AdminGenreCard.module.scss";
// import { IGenre } from "@/types/IGenre";
// import IconButton from "../UI/IconButton/IconButton";
// import Image from "next/image";
// import pen from "@/assets/pen.svg";
// import Title from "../UI/Title/Title";
// import entitiesService from "@/services/entitiesService";
// import InputField from "../UI/InputField/InputField";
// import Button from "../UI/Button/Button";

// interface Props {
//   genreItem: IGenre
// }

// const AdminGenreCard: FC<Props> = ({ genreItem }) => {

//   const formRef = useRef<HTMLFormElement>(null);

//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const [inputGenre, setInputGenre] = useState<string>(genreItem.genre);
//   const [inputOriginalGenre, setInputOriginalGenre] = useState<string>(genreItem.genre || "");
//   const [genre, setGenre] = useState<string>(genreItem.genre);
//   const [originalGenre, setOriginalGenre] = useState<string>(genreItem.genre || "");

//   useEffect(() => {
//     if (!isEdit) return;

//     const firstInput = formRef.current?.firstElementChild?.firstElementChild as HTMLInputElement;
//     firstInput.focus();
//   }, [isEdit]);

//   const handleEditClick = () => {
//     setIsEdit(true);
//   }
  
//   const handleTitleChange = (value: string) => {
//     setInputGenre(value);
//   }

//   const handleOriginalTitleChange = (value: string) => {
//     setInputOriginalGenre(value);
//   }

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setIsEdit(false);

//     if (inputGenre === genre && inputOriginalGenre === originalGenre) return;

//     // const response = await entitiesService.updateMovie(
//     //   movie.id,
//     //   inputTitle,
//     //   inputOriginalTitle
//     // );

//     setGenre(inputGenre);
//     setOriginalGenre(inputOriginalGenre);
//   }

//   return (
//     <div className={s.genreCardContainer}>
//       {
//           !isEdit ? <>
//             <Title fs="14px" fw={400} className={s.title}>{title}</Title>
//             {
//               originalGenre &&
//               <Title fs="14px" fw={400} className={s.title}>{originalGenre}</Title>
//             }
//           </> : <>
//             <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
//               <InputField type="text" placeholder="title" value={inputGenre} onChange={handleTitleChange} />
//               <InputField type="text" placeholder="originalTitle" value={inputOriginalGenre} onChange={handleOriginalTitleChange} />
//               <Button value="Подтвердить" className={s.confirmBtn} />
//             </form>
//           </>
//         }
//       {
//           !isEdit &&
//           <IconButton onClick={handleEditClick} className={s.editBtn}>
//             <Image src={pen} alt="pen" />
//           </IconButton>
//         }
//     </div>
//   )
// };

// export default AdminGenreCard;
