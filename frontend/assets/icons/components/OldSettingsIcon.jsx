
const OldSettingsIcon = ({ color, width, height }) => {
    return(
        <svg width={width} height={height} viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.58169 18.9445C2.05297 17.9941 1.78862 17.5188 1.78862 17C1.78862 16.4812 2.05297 16.0059 2.58168 15.0555L5.75414 9.3525L9.10685 3.75357C9.6656 2.82048 9.94498 2.35393 10.3943 2.09451C10.8436 1.83509 11.3874 1.82641 12.4748 1.80907L19 1.705L25.5252 1.80907C26.6126 1.82641 27.1564 1.83509 27.6057 2.09451C28.055 2.35393 28.3344 2.82048 28.8931 3.75357L32.2459 9.3525L35.4183 15.0555C35.947 16.0059 36.2114 16.4812 36.2114 17C36.2114 17.5188 35.947 17.9941 35.4183 18.9445L32.2459 24.6475L28.8931 30.2464C28.3344 31.1795 28.055 31.6461 27.6057 31.9055C27.1564 32.1649 26.6126 32.1736 25.5252 32.1909L19 32.295L12.4748 32.1909C11.3874 32.1736 10.8436 32.1649 10.3943 31.9055C9.94498 31.6461 9.6656 31.1795 9.10685 30.2464L5.75414 24.6475L2.58169 18.9445Z" stroke={color} strokeWidth="2"/>
            <circle cx="19" cy="17" r="5.25" stroke={color} strokeWidth="2"/>
        </svg>
    );
}

export default OldSettingsIcon;
