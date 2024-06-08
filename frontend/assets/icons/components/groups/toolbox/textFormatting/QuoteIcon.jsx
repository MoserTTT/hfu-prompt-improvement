
const QuoteIcon = ({ color }) => {
    return(
        <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.50801 8.53516C9.50801 6.12695 7.78161 4.26367 5.52941 4.26367C4.45151 4.26367 3.47001 4.66797 2.75141 5.47656H2.47098C2.94421 3.86816 4.4778 2.46191 6.47586 1.9082C6.75629 1.82031 6.96662 1.74121 7.0893 1.61816C7.23828 1.49512 7.31715 1.33691 7.31715 1.11719C7.31715 0.72168 7.00167 0.44043 6.55473 0.44043C6.21296 0.44043 5.96759 0.501953 5.52941 0.642578C4.34635 1.03809 3.26845 1.72363 2.4184 2.62012C1.20029 3.88574 0.490448 5.57324 0.490448 7.52441C0.490448 10.917 2.61996 12.877 5.17888 12.877C7.65016 12.877 9.50801 11.0137 9.50801 8.53516ZM20.3396 8.53516C20.3396 6.12695 18.6044 4.26367 16.361 4.26367C15.2831 4.26367 14.2928 4.66797 13.583 5.47656H13.2938C13.7758 3.86816 15.3006 2.46191 17.2987 1.9082C17.5791 1.82031 17.7982 1.74121 17.9209 1.61816C18.0699 1.49512 18.14 1.33691 18.14 1.11719C18.14 0.72168 17.8333 0.44043 17.3863 0.44043C17.0358 0.44043 16.7992 0.501953 16.3522 0.642578C15.1779 1.03809 14.0913 1.72363 13.2412 2.62012C12.0319 3.88574 11.322 5.57324 11.322 7.52441C11.322 10.917 13.4515 12.877 16.0017 12.877C18.4817 12.877 20.3396 11.0137 20.3396 8.53516Z" fill={color}/>
        </svg>
    );
}

export default QuoteIcon;