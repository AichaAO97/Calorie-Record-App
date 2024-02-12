import { useState, useEffect, useReducer, useContext } from 'react';
import styles from './CalorieRecordEdit.module.css';
import { AppContext } from '../../AppContext';
import { useRef } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import { useCallback } from 'react';
import { useMemo } from 'react';

const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};

function formReducer(state, action) {
  const { key, value, auxValue } = action;

  let valid;
  switch (key) {
    case 'content':
      valid =
        (value === 'sport' && auxValue < 0) ||
        (value !== 'sport' && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };

    case 'calories':
      valid =
        (auxValue === 'sport' && value < 0) ||
        (auxValue !== 'sport' && value >= 0);
      return {
        ...state,
        calories: valid,
      };
    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}

function CalorieRecordEdit(props) {
  const {
    currentDate,
    isValidDate,
    currentDateStr,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);

  const [formState, dispachFn] = useReducer(formReducer, DEFAULT_VALUE);
  const { content: isContentValid, calories: isCaloriesValid } = formState;

  const contentRef = useRef();
  const mealRef = useRef();
  const caloriesRef = useRef();

  const isFormValid = useMemo(() => {
    return isValidDate && isContentValid && isCaloriesValid;
  }, [isValidDate, isContentValid, isCaloriesValid]);

  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
  }, [isContentValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealBlurHandler = (event) => {
    console.log(formState);
    dispachFn({
      key: 'meal',
      value: event.target.value,
    });
  };

  const onContentBlurHandler = (event) => {
    console.log(formState);
    dispachFn({
      key: 'content',
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };

  const onCaloriesBlurHandler = (event) => {
    dispachFn({
      key: 'calories',
      value: event.target.value,
      auxValue: contentRef.current.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };

  const onCancelHandler = useCallback(() => {
    if (isFormValid) {
      props.onCancel();
    }
  }, [isFormValid]);

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}> You spent {totalCalories}</p>

      <FormInput
        type="date"
        id="date"
        label="Date"
        isValid={isValidDate}
        value={currentDateStr}
        onChange={onDateChangeHandler}
      />
      <FormInput
        type="select"
        ref={mealRef}
        id="meal"
        label="Meal"
        onBlur={onMealBlurHandler}
        isValid>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>

      <FormInput
        type="text"
        id="content"
        label="Content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        type="number"
        id="calories"
        label="Calories"
        onBlur={onCaloriesBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />

      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button variant="secondary" type="button" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CalorieRecordEdit;
