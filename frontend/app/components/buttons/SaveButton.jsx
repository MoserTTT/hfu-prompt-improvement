import React, { useState } from 'react';
import styles from "./SaveButton.style";

const SaveButton = (props) => {

  return (
    <button
      style={styles}
      onClick={props.onClick}
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
