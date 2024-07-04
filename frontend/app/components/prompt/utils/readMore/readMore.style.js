import FONTS from "../../../../../styles/fonts";
import COLORS from "../../../../../styles/theme";

const styles = {

    container: {
        display: 'inline'
    },

    text: {
        ...FONTS.labelMedium,
        lineHeight: 0,
        display: 'inline',
    },

    button: {
        color: COLORS.blue,
        display: 'inline',
        background: 'none',
        cursor: 'pointer',
        padding: '0 4px 0 4px',
        marginLeft: '5px',

        borderWidth: '0.2px',
        borderColor: COLORS.blue
    }
}

export default styles;