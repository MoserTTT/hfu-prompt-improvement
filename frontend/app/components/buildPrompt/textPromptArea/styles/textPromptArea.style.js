import COLORS from '../../../../../styles/theme.js'
import FONTS from '../../../../../styles/fonts.js'

import "./textPromptArea.style.css"

const styles = {

    formattingArea: {
        backgroundColor: COLORS.white,
        padding: 5,
    },

    formattingIconBox: {
        border: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        height: 'auto',
        alignItems: 'center',
        marginLeft: '15px',
        padding: 8
    },

    divider: {
        marginLeft: '15px'
    },
    
    inputAreas: {
        display: 'flex',
    },

    textArea: {
        backgroundColor: COLORS.white,
        width: '50%',
        borderRight: 'none',
        overflowX: 'hidden',

        borderWidth: '0.2px',
        borderStyle: 'solid',
        borderColor: COLORS.gray
    },

    previewArea: {
        flex: 1,
        ...FONTS.bodySmall,
        backgroundColor: COLORS.white,
        marginRight: '3%',
        paddingLeft: 15,
        minWidth: '50%',

        borderWidth: '0.2px 0.2px 0.2px 0px',
        borderStyle: 'solid',
        borderColor: COLORS.gray
    },
}

export default styles;