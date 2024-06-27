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
        margin: '30px 300px 20px 25px',
        backgroundColor: COLORS.white,
        //width: "100%",
    },

    prompt: {
        margin: '20px'
    },

    list: {
        overflowY: 'auto'
    },

    filterButton: {
        background: "none",
        border: 0,
        //color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "fit-content",
        margin: '30px 25px 20px 0px',
        
    },

    divStlye:{
        display: "flex",
        alignItems: "center",
    }
};

export default styles ;