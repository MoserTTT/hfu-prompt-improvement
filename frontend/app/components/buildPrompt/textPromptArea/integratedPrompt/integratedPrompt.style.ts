import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'black',
        padding: '10px 0',
        display: 'block',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%'
    },

    heading: {
        display: 'flex',
        alignItems: 'center'
    },

    arrowIcon: {
        transition: 'transform 0.3s ease',
        marginRight: '10px'
    },

    prompt: {
        textAlign: 'start',
        marginTop: '-30px'
    },

    promptText: {
        paddingLeft: '22px',
        paddingTop: '5px',
        paddingBottom: '5px',
    }
};

export default styles;