import React, { useEffect, useState } from "react";
import styles from "./prompt.style";
import { Chip } from "@mui/material";
import { ClockIcon } from "../../../assets/icons/components";
import COLORS from "../../../styles/theme";
import CollapsableArrow from "../sidebars/menuSidebar/assets/CollapsableArrow";
import { useDraggable } from '@dnd-kit/core';

const Prompt = ({ name, dateCreated, status, tags, author, content }) => {
    
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: name,
        data: {
            content
        }
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        ...styles.outerDiv,
        cursor: 'grab'
    };

    function onChangeCollapse() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={styles.innerDiv}>
                <div style={styles.headingDiv}>
                    <p style={styles.name}>{name}</p>
                    <Chip style={styles.status} label={status} />
                </div>
                <div style={styles.dateCreated}>
                    <ClockIcon color={COLORS.gray} />
                    <p style={styles.date}>{dateCreated}</p>
                </div>
                <button style={styles.viewMore} onClick={onChangeCollapse}>
                    <p style={styles.viewMoreText}>View more </p>
                    <CollapsableArrow
                        style={styles.collapsableArrow}
                        rotationLeft="90"
                        rotationRight="0"
                        changeRotation={isCollapsed}
                    />
                </button>
            </div>
        </div>
    );
};

export default Prompt;
