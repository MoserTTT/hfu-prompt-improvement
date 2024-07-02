import COLORS from "../../../../../styles/theme";

const styles = {
    root: {
        backgroundColor: '#fff',
        overflowX: 'auto',
        overflowY: 'auto',
        width: '35vw',
    },
    header: {
        padding: '20px 25px',
        borderBottom: `1px solid ${COLORS.lightGray}`,
    },
    backButton: {
        color: COLORS.blue,
        textTransform: 'none',
    },
    searchField: {
        margin: '30px 25px 20px 25px',
        backgroundColor: COLORS.white,
        flex: 1,
    },
    searchButton: {
        margin: '30px 25px 20px 0',
        height: '56px',
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
    divStyle: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    noResults: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
    }
};

export default styles;