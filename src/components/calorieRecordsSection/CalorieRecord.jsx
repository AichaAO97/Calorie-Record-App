import { useState, useEffect } from 'react';

import styles from './CalorieRecord.module.css';
import CalorieRecordDate from './CalorieRecordDate';
import StyledRecordCell from '../common/StyledRecordCell';

function CalorieRecord(props) {
  if (props.calories < 0) {
    return null;
  }

  useEffect(() => {
    // This is executed when the component is mounted
    props.addCalories((prevTotal) => prevTotal + +props.calories);

    // return a callback that will be executed when the component is cleaned up
    // the clean up happens in two cases:
    // 1- whenever there is a change in the dependency of useEffect, the clean up
    // function (in return)  runs before rerendering the component
    // 2- when the component is unmounted, the clean up function is run immediately
    // before the component disappears

    // This is executed when the component is unmounted
    return () => {
      props.addCalories((prevTotal) => prevTotal - +props.calories);
    };
  }, []);

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      <li> {props.meal} </li>
      <li> {props.content} </li>
      <li className={styles['record-calories']}>
        <StyledRecordCell> {props.calories} </StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
