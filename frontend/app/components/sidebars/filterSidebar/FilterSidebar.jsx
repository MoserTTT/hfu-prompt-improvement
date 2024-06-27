import { Drawer, List, TextField } from "@mui/material";
import { Prompt } from "../../../components";
import styles from "./styles/filterSidebar.style";
import FilterIcon from "../../../../assets/icons/components/FilterIcon";

const SearchSidebar = ({ onToggle, open }) => {
    return (
        <div style={ styles.root }>
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                >
                   
                
                <List> 
                </List>
            </Drawer>
        </div>
    );
}

export default SearchSidebar;