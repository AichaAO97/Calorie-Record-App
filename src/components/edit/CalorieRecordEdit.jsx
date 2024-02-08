import { useState, useEffect, useReducer, useContext } from 'react';
import styles from './CalorieRecordEdit.module.css';
import { AppContext } from '../../AppContext';

const DEFAULT_VALUE = {
  meal: { value: 'Breakfast', valid: true },
  content: { value: '', valid: false },
  calories: { value: 0, valid: true },
};

function formReducer(state, action) {
  const { type, key, value } = action;
  if (type === 'RESET') {
    return DEFAULT_VALUE;
  }
  let valid;
  switch (key) {
    case 'content':
      valid =
        (value === 'sport' && state.calories.value < 0) ||
        (value !== 'sport' && state.calories.value >= 0);
      return {
        ...state,
        content: { value, valid: !!value },
        calories: { ...state.calories, valid },
      };

    case 'calories':
      valid =
        (state.content.value === 'sport' && value < 0) ||
        (state.content.value !== 'sport' && value >= 0);
      return {
        ...state,
        calories: { value, valid },
      };
    default:
      return {
        ...state,
        [key]: { value, valid: !!value },
      };
  }
}

function CalorieRecordEdit(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    currentDate,
    isValidDate,
    currentDateStr,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [formState, dispachFn] = useReducer(formReducer, DEFAULT_VALUE);
  const {
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isValidDate && isContentValid && isCaloriesValid);
  }, [isValidDate, isContentValid, isCaloriesValid]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      ...Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {}),
    });
    dispachFn({ type: 'RESET' });
  };

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealChangeHandler = (event) => {
    dispachFn({
      type: 'UPDATE_FIELD',
      key: 'meal',
      value: event.target.value,
    });
  };

  const onContentChangeHandler = (event) => {
    dispachFn({
      type: 'UPDATE_FIELD',
      key: 'content',
      value: event.target.value,
    });
  };

  const onCaloriesChangeHandler = (event) => {
    dispachFn({
      type: 'UPDATE_FIELD',
      key: 'calories',
      value: event.target.value,
    });
  };

  const onCancelHandler = () => {
    dispachFn({ type: 'RESET' });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}> You spent {totalCalories}</p>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        value={currentDateStr}
        name="date"
        id="date"
        onChange={onDateChangeHandler}
        className={`${styles['form-input']} ${
          !isValidDate ? styles.error : ''
        }`}
      />
      <label htmlFor="meal">Meal: </label>
      <select
        name="meal"
        className={styles['form-input']}
        value={formState.meal.value}
        id="meal"
        onChange={onMealChangeHandler}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="content">Content: </label>
      <input
        type="text"
        value={formState.content.value}
        name="content"
        id="content"
        onChange={onContentChangeHandler}
        className={`${styles['form-input']} ${
          !isContentValid ? styles.error : ''
        }`}
      />
      <label htmlFor="calories">Calories: </label>
      <input
        className={`${styles['form-input']} ${
          !isCaloriesValid ? styles.error : ''
        }`}
        type="number"
        value={formState.calories.value}
        name="calories"
        id="calories"
        onChange={onCaloriesChangeHandler}
        // min={0}
      />
      <div className={styles.footer}>
        <button type="submit" disabled={!isFormValid}>
          Add Record
        </button>
        <button
          className={styles.secondary}
          type="button"
          onClick={onCancelHandler}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CalorieRecordEdit;
