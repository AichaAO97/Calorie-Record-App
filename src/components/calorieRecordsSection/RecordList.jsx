import CalorieRecord from './CalorieRecord';
import styles from './RecordList.module.css';

function RecordList(props) {
  return props.records?.length ? (
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
              />
            </li>
          )
      )}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );
}

{
  /* { [      
        <li>
        <CalorieRecord
          date={props.records[0].date}
          meal={props.records[0].meal}
          content={props.records[0].content}
          calories={props.records[0].calories}
        />
      </li>,      
      <li>
        <CalorieRecord
          date={props.records[0].date}
          meal={props.records[0].meal}
          content={props.records[0].content}
          calories={props.records[0].calories}
        />
      </li>]} */
}

export default RecordList;
