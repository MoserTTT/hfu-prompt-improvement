import { ArrowLeftIcon, ArrowRightIcon } from "../../../../../assets/icons/components";

const CollapsableArrow = ({ style, isCollapsed, onClick}) =>{

    const handleClick = () => onClick();

    return(
        <button style={style} onClick={handleClick}>
            { isCollapsed? <ArrowRightIcon/> : <ArrowLeftIcon/> }
        </button>
    )
}

export default CollapsableArrow;