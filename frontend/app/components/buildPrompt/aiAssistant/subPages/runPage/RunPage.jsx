import { Box, Divider } from "@mui/material";
import styles from "./runPage.style";
import transformMarkdownContent from "../../../nameTagInput/assets/transformMarkdownContent";
import { useState } from "react";
import useStore from "../../../utils/markdownContentStore";

const RunPage = () => {

    const markdownContent = useStore(state => state.markdownContent);

    const [responseText, setResponseText] = useState("");

    const callLLM = async () => {
      const prompt = encodeURIComponent(transformMarkdownContent(markdownContent));
      const data = { prompt }; // Create a data object with the prompt
    
      try {
        const response = await fetch('http://127.0.0.1:5000/call_llm', {
          method: 'POST', // Use POST method for sending JSON data
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Convert data object to JSON string
        });
    
        if (!response.ok) {
          throw new Error('Failed to search by metadata');
        }
    
        const responseData = await response.json();
        setResponseText(responseData);
      } catch (error) {
        console.error('Error searching by metadata:', error);
      }
    };

    return(
        <Box sx={ styles.modalBox }>
            <p style={ styles.heading }>Run Prompt</p>
            <Divider style={ styles.divider } orientation="horizontal"/>
            <div style={ styles.promptNameDiv }>
                <p style={ styles.promptName }>[Name of your prompt]</p>
            </div>
            <div style={ styles.responseDiv } onLoad={callLLM}>
                <div style={ styles.innerResponseDiv }>
                    <img style={ styles.aiImage } src="../../../../assets/icons/organicAI_Icon.gif" />
                    <div>
                        <p style={ styles.responseText }>{ responseText }</p>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default RunPage;