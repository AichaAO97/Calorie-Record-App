import { useState } from 'react';
import RecordList from './RecordList';
import styles from './ListingSection.module.css';
import { getDateFromString } from '../../utils';
function ListingSection(props) {
  const { allRecords } = props;
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateChangeHandler = (event) => {
    setCurrentDate(getDateFromString(event.target.value));
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
      {allRecords && <RecordList records={allRecords.filter(dateFilter)} />}
    </>
  );
}

export default ListingSection;
