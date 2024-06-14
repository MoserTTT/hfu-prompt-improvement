import React, { useState, useRef } from "react";
import AddIcon from "../../../../assets/icons/components/AddIcon";
import styles from "./styles/nameTagInput.style";

import { Chip, Stack, TextField } from "@mui/material";

import COLORS from "../../../../styles/theme";
import SaveButton from "../../buttons/SaveButton"


const NameTagInput = () => {
    const [addIconColor, setAddIconColor] = useState(COLORS.gray);
    const [tags, setTags] = useState([]);
    const tagInputRef = useRef(null);

    const handleHover = (event) => {
        setAddIconColor(event.type === "mouseenter" ? COLORS.blue : COLORS.gray);
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleAddTag = () => {
        const newTag = tagInputRef.current.value; // Get value from tag input
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]); // Add new tag to the state
            tagInputRef.current.value = ""; // Clear tag input field
        }
    };

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
                >
                    <AddIcon color={addIconColor} />
                </button>

                <SaveButton SaveButton name="Save" />
                <SaveButton SaveButton name="Save as draft" />

            </div>

            <Stack direction="row" spacing={1}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index + tag}
                        style={styles.tag}
                        label={tag}
                        variant="outlined"
                        onDelete={() => handleDeleteTag(tag)}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default NameTagInput;
