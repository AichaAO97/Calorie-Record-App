import { useContext, useEffect, useState } from 'react';
import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';
import { AppContext } from '../../AppContext';

function RecordList(props) {
  const { totalCalories } = useContext(AppContext);

  const resultElement = props.records?.length ? (
    <ul className={styles['record-list']}>
      {props.records.map((record) => (
        <li className={styles['list-item']} key={record.id}>
          <CalorieRecord
            date={record.date}
            meal={record.meal}
            content={record.content}
            calories={record.calories}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );

  return (
    <>
      {resultElement}
      <label> Total Calories: {totalCalories} </label>
    </>
  );
}

export default RecordList;
