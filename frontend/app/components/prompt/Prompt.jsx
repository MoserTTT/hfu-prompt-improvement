import React, { useState } from "react";
import styles from "./prompt.style";
import { Chip, Divider } from "@mui/material";
import { ClockIcon, UserIcon } from "../../../assets/icons/components";
import COLORS from "../../../styles/theme";
import CollapsableArrow from "../sidebars/menuSidebar/assets/CollapsableArrow";
import { useDraggable } from '@dnd-kit/core';
import ReadMore from "./utils/readMore/ReadMore";

const Prompt = ({ name, dateCreated, status, tags, author, content }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: name,
        data: {
            content
        }
    });

    const style = {
        ...styles.outerDiv,
        cursor: 'grab',
        zIndex: 1,
        borderColor: COLORS.blue,
        opacity: isDragging ? 0.5 : 1
    };

    const onChangeCollapse = (event) => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div style={styles.innerDiv} {...attributes} {...listeners}>

                <div style={styles.headingDiv}>
                    <p style={styles.name}>{name}</p>
                    <Chip style={styles.status} label={status} />
                </div>

                <div style={styles.dateCreated}>
                    <ClockIcon color={COLORS.gray} />
                    <p style={styles.date}>{dateCreated}</p>
                </div>
                {isCollapsed &&
                    <div style={styles.author}>
                        <UserIcon color={COLORS.gray} />
                        <p style={styles.authorText}>{author}</p>
                    </div>
                }

                <button
                    style={styles.viewMore}
                    onMouseDown={onChangeCollapse}>
                    <p style={styles.viewMoreText}>View more </p>
                    <CollapsableArrow
                        style={styles.collapsableArrow}
                        rotationLeft="90"
                        rotationRight="0"
                        changeRotation={isCollapsed}
                    />
                </button>
                {isCollapsed && (
                    <>
                        <Divider orientation="horizontal" />
                        {tags.length > 0 && (
                            <div>
                                {tags.map((tag) =>
                                    <Chip style={styles.tag} key={tag} label={tag} />
                                )}
                                <Divider orientation="horizontal" />
                            </div>
                        )}
                        <div style={styles.readMore}>
                            <ReadMore content={content} increment="400" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Prompt;