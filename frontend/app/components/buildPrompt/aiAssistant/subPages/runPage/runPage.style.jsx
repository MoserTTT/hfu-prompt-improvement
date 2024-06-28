import { colors } from "@mui/material";
import FONTS from "../../../../../../styles/fonts";
import COLORS from "../../../../../../styles/theme";

const styles = {

    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',

        width: '70%',
        height: '70%',
        padding: '30px',

        backgroundColor: 'rgb(12, 0, 28)',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 24
    },

    heading: {
        ...FONTS.displayMedium,
        background: 'linear-gradient(90deg, #9A76FF 0%, #007AFF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        
        margin: '20px'
    },

    divider: {
        backgroundColor: COLORS.white
    },

    promptNameDiv: {
        marginLeft: 'auto',
        marginRight: '25px',
        marginTop: '55px',
        padding: '15px',

        width: 'fit-content',
        
        borderRadius: '22px',
        backgroundColor: COLORS.darkGray,
    },

    promptName: {
        ...FONTS.bodyLarge,
        color: COLORS.white,

        margin: 0,
        textAlign: 'center'
    },

    responseDiv: {
        float: 'left',

        marginTop: '-100px',
        marginRight: 'auto',
        marginLeft: 0
    },

    innerResponseDiv: {
        display: 'flex',
        alignItems: 'center'
    },

    aiImage: {
        transform: 'scale(0.222)',
        marginLeft: '-120px',
        marginRight: '-120px'
    },

    responseText: {
        ...FONTS.bodyLarge,
        color: COLORS.white,
        textAlign: 'left'
    }
}

export default styles;