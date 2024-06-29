import styles from "./aiAssistant.style";
import { Box, Modal } from "@mui/material";
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
        setPageSelector("welcomePage");
        setAssistantOpen(false);
    }

    return (
        <div>
            <Modal
                open={assistantOpen}
                onClose={closeAssistant}
            >
                <Box>
                    {
                        pageSelector == "welcomePage" && 
                            <WelcomePage
                                onClickAnalysis={() => setPageSelector("analysisPage")}
                                onClickRun={() => setPageSelector("runPage")} />

                        || pageSelector == "analysisPage" && 
                            <AnalysisPage/>

                        || pageSelector == "runPage" &&
                            <RunPage/>
                    }
                </Box>
            </Modal>
            <FloatingButton onClick={openAssistant} />
        </div>
    );
}

export default AiAssistant;