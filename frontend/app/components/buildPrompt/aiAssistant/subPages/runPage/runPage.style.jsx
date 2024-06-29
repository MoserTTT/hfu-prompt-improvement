import FONTS from "../../../../../../styles/fonts";
import COLORS from "../../../../../../styles/theme";

const styles = {
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        overflowY: 'hidden',

        width: '70%',
        height: '70%',
        padding: '30px',

        backgroundColor: 'rgb(12, 0, 28)',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 24
    },

    heading: {
        ...FONTS.displayMedium,
        padding: '16px',
        margin: 0,
        
        background: 'linear-gradient(90deg, #9A76FF 20%, #007AFF 80%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent'
    },

    divider: {
        backgroundColor: COLORS.white
    },

    promptNameDiv: {
        padding: '8px 16px',
        borderBottom: '1px solid #e0e0e0',
    },
    
    promptName: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        fontWeight: '500',
        margin: 0,
    },

    responseDiv: {
        flex: '1',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: '90%'
    },

    innerResponseDiv: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px',
        overflowY: 'scroll'
    },

    aiImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '8px',
    },

    responseText: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        padding: '10px',
        borderRadius: '10px',
        marginTop: '-2px',
        maxWidth: '80%',
        textAlign: 'left',
        wordWrap: 'break-word' // Ensure long words
    }
};

export default styles;