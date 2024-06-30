import COLORS from "../../../../../styles/theme";

const styles = {
    skeletonBody: {
        padding: '16px',
        backgroundColor: COLORS.lightGray,
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '425px'
    },

    skeletonText: {
        fontSize: '1rem'
    },

    skeletonChip: {
        width: '100px',
        height: '32px'
    },

    skeletonDateCreated: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },

    skeletonViewMore: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },

    skeletonReadMore: {
        width: '100%',
        height: '200px'
    },
};

export default styles;