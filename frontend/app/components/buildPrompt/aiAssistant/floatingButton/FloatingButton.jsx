import React from "react";
import { Fab, Tooltip } from "@mui/material";
import styles from "./floatingButton.style";
import { MagicIcon } from "../../../../../assets/icons/components";


const MyFloatingActionButton = ({ onClick }) => {
    return (
        <Tooltip title="Start AI Assistant" aria-label="Start AI Assistant">
            <Fab
                variant="extended"
                sx={ styles.fab }
                onClick={onClick}
                aria-label="AI Assistant">
                <div style={styles.icon}>
                    <MagicIcon height="30" width="30" color={styles.icon.color} />
                </div>
                <p style={styles.text}>AI assistant</p>
            </Fab>
        </Tooltip>
    );
};

export default MyFloatingActionButton;