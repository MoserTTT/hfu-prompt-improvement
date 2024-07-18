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

    aiQuestion: {
        marginTop: '30px'
    },

    innerAiQuestion: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        marginTop: '20px'
    },

    aiImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '8px',
    },

    aiText: {
        display: 'block',
        fontFamily: 'Roboto',
        //letterSpacing: 0.5,
        color: COLORS.white,
        borderRadius: '10px',
        maxWidth: '89%',
        padding: 0,
        textAlign: 'left',
        marginTop: '10px'
    },

    response2: {
        marginTop: '-10px',
        marginLeft: '5px'
    },

    responseOnFirstQuestion: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        float: 'right',
        width: 'fit-content'
    },

    innerResponseOnFirstQuestion: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },

    responseOnFirstQuestionText: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        marginRight: '20px',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    
    applyChangesDiv: {
        ...FONTS.titleSmall,
        marginTop: '25%'
    },

    applyChangesButton: {
        padding: '15px',
        backgroundBlendMode: 'multiply',
        boxShadow: '0px 0px 30px 3px rgba(0, 0, 0, 0.5)',
        borderRadius: '25px',
        border: '2px solid ' + COLORS.white
    },

    applyChangesText: {
        ...FONTS.headlineSmall,
        color: COLORS.white,
        margin: 0
    },

    aiAnswer: {
        marginTop: '50px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '90%'
    },

    innerAiAnswer: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px',
        marginTop: '20px',
    },

    aiImprovedPromptDiv: {
        marginLeft: '50px',
        marginRight: '35px'
    },

    aiImprovedPromptHeader: {
        backgroundColor: COLORS.darkGray,
        display: 'flex',
        justifyContent: 'flex-end',

        paddingRight: '15px',

        borderRadius: '7px 7px 0px 0px',
    },

    aiImprovedPromptButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 'fit-content',

        border: 'none',
        cursor: 'pointer'
    },

    aiImprovedPromptButtonText: {
        ...FONTS.bodyMedium,
        color: COLORS.gray,
        marginLeft: '7px'
    },

    aiImprovedPromptTextDiv: {
        display: 'flex',
        backgroundColor: COLORS.black,
        textAlign: 'left',

        padding: '10px 20px',
        border: '1px solid ' + COLORS.darkGray
    },

    aiImprovedPromptText: {
        ...FONTS.bodyMedium,
        color: COLORS.white,
        marginTop: '-10px'
    },

    closeButton: {
        position: 'absolute',
        top: '15px', /* Abstand vom oberen Rand */
        right: '10px', /* Abstand vom rechten Rand */
        background: "none", // Transparent background
        border: 2, // No border
        justifyContent: "center", // Centered content
        alignItems: "center", // Centered items
        width: "fit-content", // Width based on content
        margin: '0px 0px 0px 0px', // Margin
        cursor:'pointer',
    },
};

export default styles;