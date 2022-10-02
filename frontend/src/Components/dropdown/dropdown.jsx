import React from 'react';
import styles from './styles.module.css';
const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropbtn}>
        <p>{props.name}</p>
      </div>
      <div className={styles.dropdownContent}>{props.children}</div>
    </div>
  );
};

export default Dropdown;
