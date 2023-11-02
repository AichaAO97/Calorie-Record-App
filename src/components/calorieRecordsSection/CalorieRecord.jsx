import { useState } from 'react';

import styles from './CalorieRecord.module.css';
import CalorieRecordDate from './CalorieRecordDate';
import StyledRecordCell from '../common/StyledRecordCell';

function CalorieRecord(props) {
  if (props.calories < 0) {
    return null;
  }

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
