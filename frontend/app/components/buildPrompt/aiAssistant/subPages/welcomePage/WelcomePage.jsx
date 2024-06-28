import { Box } from "@mui/material";
import styles from "./welcomePage.style";
import { useState } from "react";

const WelcomePage = ({ onClickAnalysis, onClickRun }) => {

    // states for hover effect
    const [isButtonAnalysisHovered, setIsButtonAnalysisHovered] = useState(false);
    const [isButtonRunHovered, setIsButtonRunHovered] = useState(false);

    return(
        <Box sx={ styles.modalBox }>
            <img style={ styles.aiImage } src="../../../../assets/icons/organicAI_Icon.gif" />
            
            <p style={ styles.headerText }>
                Your personal <span style={ styles.headerTextAfter }>AI assistant</span>
            </p>

            <div style={ styles.buttonDiv }>
                <button
                    disabled
                    id="buttonAnalysis"
                    onClick={onClickAnalysis}
                    style={{
                        ...styles.button,
                        background: isButtonAnalysisHovered
                            ? 'linear-gradient(90deg, #007AFF 0%, #5C42A4 100%)'
                            : 'linear-gradient(90deg, #5C42A4 0%, #007AFF 100%)',
                        transition: 'background 1s'
                    }}
                    onMouseEnter={() => setIsButtonAnalysisHovered(true)}
                    onMouseLeave={() => setIsButtonAnalysisHovered(false)}
                >
                    Text Analysis
                </button>

                <button
                    id="buttonRun"
                    onClick={onClickRun}
                    style={{
                        ...styles.button,
                        background: isButtonRunHovered
                            ? 'linear-gradient(90deg, #007AFF 0%, #5C42A4 100%)'
                            : 'linear-gradient(90deg, #5C42A4 0%, #007AFF 100%)',
                        transition: 'background 1s'
                    }}
                    onMouseEnter={() => setIsButtonRunHovered(true)}
                    onMouseLeave={() => setIsButtonRunHovered(false)}
                >
                    Run Prompt
                </button>
            </div>
        </Box>
    );
}

export default WelcomePage;