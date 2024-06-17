import FONTS from "../../../styles/fonts";
import COLORS from "../../../styles/theme";

const styles = {
    outerDiv: {
        display: 'flex',
        width: '425px',
        height: '80px',
        background: COLORS.lightGray,

        borderRadius: '20px',

        WebkitBoxShadow: '0px 0px 5px 0px rgba(0,0,0,0.52)',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)'
    },

    innerDiv: {
        display: 'block',
        width: '100%'
    },

    headingDiv: {
        display: 'flex',
        alignItems: 'center',
        height: '20px',
        marginTop: '15px'
    },

    name: {
        ...FONTS.headlineSmall,
        margin: '15px'
    },

    status: {
        ...FONTS.bodySmall,
        backgroundColor: COLORS.gray,
        height: '22px',
        width: 'auto',
    },

    dateCreated: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
        width: 'fit-content'
    },

    date: {
        ...FONTS.bodySmall,
        color: COLORS.gray,
        marginLeft: 8
    },

    viewMore: {
        display: 'flex',
        alignItems: 'center',
        height: '25px',
        float: 'right',
        marginTop: '-20px',
        marginRight: '1.5%',

        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent'
    },

    viewMoreText: {
        ...FONTS.labelLarge,
        color: COLORS.blue
    },

    collapsableArrow: {
        marginLeft: 5,
        marginTop: 3.5
    }
};

export default styles ;