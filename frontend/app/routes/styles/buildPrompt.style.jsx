import FONTS from "../../../styles/fonts";
import COLORS from "../../../styles/theme";

const styles = {

    root: {
        display: 'flex',
        width: '100%'
    },

    heading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    collapseSearch: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        height: 'fit-content',

        marginRight: '20px',
        paddingRight: '10px',
        
        borderRadius: '10px'
    },

    header: {
        ...FONTS.displaySmall,
        marginLeft: '5px'
    },

    searchSidebar: {
        backgroundColor: 'transparent'
    },

    buildPrompt: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: '10px'
    }
}

export default styles;