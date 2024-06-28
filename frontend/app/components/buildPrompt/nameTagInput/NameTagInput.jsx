import React, { useState, useRef } from "react";
import AddIcon from "../../../../assets/icons/components/AddIcon";
import styles from "./styles/nameTagInput.style";
import { Chip, Stack, TextField } from "@mui/material";
import COLORS from "../../../../styles/theme";
import SaveButton from "../../buttons/SaveButton";
import transformMarkdownContent from "./assets/transformMarkdownContent";
import useStore from "../utils/markdownContentStore";

const NameTagInput = () => {
  const [addIconColor, setAddIconColor] = useState(COLORS.gray);
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);

  const markdownContent = useStore(state => state.markdownContent);

  const handleHover = (event) => {
    setAddIconColor(event.type === "mouseenter" ? COLORS.blue : COLORS.gray);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddTag = () => {
    const newTag = tagInputRef.current.value;
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      tagInputRef.current.value = null;
    }
  };

  const createPrompt = async () => {

    const content = transformMarkdownContent(markdownContent);
    const url = 'http://127.0.0.1:5000/set_prompt';

    const requestBody = {
      prompt: content,
      metadata: {
        name: document.getElementById("nameInput").value,
        author: 'Author',
        description: 'Description',
        tags: tags
       }
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create prompt');
      }
  
      const responseData = await response.json();
      console.log('Prompt created:', responseData);
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
  };

  const createPromptDraft = () => {

  }

  return (
    <div>
      <div style={styles.upperSection}>
        <TextField
          autoFocus
          id="nameInput"
          label="Name your prompt"
          variant="standard"
          style={styles.nameInput}
        />
        <TextField
          inputRef={tagInputRef}
          id="tagInput"
          label="Add tag"
          type="search"
          variant="standard"
          style={styles.tagInput}
        />
        <button
          style={styles.addButton}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleAddTag}
          aria-label="add"
        >
          <AddIcon color={addIconColor} />
        </button>
        <SaveButton name="Save" onClick={createPrompt} />
        <SaveButton name="Save as draft" onClick={createPromptDraft} />
      </div>
      <Stack direction="row" spacing={1}>
        {tags.map((tag, index) => (
          <Chip
            key={index + tag}
            style={styles.tag}
            label={tag}
            variant="outlined"
            onDelete={() => handleDeleteTag(tag)}
            deleteIcon={<button aria-label="delete" />}
          />
        ))}
      </Stack>
    </div>
  );
};

export default NameTagInput;
