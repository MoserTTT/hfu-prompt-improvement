import { useState } from "react";
import styles from "./readMore.style";
import Markdown from "react-markdown";

const ReadMore = ({ content, increment = 100 }) => {
    const [visibleLength, setVisibleLength] = useState(increment);

    const handleMouseDown = () => {
        const newVisibleLength = parseFloat(visibleLength) + parseFloat(increment);
        setVisibleLength(newVisibleLength);
    }

    const displayContent = content.substring(0, visibleLength);

    return (
        <div style={styles.container}>
            <Markdown>
                {displayContent}
            </Markdown>
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
