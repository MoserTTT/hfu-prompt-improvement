import { Box } from "@mui/material";
import styles from "./welcomePage.style";
import { useState } from "react";
import AssistantCloseIcon from "../../../../../../assets/icons/components/AssistantCloseIcon";
import COLORS from "../../../../../../styles/theme";

const WelcomePage = ({ onClickAnalysis, onClickRun, onCloseWindow }) => {

    // states for hover effect
    const [isButtonAnalysisHovered, setIsButtonAnalysisHovered] = useState(false);
    const [isButtonRunHovered, setIsButtonRunHovered] = useState(false);
    const [iconColor, setIconColor] = useState(COLORS.white);
    

    return(
        <Box sx={ styles.modalBox }>

            

            <img style={ styles.aiImage } src="../../../../assets/icons/organicAI_Icon.gif" />
            
            <p style={ styles.headerText }>
                Your personal <span style={ styles.headerTextAfter }>AI assistant</span>
            </p>

            <button
                style={styles.closeButton}
                onClick={onCloseWindow}
                onMouseEnter={() => setIconColor(COLORS.gray)}
                onMouseLeave={() => setIconColor(COLORS.white)}
            >
                <AssistantCloseIcon color={iconColor} />
            </button>

            <div style={ styles.buttonDiv }>
                <button
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