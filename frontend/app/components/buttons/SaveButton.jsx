import React, { useState } from 'react';
import styles from "./SaveButton.style";

const SaveButton = (props) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button
      style={styles}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = styles.backgroundColorHover;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = styles.backgroundColor;
      }}
    >
      {props.name}
    </button>
  );
};

export default SaveButton;
