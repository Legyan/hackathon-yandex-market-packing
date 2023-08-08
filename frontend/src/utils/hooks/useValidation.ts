import { useState, useEffect } from "react"
import { IValidationForm } from "../type/main";

const useValidation = (value: string, validations: IValidationForm) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);

  let minLength = validations.minLength;

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
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (isEmpty || isError || minLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isError, minLengthError])

  return {
    isEmpty,
    isError,
    inputValid,
    minLength,
    minLengthError
  }
}

export default useValidation;
