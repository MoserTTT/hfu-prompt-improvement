import FONTS from "../../../../styles/fonts";
import COLORS from "../../../../styles/theme";

const styles = {
    floatingButton: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: COLORS.blue,
        color: COLORS.white,
        '&:hover': {
            backgroundColor: COLORS.darkBlue,
        },
        boxShadow: '0px 0px 30px 3px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.3s ease-in-out',
    },

    closeButton: {
        background: "none", // Transparent background
        border: 0, // No border
        justifyContent: "center", // Centered content
        alignItems: "center", // Centered items
        width: "fit-content", // Width based on content
        margin: '30px 20px 20px 0px', // Margin
    },

};

export default styles;