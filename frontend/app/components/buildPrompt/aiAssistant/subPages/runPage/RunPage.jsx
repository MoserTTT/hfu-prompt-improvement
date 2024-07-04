import { Box, Divider } from "@mui/material";
import styles from "./runPage.style";
import transformMarkdownContent from "../../../nameTagInput/assets/transformMarkdownContent";
import { useState, useEffect, useRef } from "react";
import useStore from "../../../utils/markdownContentStore";
import Markdown from 'react-markdown'
import LoadingSkeletonRun from "./utils/loadingSkeletonRun/LoadingSkeletonRun";

const RunPage = () => {
  const markdownContent = useStore((state) => state.markdownContent);
  const calledLLM = useRef(false); // Use useRef to store the calledLLM flag

  const [responseText, setResponseText] = useState("");
  const [animatedText, setAnimatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callLLM = async () => {
    if (calledLLM.current) return; // Prevent multiple calls
    calledLLM.current = true;
    setIsLoading(true);

    const prompt = encodeURIComponent(
      transformMarkdownContent(markdownContent)
    );
    const data = { prompt }; // Create a data object with the prompt

    try {
      const response = await fetch("http://127.0.0.1:5000/call_llm", {
        method: "POST", // Use POST method for sending JSON data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert data object to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to search by metadata");
      }

      const responseData = await response.json();
      setResponseText(responseData); // Ensure responseData is a string or convert it to string
      setAnimatedText(""); // Reset the animated text before starting new animation
    } catch (error) {
      console.error("Error searching by metadata:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    callLLM();
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (responseText) {
      let index = -1;
      const intervalId = setInterval(() => {
        setAnimatedText((prev) => prev + responseText.charAt(index));
        index++;
        if (index >= responseText.length) {
          clearInterval(intervalId);
        }
      }, 20); // Adjust the speed by changing the interval time (in milliseconds)

      return () => clearInterval(intervalId);
    }
  }, [responseText]);

  return (
    <Box sx={ styles.modalBox }>
      <p style={ styles.heading }>Run Prompt</p>
      <Divider style={ styles.divider } orientation="horizontal" />
      <div style={ styles.promptNameDiv }>
        <p style={ styles.promptName }>
          { document.getElementById("nameInput").value }
        </p>
      </div>
      <div style={ styles.responseDiv }>
        <div style={ styles.innerResponseDiv }>
          <img
            style={ styles.aiImage }
            src="../../../../assets/icons/organicAI_Icon.gif"
          />
          {
            isLoading ? (
              <LoadingSkeletonRun/>
            ) : (
              <div style={ styles.responseText }>
                <Markdown>
                  { animatedText }
                </Markdown>
              </div>
            )
          }
        </div>
      </div>
    </Box>
  );
};

export default RunPage;
