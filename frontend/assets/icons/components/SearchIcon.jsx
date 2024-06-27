const SearchIcon = ({ width, height, color }) => {
    return(
        <svg width={width} height={height} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26.5832" cy="26.5832" r="16.9167" stroke={color} strokeWidth="3"/>
            <path d="M48.3335 48.3335L41.0835 41.0835" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        </svg>
    );
}

export default SearchIcon;