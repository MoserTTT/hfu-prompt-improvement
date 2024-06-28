import FONTS from "../../../../../styles/fonts"; // Import fonts
import COLORS from "../../../../../styles/theme"; // Import theme colors
import "./searchSidebar.style.css"; // Import the CSS file for additional styles

const styles = {
    root: {
        backgroundColor: '#fff', // White background color
        overflowX: 'auto', // Horizontal overflow handling
        overflowY: 'auto', // Vertical overflow handling
    },

    searchField: {
        margin: '30px 25px 20px 25px', // Margin
        backgroundColor: COLORS.white, // Background color from theme
        width: "30vw" // Width based on viewport width
    },
    
    list: {
        overflowY: 'auto', // Vertical overflow handling
        justifyContent: 'center', // Centered content
        width: 'fit-content', // Width based on content
        backgroundColor: COLORS.lightGray, // Background color from theme
        marginLeft: '25px', // Left margin
        borderRadius: '15px' // Rounded corners
    },
    
    prompt: {
        width: 'fit-content', // Width based on content
        margin: '20px 20px 40px 20px' // Margin
    },

    filterButton: {
        background: "none", // Transparent background
        border: 0, // No border
        justifyContent: "center", // Centered content
        alignItems: "center", // Centered items
        width: "fit-content", // Width based on content
        margin: '30px 20px 20px 0px', // Margin
    },

    divStyle: {
        display: "flex", // Flexbox container
        justifyContent: 'space-between', // Space evenly between items
        alignItems: "center" // Centered items vertically
    }
};

export default styles;
