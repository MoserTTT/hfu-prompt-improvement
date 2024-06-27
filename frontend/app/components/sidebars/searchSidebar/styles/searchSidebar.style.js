import FONTS from "../../../../../styles/fonts";
import COLORS from "../../../../../styles/theme";

import "./searchSidebar.style.css"

const styles = {
    root: {
        backgroundColor: '#fff',
        overflowX: 'auto',
        overflowY: 'auto'
    },

    searchField: {
        margin: '30px 25px 20px 25px',
        backgroundColor: COLORS.white,
        width: "30vw"
    },
    
    list: {
        overflowY: 'auto',
        justifyContent: 'center',
        width: 'fit-content',
        backgroundColor: COLORS.lightGray,
        marginLeft: '25px',
        borderRadius: '15px'
    },
    
    prompt: {
        width: 'fit-content',
        margin: '20px 20px 40px 20px'
    },

    filterButton: {
        background: "none",
        border: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        margin: '30px 20px 20px 0px',
    },

    divStyle:{
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    }
};

export default styles ;