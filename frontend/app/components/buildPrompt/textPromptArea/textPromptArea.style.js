import COLORS from '../../../../styles/theme.js'
import FONTS from '../../../../styles/fonts.js'

const styles = {

    formattingArea: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '25px',
        padding: 3,
        marginRight: '3%',
        
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: COLORS.gray,
        borderRadius: '5px 5px 0px 0px'
    },

    formattingIconBox: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: 8,
        marginLeft: 2
    },

    divider: {
        marginLeft: '15px',
        marginRight: '15px'
    },
    
    inputAreas: {
        display: 'flex',
        width: '100%'
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