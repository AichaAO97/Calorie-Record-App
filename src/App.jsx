import { useState } from 'react';
import ListingSection from './components/calorieRecordsSection/ListingSection';
import CalorieRecordEdit from './components/edit/CalorieRecordEdit';
import Modal from 'react-modal';
import styles from './App.module.css';
import { getDateFromString } from './utils';

const LOCAL_STORAGE_KEY = 'calorieRecords';

function App() {
  const [records, setRecords] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function save() {
    localStorage.setItem();
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '8px',
      borderRadius: 'var(--theme-border-radius-smooth)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      id: nextId,
      date: getDateFromString(record.date),
    };
    setRecords((prevRecord) => [formattedRecord, ...prevRecord]);
    setNextId((lastVal) => lastVal + 1);
    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}>
        <CalorieRecordEdit
          onFormSubmit={formSubmitHandler}
          onCancel={handleCloseModal}
        />
      </Modal>
      <ListingSection allRecords={records} />
      <button className={styles['open-modal-btn']} onClick={handleOpenModal}>
        Track food
      </button>
    </div>
  );
}

export default App;
