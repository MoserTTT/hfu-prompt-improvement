import React, { useState, useRef } from "react";
import AddIcon from "../../../../assets/icons/components/AddIcon";
import styles from "./styles/nameTagInput.style";
import { Chip, Stack, TextField } from "@mui/material";
import COLORS from "../../../../styles/theme";
import SaveButton from "../../buttons/SaveButton";
import transformMarkdownContent from "./assets/transformMarkdownContent";
import useStore from "../utils/markdownContentStore";
import toast, { Toaster } from 'react-hot-toast';
import './style.css'; // Ihre CSS-Datei importieren

const NameTagInput = () => {
  const [addIconColor, setAddIconColor] = useState(COLORS.gray);
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);

  const markdownContent = useStore(state => state.markdownContent);

  const handleHover = (event) => {
    setAddIconColor(event.type === "mouseenter" ? COLORS.blue : COLORS.gray);
  };

  
  var oldContent = "";

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
    toast.error('This function is currently not available!')
  }

  //const notify = () => {
    //if
    //toast.success('Saved successfully!')};


    function handleValidate() {
      switch (validate()) {
          case 'save':
              //console.log('String ist "s". Führe Aktion für "s" aus.');
              // Aktion für "s" message saved succesfully, do save
              createPrompt();
              oldContent=markdownContent;
              toast.success('Saved successfully!');
              //Titel box leeren
              document.getElementById("nameInput").value = null;
              break;

          case 'etitle':
              //console.log('String ist "e". Führe Aktion für "e" aus.');
              // Aktion für "e" message error, do not save
              toast.error('Error! The title must be set!')
              break;

          case 'echanged':
              //console.log('String ist "ec". Führe Aktion für "ec" aus.');
              // Aktion für "ec" message error nix geändert, do not save
              toast.error('Error! The promt has not been edited!')
              break;

          case 'etag':
            //console.log('String ist "ec". Führe Aktion für "ec" aus.');
            // Aktion für "ec" message error unvollständig, do not save
            toast.error('Error! At least one tag must be set!')
            break;

          case 'etitlelength':
            //console.log('String ist "ec". Führe Aktion für "ec" aus.');
            // Aktion für "ec" message error unvollständig, do not save
            toast.error('Error! Minimum title length is 5!')
            break;

            case 'etitlechars':
          //console.log('String ist "ec". Führe Aktion für "ec" aus.');
          // Aktion für "ec" message error unvollständig, do not save
          toast.error('Error! Title must be alphanumeric!')
          break;

          default:
              //console.log('String ist unbekannt. Führe Standardaktion aus.');
              // Standardaktion für unbekannte Strings message error standart
              toast.error('Error!')
      }
    };

    function isAlphaNumeric(str) {
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!(/[a-zA-Z0-9]/).test(char)) {
          return false; // Wenn ein nicht-alphanumerisches Zeichen gefunden wird
        }
      }
      return true; // Wenn alle Zeichen alphanumerisch sind
    };
    
    


    function validate(){
    
      if (document.getElementById("nameInput").value != ""){ // Titel prüfen ob leer
        if(document.getElementById("nameInput").value.length>=5){
          if(isAlphaNumeric(document.getElementById("nameInput").value)){
            if (tags.length!=0){    //schaun ob min 1 tag gesetzt
              if(oldContent!=markdownContent && markdownContent!="# Hello World"){ //schaun ob was geändert wurde
                  return 'save'
                }
                return 'echanged'
              }
              return 'etag'
            }
            return 'etitlechars'
          }
          return 'etitlelength'
        } 
        return 'etitle'
      
    };

    

  return (
    <div>
      <div style={styles.upperSection}>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
        // Define default options
        className: 'toast-container',
        duration: 5000,
        style: {
          background: COLORS.white,
          color: COLORS.black,
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'white',
          },
        },

        error: {
          duration: 3000,
          theme: {
            primary: 'red',
            secondary: 'white',
          },
        },


        }}
      />

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
        <SaveButton name="Save" onClick={handleValidate} />
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
          />
        ))}
      </Stack>
    </div>
  );
};

export default NameTagInput;
