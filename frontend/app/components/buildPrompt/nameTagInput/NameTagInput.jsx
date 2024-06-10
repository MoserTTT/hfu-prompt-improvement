import { useState } from "react";
import AddIcon from "../../../../assets/icons/components/AddIcon";
import styles from "./styles/nameTagInput.style";

import { Chip, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';

import COLORS from "../../../../styles/theme";

const NameTagInput = () => {

    const [addIconColor, setAddIconColor] = useState(COLORS.gray);

    const [tags, setTags] = useState([]);

    const handleHover = (event) => {
        setAddIconColor(event.type === "mouseenter"? COLORS.blue : COLORS.gray);
    }

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => (tag !== tagToDelete)));
    }

    const handleAddTag = () => {
        const newTag = document.getElementById("tagInput").value; // Get value from tag input
        if (newTag) {
            if(tags.includes(newTag))
                return;
            setTags([...tags, newTag]); // Add new tag to the state
            document.getElementById("tagInput").value = ""; // Clear tag input field
        }
    };

    return(
        <div>
            <div style={ styles.upperSection }>
                <TextField
                    autoFocus
                    id='nameInput'
                    label='Name your prompt'
                    variant='standard'
                    style={ styles.nameInput }
                />
                <TextField
                    id='tagInput'
                    label='Add tag'
                    type='search'
                    variant='standard'
                    style={ styles.tagInput }
                />
                <button 
                    style={ styles.addButton } 
                    onMouseEnter={ handleHover } 
                    onMouseLeave={ handleHover }
                    onClick={ handleAddTag }  >
                    <AddIcon color={addIconColor}/>
                </button>
            </div>

            <Stack direction="row" spacing={1}>
                { tags.map((tag, index) => (
                    <Chip
                        key={ index + tag }
                        style={ styles.tag }
                        label={ tag }
                        variant="outlined"
                        onDelete={() => handleDeleteTag(tag)}/>
                ))}
            </Stack>
        </div>
    );
}

export default NameTagInput;