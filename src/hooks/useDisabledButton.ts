import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useDisabledButton = (value: string | string[]): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (typeof value === "string") {
      setIsDisabled(value.length < 3 || !value.includes("@"));
    } else {
        
      if (value.length === 1) {
        setIsDisabled(value.length < 3 || !value.includes("@"));
      }

      if (value.length === 2) {
        const [email, password] = value;
        
        setIsDisabled(
          (email.length < 3 || !email.includes("@"))
          || password === ""
        );
      }

      if (value.length === 3) {
        const [email, password, passwordRepeat] = value;
        
        setIsDisabled(
          (email.length < 3 || !email.includes("@"))
          || password === "" || password !== passwordRepeat
        );
      }
    }
  }, [value]);

  return [isDisabled, setIsDisabled];
}