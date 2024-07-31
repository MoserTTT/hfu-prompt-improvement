import React from "react";

const StatisticIcon = ({ color, width, height}) => {
    return(
        <svg width={width} height={height} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 17.5L14 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21V28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28 14V28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="5.25" y="7" width="31.5" height="28" rx="2" stroke={color} strokeWidth="2"/>
        </svg>
    );
}

export default StatisticIcon;
