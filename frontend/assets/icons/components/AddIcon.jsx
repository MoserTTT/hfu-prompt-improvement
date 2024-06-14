import React from "react";
const AddIcon = ({ color }) => {
    return(
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.375 8.375C4.375 6.16586 6.16586 4.375 8.375 4.375H26.625C28.8341 4.375 30.625 6.16586 30.625 8.375V26.625C30.625 28.8341 28.8341 30.625 26.625 30.625H8.375C6.16586 30.625 4.375 28.8341 4.375 26.625V8.375Z" stroke={color} strokeWidth="2"/>
            <path d="M17.5 11.6667L17.5 23.3334" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M23.3333 17.5L11.6667 17.5" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    );
}

export default AddIcon;