import { Box, Divider, Input, Tooltip } from "@mui/material";
import styles from "./analysisPage.style";
import { CheckIcon, CopyIcon, SpeakingUserIcon } from "../../../../../../assets/icons/components";
import COLORS from "../../../../../../styles/theme";
import { useState, useEffect } from "react";
import useStore from "../../../utils/markdownContentStore";
import AssistantCloseIcon from "../../../../../../assets/icons/components/AssistantCloseIcon";

const AnalysisPage = ({onCloseWindow}) => {
  // State variables to manage the prompt name and various responses
  const [promptName, setPromptName] = useState("");
  const [question1, setQuestion1] = useState("What is the name of the prompt you want to analyze?");
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("This prompt needs improvement.");
  const [improvedPrompt, setImprovedPrompt] = useState("This is a dummy AI improved prompt.");
  const [changesApplied, setChangesApplied] = useState(false);
  const [showAiAnswer, setShowAiAnswer] = useState(false);
  const [showImprovedPrompt, setShowImprovedPrompt] = useState(false);
  const [animatedResponse1, setAnimatedResponse1] = useState("");
  const [animatedResponse2, setAnimatedResponse2] = useState("");
  const [iconColor, setIconColor] = useState(COLORS.white);

  // Retrieve state management functions from the store
  const markdownContent = useStore((state) => state.markdownContent);
  const setMarkdownContent = useStore((state) => state.setMarkdownContent);
  const setDiffMarkdownContent = useStore((state) => state.setDiffMarkdownContent);

  // Handle Enter key press to trigger prompt analysis
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && promptName.trim() !== "") {
      setResponse1(`Analyzing prompt: ${promptName}`);
    }
  };

  // Effect to animate the AI's analysis response character-by-character
  useEffect(() => {
    if (response1) {
      let index = 0;
      const timer = setInterval(() => {
        setAnimatedResponse1(response1.slice(0, index + 1));
        index++;
        if (index === response1.length) {
          clearInterval(timer);
          setShowAiAnswer(true); // Show the AI's next response after animation
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [response1]);

  // Effect to animate the AI's suggestion for improved prompt character-by-character
  useEffect(() => {
    if (showAiAnswer) {
      let index = 0;
      const timer = setInterval(() => {
        setAnimatedResponse2(response2.slice(0, index + 1));
        index++;
        if (index === response2.length) {
          clearInterval(timer);
          setTimeout(() => setShowImprovedPrompt(true), 200); // Delay before showing improved prompt
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [showAiAnswer]);

  // Handle apply changes button click
  const handleApplyChangesClick = () => {
    if (!changesApplied) {
      setChangesApplied(true);
      setDiffMarkdownContent(markdownContent);
      setMarkdownContent(improvedPrompt, true);
    }
  };

  // Handle prompt name input change
  const handlePromptNameChange = (e) => {
    setPromptName(e.target.value);
  };

 
  return (
    <Box sx={styles.modalBox}>
      <p style={styles.heading}>Analyze Prompt</p>
      <Divider style={styles.divider} orientation="horizontal" />

      <button
                style={styles.closeButton}
                onClick={onCloseWindow}
                onMouseEnter={() => setIconColor(COLORS.gray)}
                onMouseLeave={() => setIconColor(COLORS.white)}
            >
                <AssistantCloseIcon color={iconColor} />
            </button>

      <div style={styles.dialogDiv}>
        {
          // Step 1: Initial Question
        }
        <div style={styles.aiQuestion}>
          <div style={styles.innerAiQuestion}>
            <img
              style={styles.aiImage}
              src="../../../../assets/icons/organicAI_Icon.gif"
              alt="AI Icon"
            />
            <p style={styles.aiQuestionText}>{question1}</p>
          </div>
          <div style={styles.responseOnFirstQuestion}>
            <div style={styles.innerResponseOnFirstQuestion}>
              <Input
                sx={styles.responseOnFirstQuestionText}
                placeholder="Enter Prompt Name"
                value={promptName}
                onChange={handlePromptNameChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <SpeakingUserIcon color={COLORS.white} width={40} height={40} />
            </div>
          </div>
        </div>

        {
          // Step 2: AI Analysis Response
          response1 && (
            <div style={styles.aiQuestion}>
              <div style={styles.innerAiQuestion}>
                <img
                  style={styles.aiImage}
                  src="../../../../assets/icons/organicAI_Icon.gif"
                  alt="AI Icon"
                />
                <p style={styles.aiQuestionText}>{animatedResponse1}</p>
              </div>
            </div>
          )
        }
        
        {
          // Step 3: Improved Prompt Suggestion
          showAiAnswer && (
            <div style={styles.aiQuestion}>
              <div style={styles.innerAiQuestion}>
                <img
                  style={styles.aiImage}
                  src="../../../../assets/icons/organicAI_Icon.gif"
                  alt="AI Icon"
                />
                <p style={styles.aiQuestionText}>{animatedResponse2}</p>
              </div>
              {showImprovedPrompt && (
                <div style={styles.aiImprovedPromptDiv}>
                  <div style={styles.aiImprovedPromptHeader}>
                    <Tooltip title="Apply Changes">
                      <button
                        onClick={handleApplyChangesClick}
                        style={styles.aiImprovedPromptButton}
                      >
                        {changesApplied ? (
                          <CheckIcon
                            color={COLORS.gray}
                            width={18}
                            height={18}
                          />
                        ) : (
                          <CopyIcon
                            color={COLORS.gray}
                            width={23}
                            height={23}
                          />
                        )}
                        <p style={styles.aiImprovedPromptButtonText}>
                          {changesApplied ? "Applied!" : "Apply Changes"}
                        </p>
                      </button>
                    </Tooltip>
                  </div>
                  <div style={styles.aiImprovedPromptTextDiv}>
                    <p style={styles.aiImprovedPromptText}>{improvedPrompt}</p>
                  </div>
                </div>
              )}
            </div>
          )
        }
      </div>
    </Box>
  );
};

export default AnalysisPage;