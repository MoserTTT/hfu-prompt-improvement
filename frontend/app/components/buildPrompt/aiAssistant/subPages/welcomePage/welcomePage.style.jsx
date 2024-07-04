import FONTS from "../../../../../../styles/fonts";
import COLORS from "../../../../../../styles/theme";

const styles = {

    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',

        width: '70%',
        height: '70%',
        padding: '30px',

        backgroundColor: 'rgb(12, 0, 28)',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 24
    },

    aiImage: {
        transform: 'scale(0.66)'
    },

    headerText: {
        ...FONTS.displayMedium,
        color: COLORS.white,

        display: 'flex',
        justifyContent: 'center'
    },

    headerTextAfter: {
        height: '52px',
        marginLeft: '20px',

        background: 'linear-gradient(90deg, #1119E1 -10%, #FFFFFF 60%, #7347AB 86.5%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        BackgroundClip: 'text',
        textFillColor: 'transparent'
    },

    buttonDiv: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },

    button: {
        ...FONTS.titleLarge,
        color: COLORS.white,
        width: '200px',
        height: '57px',
        marginTop: '60px',
        cursor: 'pointer',

        background: 'linear-gradient(90deg, #5C42A4 0%, #007AFF 100%)',
        borderRadius: '20px',
        border: 'none',

        transition: 'all 1s ease-out'
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
    },
}

export default styles;