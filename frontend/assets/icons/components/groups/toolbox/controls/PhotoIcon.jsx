
const PhotoIcon = ({ color }) => {
    return(
        <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.74313 18H21.464C23.1753 18 24.0686 17.0304 24.0686 15.0808V2.9192C24.0686 0.969555 23.1753 0 21.464 0H2.74313C1.03183 0 0.138573 0.969555 0.138573 2.9192V15.0808C0.138573 17.0304 1.03183 18 2.74313 18ZM1.9627 3.04567C1.9627 2.32904 2.24479 2.0445 2.86537 2.0445H21.3418C21.9623 2.0445 22.2444 2.32904 22.2444 3.04567V14.0269L17.1763 8.70492C16.7626 8.27283 16.2737 8.06206 15.7659 8.06206C15.2582 8.06206 14.788 8.26229 14.3555 8.69438L9.71997 13.3419L7.58554 11.192C7.20003 10.7916 6.76751 10.5913 6.31617 10.5913C5.88365 10.5913 5.48873 10.7916 5.11262 11.171L1.9627 14.3326V3.04567ZM8.19672 8.95784C9.41908 8.95784 10.4346 7.81967 10.4346 6.41803C10.4346 5.03747 9.41908 3.88876 8.19672 3.88876C6.94616 3.88876 5.92126 5.03747 5.92126 6.41803C5.92126 7.81967 6.94616 8.95784 8.19672 8.95784Z" fill={color}/>
        </svg>
    );
}

export default PhotoIcon;