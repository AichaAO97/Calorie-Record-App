import styles from './CalorieRecordDate.module.css';
import StyledRecordCell from '../common/StyledRecordCell';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function CalorieRecordDate(props) {
  // const month = props.date.toLocaleString('default', { month: 'long' });
  // const day = props.date.getDate();
  // const year = props.date.getFullYear();

  const month = MONTHS[props.date.getUTCMonth()];
  const day = props.date.getUTCDate();
  const year = props.date.getUTCFullYear();

  console.log(month);

  return (
    <StyledRecordCell>
      <div className={styles['record-date-month']}> {month} </div>
      <div className={styles['record-date-day']}> {day} </div>
      <div className={styles['record-date-year']}> {year} </div>
    </StyledRecordCell>
  );
}

export default CalorieRecordDate;
