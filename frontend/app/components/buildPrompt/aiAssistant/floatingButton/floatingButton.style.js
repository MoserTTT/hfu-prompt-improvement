import FONTS from "../../../../../styles/fonts";
import COLORS from "../../../../../styles/theme";

const styles = {
    fab: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 20px',
        bottom: '30px',
        right: '30px',
        marginBottom: '10px',
        marginTop: '10px',
        boxShadow: '0px 0px 30px 3px rgba(0, 0, 0, 0.5)',
        background: 'linear-gradient(-90deg, rgba(0, 122, 255, 1) 17.5%, rgba(84, 58, 159, 1) 63%)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 0px 40px 5px rgba(0, 0, 0, 0.7)',
            //background: 'linear-gradient(-90deg, rgba(0, 122, 255, 1) 17.5%, rgba(84, 58, 159, 1) 63%)',
            
        },
        '&:active': {
            boxShadow: '0px 0px 20px 3px rgba(0, 0, 0, 0.3)',
        }
    },

    icon: {
        marginRight: '10px',
        color: COLORS.white, // Added color for the icon
    },

    text: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
    }
};

export default styles;