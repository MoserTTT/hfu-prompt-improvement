import COLORS from "../../../../../styles/theme";

const styles = {
    root: {
        backgroundColor: '#fff',
        overflowX: 'hidden',
        overflowY: 'auto',
        width: '33vw',
        padding: '20px',
    },
    header: {
        padding: '0 0 20px 0',
        borderBottom: `1px solid ${COLORS.lightGray}`,
    },
    backButton: {
        color: COLORS.blue,
        textTransform: 'none',
        padding: '10px 0',
    },
    divStyle: {
        display: "flex",
        flexDirection: "column", // Änderung zu column für die vertikale Anordnung
        gap: '20px',
        marginTop: '20px',
    },
    tagLabel: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    inputContainer: {
        display: 'flex',
        gap: '10px',
    },
    tagField: {
        flex: 1,
    },
    searchButton: {
        height: '56px', // Gleiche Höhe wie das TextField
        minWidth: '100px', // Mindestbreite für den Button
    },
    list: {
        overflowY: 'auto',
        justifyContent: 'center',
        width: 'calc(100% - 50px)',
        backgroundColor: COLORS.lightGray,
        margin: '0 25px',
        borderRadius: '15px',
        padding: '10px 0',
    },
    authorItem: {
        padding: '10px 20px',
        margin: '5px 0',
        backgroundColor: COLORS.white,
        borderRadius: '8px',
    },
    noResults: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
    },
};

export default styles;
