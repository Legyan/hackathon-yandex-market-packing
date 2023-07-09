import { useState, useEffect } from "react"
import { IValidationForm } from "../type/main";

const useValidation = (value: string, validations: IValidationForm) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break
        case 'table':
          validations.table !== value ? setError(true) : setError(false)
          break
        case 'printer':
          validations.printer !== value ? setError(true) : setError(false)
          break
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (isEmpty || isError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isError])

  return {
    isEmpty,
    isError,
    inputValid
  }
}

export default useValidation;
