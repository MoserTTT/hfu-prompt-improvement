import React from "react";
import { ArrowIcon } from "../../../../../assets/icons/components";
import COLORS from "../../../../../styles/theme";

const CollapsableArrow = ({ rotationLeft, rotationRight, style, changeRotation }) => {
    const rotation = changeRotation ? rotationLeft : rotationRight;

    return (
        <div style={style}>
            {}
            <ArrowIcon
                style={{ transform: `rotate(${rotation}deg)` }}
                color={COLORS.blue}
            />
        </div>
    );
};

export default CollapsableArrow;
