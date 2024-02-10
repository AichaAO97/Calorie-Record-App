import { forwardRef } from 'react';
import styles from './FormInput.module.css';

const FormInput = forwardRef((props, ref) => {
  const { label, type, id, isValid, children, ...rest } = props;
  const inputElement =
    type === 'select' ? (
      <select
        id={id}
        className={`${styles['form-input']} ${!isValid ? styles.error : ''}`}
        {...rest}
        ref={ref}>
        {children}
      </select>
    ) : (
      <input
        id={id}
        className={`${styles['form-input']} ${!isValid ? styles.error : ''}`}
        type={type}
        {...rest}
        ref={ref}
      />
    );

  return (
    <>
      <label htmlFor={id}>{label}: </label>
      {inputElement}
    </>
  );
});
export default FormInput;
