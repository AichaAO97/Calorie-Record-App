import { useState, useEffect } from 'react';
import styles from './CalorieRecordEdit.module.css';

function CalorieRecordEdit(props) {
  const DEFAULT_VALUE = {
    date: '',
    meal: 'Breakfast',
    content: '',
    calories: 0,
  };

  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUE);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log('Executing UseEffect...');
    setIsFormValid(mealRecord.date && mealRecord.content);
  }, [mealRecord.date, mealRecord.content]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(mealRecord);
    setMealRecord(DEFAULT_VALUE);
  };

  const onDateChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      date: event.target.value,
    });
  };

  const onMealChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      meal: event.target.value,
    });
  };

  const onContentChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      content: event.target.value,
    });
  };

  const onCaloriesChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      calories: event.target.value,
    });
  };

  const onCancelHandler = () => {
    setMealRecord(DEFAULT_VALUE);
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        value={mealRecord.date}
        name="date"
        id="date"
        onChange={onDateChangeHandler}
      />
      <label htmlFor="meal">Meal: </label>
      <select
        name="meal"
        value={mealRecord.meal}
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
        value={mealRecord.content}
        name="content"
        id="content"
        onChange={onContentChangeHandler}
      />
      <label htmlFor="calories">Calories: </label>
      <input
        className={`${styles['calories-input']} ${
          mealRecord.calories < 0 ? styles.error : ''
        }`}
        type="number"
        value={mealRecord.calories}
        name="calories"
        id="calories"
        onChange={onCaloriesChangeHandler}
        min={0}
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
