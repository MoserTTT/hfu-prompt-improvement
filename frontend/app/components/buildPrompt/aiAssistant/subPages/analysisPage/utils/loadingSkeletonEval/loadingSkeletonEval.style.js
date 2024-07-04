import COLORS from "../../../../../../../../styles/theme";

const styles = {

    skeletonContainer: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: '20px',
    },

    skeletonHeading: {
        width: '20%',
        height: '30px',
        marginBottom: '20px',
        backgroundColor: COLORS.darkGray
    },

    skeletonText: {
        width: '100%',
        height: '20px',
        marginBottom: '10px',
        backgroundColor: COLORS.darkGray
    },

    skeletonImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginBottom: '20px',
        backgroundColor: COLORS.darkGray
    }
};

export default styles;