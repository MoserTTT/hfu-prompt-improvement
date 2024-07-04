import FONTS from "../../../../../../styles/fonts";
import COLORS from "../../../../../../styles/theme";

const styles = {
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        overflowY: 'auto',

        width: '70%',
        height: '70%',
        padding: '30px',

        backgroundColor: 'rgb(12, 0, 28)',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 24,

        '::-webkit-scrollbar': {
            width: '12px',
        },

        '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent', // Transparent background
        },

        '::-webkit-scrollbar-thumb': {
            backgroundColor: COLORS.darkGray, // Thumb color
            borderRadius: '6px',
        },

        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: COLORS.gray, // Thumb hover color
        },

        '::-webkit-scrollbar-track-piece:end': {
            background: 'transparent',
            marginBottom: '10px'
        },
        
        '::-webkit-scrollbar-track-piece:start': {
            background: 'transparent',
            marginTop: '10px'
        },
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
    },

    innerResponseDiv: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px',
        overflowY: 'auto'
    },

    aiImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '8px',
        marginTop: '17px'
    },

    responseText: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        borderRadius: '10px',
        marginTop: '-2px',
        marginLeft: '10px',
        maxWidth: '80%',
        textAlign: 'left',
        wordWrap: 'break-word'
    }
};

export default styles;