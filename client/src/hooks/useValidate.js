import React from 'react';

const useValidate = (inputValues, inputRefs) => {
  const { dateValues, addedList } = inputValues;

  const handleDateInput = () => {
    if (
      dateValues.year.length === 4 &&
      dateValues.month.length > 0 &&
      dateValues.month.length <= 2 &&
      dateValues.day.length > 0 &&
      dateValues.day.length <= 2 &&
      Number(dateValues.year) > 2023 &&
      Number(dateValues.month) > 0 &&
      Number(dateValues.month) <= 12 &&
      Number(dateValues.day) > 0 &&
      Number(dateValues.day) <= 31
    ) {
      return true;
    }
    if (dateValues.year.length !== 4 || Number(dateValues.year) <= 2023) {
      inputRefs[0].style.outline = '1px solid red';
    }
    if (
      dateValues.month.length <= 0 ||
      dateValues.month > 2 ||
      Number(dateValues.month) <= 0 ||
      Number(dateValues.month) > 12
    ) {
      inputRefs[1].style.outline = '1px solid red';
    }
    if (
      dateValues.day.length <= 0 ||
      dateValues.day.length > 2 ||
      Number(dateValues.day) <= 0 ||
      Number(dateValues.day) > 31
    ) {
      inputRefs[2].style.outline = '1px solid red';
    }
  };

  const handleListInput = () => {
    if (addedList.length > 0) {
      return true;
    } else {
      inputRefs[3].style.outline = '1px solid red';
    }
  };

  return { handleDateInput, handleListInput };
};

export default useValidate;
