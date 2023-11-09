import { useEffect, useState } from 'react';
import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';

function RecordList(props) {
  const [totalCalories, setTotalCalories] = useState(0);

  const resultElement = props.records?.length ? (
    <ul className={styles['record-list']}>
      {props.records.map(
        (record) =>
          record.calories >= 0 && (
            <li className={styles['list-item']} key={record.id}>
              <CalorieRecord
                date={record.date}
                meal={record.meal}
                content={record.content}
                calories={record.calories}
                addCalories={setTotalCalories}
              />
            </li>
          )
      )}
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
