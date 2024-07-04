import styles from "./aiAssistant.style";
import { Box, Fade, Modal } from "@mui/material";
import { useState } from "react";
import FloatingButton from "./floatingButton/FloatingButton";
import WelcomePage from "./subPages/welcomePage/WelcomePage";
import AnalysisPage from "./subPages/analysisPage/AnalysisPage";
import RunPage from "./subPages/runPage/RunPage";

const AiAssistant = () => {

    // state for ai assistant modal
    const [assistantOpen, setAssistantOpen] = useState(false);

    const [pageSelector, setPageSelector] = useState("welcomePage");
    
    const openAssistant = () => {
        setAssistantOpen(true);
    }

    const closeAssistant = () => {
        
        setAssistantOpen(false);
        
        setPageSelector("welcomePage");
    }

    return (
        <div>
            <Modal
                open={assistantOpen}
                onClose={closeAssistant}
            >
                <Fade in={assistantOpen}>
                    <Box>
                        {
                            pageSelector == "welcomePage" && 
                                <WelcomePage
                                    onClickAnalysis={() => setPageSelector("analysisPage")}
                                    onClickRun={() => setPageSelector("runPage")} 
                                    onCloseWindow={()=> setAssistantOpen(false)} />
                            || pageSelector == "analysisPage" && 
                                <AnalysisPage
                                    onCloseWindow={()=> closeAssistant()}
                                />

                            || pageSelector == "runPage" &&
                                <RunPage
                                onCloseWindow={()=> closeAssistant()}
                                />
                        }
                    </Box>
                </Fade>
            </Modal>
            <FloatingButton onClick={openAssistant} />
        </div>
    );
}

export default AiAssistant;