import { ChangeEvent, useState } from "react"
import useValidation from "./useValidation";
import { IValidationForm } from "../type/main";

const useInput = (initialValue: string, validations: IValidationForm) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setDirty(true)
  }

  return {
    value,
    isDirty,
    setValue,
    onChange,
    onBlur,
    ...valid
  }
}

export default useInput;
