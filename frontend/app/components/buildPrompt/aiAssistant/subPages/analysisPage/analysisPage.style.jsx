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
        flex: 1,
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

    aiQuestionText: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '80%',
        textAlign: 'left',
        wordWrap: 'break-word'
    },

    responseOnFirstQuestion: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        float: 'right'
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
        paddingRight: '10px',
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

    aiImprovedPromptDiv: {
        marginLeft: '55px',
        marginRight: '60px'
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
        color: COLORS.white
    }
};

export default styles;