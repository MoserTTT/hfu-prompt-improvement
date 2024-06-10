import ReactMarkdown from "react-markdown";
import CodeMirror from '@uiw/react-codemirror'
import { Divider, Stack } from '@mui/material';

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import "../../../../assets/icons/components/groups/toolbox";

import { useState } from "react";

import styles from "./textPromptArea.style";

import {
    H1Icon,
    H2Icon,
    H3Icon,
    H4Icon,
    H5Icon,

    BoldIcon,
    ItalicIcon,
    QuoteIcon,
    StrikeThroughIcon,
    UnderlineIcon,

    BulletListIcon,
    NumberListIcon,

    CodeIcon,
    LinkIcon,
    PhotoIcon
} from "../../../../assets/icons/components/groups/toolbox";
import COLORS from "../../../../styles/theme";

const numberOfIcons = 15;

const textFormattingIcons = [
    BoldIcon,
    ItalicIcon,
    QuoteIcon,
    StrikeThroughIcon,
    UnderlineIcon
];

const listIcons = [
    BulletListIcon,
    NumberListIcon
];

const headerIcons = [
    H1Icon,
    H2Icon,
    H3Icon,
    H4Icon,
    H5Icon
];

const controlsIcons = [
    CodeIcon,
    LinkIcon,
    PhotoIcon
];

const TextPromptArea = () => {

    const [value, setValue] = useState("");

    function onChange(newValue) {
        setValue(newValue);
    }
    
    function getWrappedIcon(Component, index) {
        return (<button 
                    key={index} 
                    style={ styles.formattingIconBox } 
                    className="formattingIcon"
                >
                    <Component color={ COLORS.black }/>
                </button>);
    }

    return (
        <div>
            <Stack
                style={ styles.formattingArea }
            >
                {textFormattingIcons.map((Component, index) => (
                    getWrappedIcon(Component, index)
                ))}

                <Divider style={ styles.divider } orientation="vertical" flexItem/>

                {headerIcons.map((Component, index) => (
                    getWrappedIcon(Component, index)
                ))}

                <Divider style={ styles.divider } orientation="vertical" flexItem/>

                {listIcons.map((Component, index) => (
                    getWrappedIcon(Component, index)
                ))}

                <Divider style={ styles.divider } orientation="vertical" flexItem/>

                {controlsIcons.map((Component, index) => (
                    getWrappedIcon(Component, index)
                ))}
            </Stack>
            <div style={ styles.inputAreas }>
                <div style={ styles.textArea }>
                    <CodeMirror
                        onChange={onChange}
                        extensions={[
                            markdown({ base: markdownLanguage })
                        ]}
                    />
                </div>
                <div style={ styles.previewArea }>
                    <ReactMarkdown style={ styles.markdownArea}>
                        { value }
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default TextPromptArea;