import COLORS from "../../../../../../../../styles/theme";

const styles = {

    skeletonContainer: {
        width: '100%',
        backgroundColor: COLORS.darkGray,
        borderRadius: '7px 7px 0px 0px'
    },

    skeletonHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderRadius: '20px 20px 0 0',
        backgroundColor: COLORS.darkGray,
        paddingRight: '10px'
    },

    skeletonContent: {
        backgroundColor: COLORS.black,
        textAlign: 'left',

        padding: '10px 20px',
        border: '1px solid ' + COLORS.darkGray
    },

    skeletonText: {
        height: '20px',
        margin: '10px',
        backgroundColor: COLORS.darkGray
    }
};

export default styles;