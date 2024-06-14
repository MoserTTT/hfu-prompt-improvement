import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styles from "./SaveButton.style";
import COLORS from '../../../styles/theme';

const SaveButton = (props) => {


 const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
 
  return (
    <div >
      <button style={styles }
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
      
    </div>
  );
}

export default SaveButton;