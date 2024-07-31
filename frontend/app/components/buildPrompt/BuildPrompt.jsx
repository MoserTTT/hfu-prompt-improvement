import React from 'react';
import styles from "./buildPrompt.style";
import NameTagInput from "./nameTagInput/NameTagInput";
import TextPromptArea from "./textPromptArea/TextPromptArea";
import AiAssistant from './aiAssistant/AiAssistant';

const BuildPrompt = () => {
  return (
    <div style={ styles.root }>
      <NameTagInput/>
      <TextPromptArea/>
      <AiAssistant/>
    </div>
  );
};

export default BuildPrompt;
