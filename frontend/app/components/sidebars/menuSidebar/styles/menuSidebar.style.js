import FONTS from "../../../../../styles/fonts";
import { COLORS } from "../../../../../styles/theme";

import "./menuSidebar.style.css"

const styles = {
    navHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },

    navHeaderLogo: {
        width: 56,
        height: 56,
        marginTop: 22,
        marginBottom: 22,
        marginLeft: 27,
    },

    collapseArrow: {
        padding: 5,
        paddingLeft: 0,
        cursor: 'Pointer',

        border: 'none',
        backgroundColor: 'transparent'
    },

    navHeaderText: {
        ...FONTS.displaySmall
    },

    listItemText: {
        ...FONTS.headlineSmall,
    },

    selectedListItemText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        color: COLORS.blue
    }
};

export default styles ;