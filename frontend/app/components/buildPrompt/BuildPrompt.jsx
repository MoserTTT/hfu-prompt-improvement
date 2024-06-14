import * as React from 'react';
import styles from "./buildPrompt.style";
import NameTagInput from "./nameTagInput/NameTagInput";
import TextPromptArea from "./textPromptArea/TextPromptArea";

const BuildPrompt = () => {
    return (
        <div style={ styles.root }>
            <NameTagInput/>
            <TextPromptArea/>
        </div>
    );
}

export default BuildPrompt;