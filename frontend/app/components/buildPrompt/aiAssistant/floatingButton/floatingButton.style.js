import FONTS from "../../../../../styles/fonts";
import COLORS from "../../../../../styles/theme";

const styles = {
    fab: {
        float: 'right',
        marginBottom: '10px',
        marginTop: '10px',
        boxShadow: '0px 0px 30px 3px rgba(0, 0, 0, 0.5)',
        background: 'linear-gradient(180deg, rgba(0, 122, 255, 0.9) 17.5%, rgba(84, 58, 159, 0.9) 63%)'
    },

    icon: {
        marginRight: '20px'
    },

    text: {
        ...FONTS.bodyLarge,
        color: COLORS.white
    }
}

export default styles;