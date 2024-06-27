import { useState } from "react";
import styles from "./readMore.style";

const ReadMore = ({ content, increment = 100 }) => {
    const [visibleLength, setVisibleLength] = useState(increment);

    const handleMouseDown = () => {
        const newVisibleLength = parseFloat(visibleLength) + parseFloat(increment);
        setVisibleLength(newVisibleLength);
    }

    const displayContent = content.substring(0, visibleLength);

    return (
        <div style={styles.container}>
        <p style={styles.text}>
            {displayContent}
        </p>
        {visibleLength < content.length && (
            <button
            style={styles.button}
            onMouseDown={handleMouseDown} >
                ...
            </button>
        )}
        </div>
    );
};

export default ReadMore;
