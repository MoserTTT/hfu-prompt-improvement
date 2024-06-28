import { Fab } from "@mui/material";
import styles from "./floatingButton.style"
import COLORS from "../../../../../styles/theme";
import { MagicIcon } from "../../../../../assets/icons/components";

const FloatingButton = ({ onClick }) => {

    return(
        <Fab
            variant="extended" 
            style={ styles.fab }
            onClick={onClick}>
            <div style={ styles.icon }>
                <MagicIcon color={COLORS.white}/>
            </div>
            <p style={ styles.text }> AI assistant </p>
        </Fab>
    );
}

export default FloatingButton;