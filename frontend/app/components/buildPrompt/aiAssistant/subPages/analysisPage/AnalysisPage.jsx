import { Box, Divider, Input, Tooltip } from "@mui/material";
import styles from "./analysisPage.style";
import { CheckIcon, CopyIcon, SpeakingUserIcon } from "../../../../../../assets/icons/components";
import COLORS from "../../../../../../styles/theme";
import { useState, useEffect } from "react";
import useStore from "../../../utils/markdownContentStore";
import AssistantCloseIcon from "../../../../../../assets/icons/components/AssistantCloseIcon";
import prompt_eval from "./utils/restFunctions/prompt_eval";
import searchPrompt_name_and_id from "./utils/restFunctions/searchPrompt_name_and_id";
import call_improve_prompt from "./utils/restFunctions/call_improve_prompt";
import LoadingSkeletonEval from "./utils/loadingSkeletonEval/LoadingSkeletonEval";
import Markdown from 'react-markdown'
import LoadingSkeletonImprove from "./utils/loadingSkeletonImprove/LoadingSkeletonImprove";
import toast from "react-hot-toast";

const AnalysisPage = ({onCloseWindow}) => {
  const [promptName, setPromptName] = useState("");
  const [question1, setQuestion1] = useState("What is the name of the prompt you want to analyze?");
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("This is a dummy AI improved prompt.");
  const [changesApplied, setChangesApplied] = useState(false);
  const [showAiAnswer, setShowAiAnswer] = useState(false);
  const [showImprovedPrompt, setShowImprovedPrompt] = useState(false);
  const [animatedResponse1, setAnimatedResponse1] = useState("");
  const [animatedResponse2, setAnimatedResponse2] = useState("");
  const [iconColor, setIconColor] = useState(COLORS.white);

  const [isLoadingResponse2, setIsLoadingResponse2] = useState(false);
  const [isLoadingImprovedPrompt, setIsLoadingImprovedPrompt] = useState(false);

  const markdownContent = useStore((state) => state.markdownContent);
  const setMarkdownContent = useStore((state) => state.setMarkdownContent);
  const setDiffMarkdownContent = useStore((state) => state.setDiffMarkdownContent);

  var prompt_name_and_id = "";

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13 && promptName.trim() !== "") {
      prompt_name_and_id = await searchPrompt_name_and_id(promptName);
      console.log(prompt_name_and_id);
      if(prompt_name_and_id != ""){
        if(prompt_name_and_id == undefined){
          toast.error('Enter a existing name!');
        } else {
          setResponse1(`Analyzing prompt: ${prompt_name_and_id}`);
  
          setIsLoadingResponse2(true);
          setIsLoadingImprovedPrompt(true);
          setResponse2(await prompt_eval(prompt_name_and_id));
          setIsLoadingResponse2(false);
  
          setImprovedPrompt(await call_improve_prompt(prompt_name_and_id));
        }
      }
    }
  };

  useEffect(() => {
    if (response1) {
      let index = 0;
      const timer = setInterval(() => {
        setAnimatedResponse1(response1.slice(0, index + 1));
        index++;
        if (index === response1.length) {
          setShowAiAnswer(true);
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [response1]);

  useEffect(() => {
    if (showAiAnswer) {
      let index = 0;
      const timer = setInterval(async () => {
        setAnimatedResponse2(response2.slice(0, index + 1));
        index++;
        if (index === response2.length) {
          clearInterval(timer);
          setIsLoadingImprovedPrompt(false);
          setTimeout(() => setShowImprovedPrompt(true), 200);
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [response2, showAiAnswer]);

  const handleApplyChangesClick = async () => {
    if (!changesApplied) {
      setChangesApplied(true);
      setDiffMarkdownContent(markdownContent);
      setMarkdownContent(improvedPrompt, true);
    }
  };

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
        <div style={styles.aiQuestion}>
          <div style={styles.innerAiQuestion}>
            <img
              style={styles.aiImage}
              src="../../../../assets/icons/organicAI_Icon.gif"
              alt="AI Icon"
            />
            <p style={styles.aiText}>{question1}</p>
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

        {response1 && (
          <div style={styles.aiAnswer}>
            <div style={styles.innerAiAnswer}>
              <img
                style={styles.aiImage}
                src="../../../../assets/icons/organicAI_Icon.gif"
                alt="AI Icon"
              />
              <p style={styles.aiText}>{animatedResponse1}</p>
            </div>
          </div>
        )}

        {showAiAnswer && (
          <div style={styles.aiAnswer}>
            <div style={styles.innerAiAnswer}>
              <img
                style={styles.aiImage}
                src="../../../../assets/icons/organicAI_Icon.gif"
                alt="AI Icon"
              />
               {
                !isLoadingResponse2 ? (
                  <div style={{ ...styles.aiText, ...styles.response2 }} >
                    <Markdown>
                      {animatedResponse2}
                    </Markdown>
                  </div>
                ) : (
                  <LoadingSkeletonEval/>
                )
              }
            </div>
            {
              <div style={styles.aiImprovedPromptDiv}>
                {
                  isLoadingImprovedPrompt ? (
                    <LoadingSkeletonImprove/>
                  ) : (
                    showImprovedPrompt && (
                      <>
                        <div style={styles.aiImprovedPromptHeader}>
                          <Tooltip title="Apply Changes">
                            <button
                              onClick={handleApplyChangesClick}
                              style={styles.aiImprovedPromptButton}
                            >
                              {changesApplied ? (
                                <CheckIcon color={COLORS.gray} width={18} height={18} />
                              ) : (
                                <CopyIcon color={COLORS.gray} width={23} height={23} />
                              )}
                              <p style={styles.aiImprovedPromptButtonText}>
                                {changesApplied ? "Applied!" : "Apply Changes"}
                              </p>
                            </button>
                          </Tooltip>
                        </div>
                        <div style={styles.aiImprovedPromptTextDiv}>
                          <div style={styles.aiImprovedPromptText}>
                            <Markdown>
                              {improvedPrompt}
                            </Markdown>
                          </div>
                        </div>
                      </>
                    )
                  )
                }
              </div>
            }
          </div>
        )}
      </div>
    </Box>
  );
};

export default AnalysisPage;