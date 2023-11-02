import { useState } from 'react';
import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { getDateFromString } from '../../utils';
function ListingSection(props) {
  const { allRecords } = props;
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateChangeHandler = (event) => {
    setCurrentDate(getDateFromString(event.target.value));

    console.log('######################### in listing section');
    console.log({
      newDate: new Date(event.target.value),
      valueFromNewDate: new Date(event.target.value)
        .toISOString()
        .split('T')[0],
      getDateFromString: getDateFromString(event.target.value),
      valueFromGetDateFromString: getDateFromString(event.target.value)
        .toISOString()
        .split('T')[0],
    });
    console.log('######################### in listing section');
  };

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <>
      <label className={styles['listing-picker-label']} htmlFor="listingDate">
        Select date
      </label>
      <input
        className={styles['listing-picker-input']}
        id="listingDate"
        type="date"
        value={currentDate.toISOString().split('T')[0]}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
