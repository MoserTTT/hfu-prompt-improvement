import React from "react";

const SpeakingUserIcon = ({ color, width, height }) => {
    return(
        <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.90137 15.8164C3.50586 16.0625 3.02246 15.9658 2.75 15.5703C1.60742 13.9531 0.939453 11.791 0.939453 9.56736C0.939453 7.33494 1.59863 5.16404 2.75 3.55564C3.02246 3.16013 3.50586 3.06345 3.90137 3.31834C4.31445 3.57322 4.37598 4.09177 4.06836 4.54881C3.12793 5.91111 2.5918 7.70408 2.5918 9.56736C2.5918 11.4219 3.14551 13.206 4.06836 14.5771C4.36719 15.0342 4.31445 15.5527 3.90137 15.8164ZM14 13.7334C11.8818 13.7334 10.1592 11.8613 10.1592 9.56736C10.1592 7.29978 11.873 5.49802 14 5.49802C16.1182 5.49802 17.8496 7.32615 17.8496 9.57615C17.8408 11.8701 16.127 13.7334 14 13.7334ZM7.4082 13.4697C7.03906 13.707 6.55566 13.6191 6.2832 13.2412C5.58008 12.292 5.1582 10.956 5.1582 9.56736C5.1582 8.1699 5.58008 6.84275 6.2832 5.88474C6.55566 5.50681 7.03906 5.41892 7.4082 5.67381C7.83887 5.94627 7.91797 6.46482 7.58398 6.95701C7.0918 7.64256 6.81934 8.58299 6.81934 9.56736C6.81934 10.5429 7.10059 11.4746 7.58398 12.1777C7.90918 12.6699 7.83887 13.1797 7.4082 13.4697ZM14 12.2217C15.2217 12.2217 16.25 11.0615 16.25 9.57615C16.2588 8.13474 15.2305 7.01853 14 7.01853C12.7695 7.01853 11.75 8.11717 11.75 9.56736C11.75 11.0439 12.7695 12.2217 14 12.2217ZM19.4844 22.0127H8.52441C7.0127 22.0127 6.2832 21.5381 6.2832 20.5097C6.2832 18.1015 9.28906 14.8672 14.0088 14.8672C18.7197 14.8672 21.7344 18.1015 21.7344 20.5097C21.7344 21.5381 21.0049 22.0127 19.4844 22.0127ZM19.7744 20.4922C19.9854 20.4922 20.0645 20.4306 20.0645 20.2636C20.0645 18.9189 17.8848 16.3877 14.0088 16.3877C10.124 16.3877 7.94434 18.9189 7.94434 20.2636C7.94434 20.4306 8.02344 20.4922 8.23438 20.4922H19.7744Z" fill={color}/>
        </svg>
    );
}

export default SpeakingUserIcon;