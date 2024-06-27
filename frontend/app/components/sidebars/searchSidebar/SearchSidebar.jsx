import { Drawer, List, TextField } from "@mui/material";
import { Prompt } from "../../../components";
import styles from "./styles/searchSidebar.style";
import FilterIcon from "../../../../assets/icons/components/FilterIcon";
import COLORS from "../../../../styles/theme";
import { useState } from "react";
import { DragOverlay } from "@dnd-kit/core";

const SearchSidebar = ({ onToggle }) => {

    const  isCollapsed = false;
    //var iconColor = COLORS.green;

    const [iconColor, setIconColor] = useState(COLORS.blue);

    function onChangeCollapse(){
        isCollapsed =! isCollapsed;
      }
    return (
        <div style={ styles.root }>
            <Drawer
                variant="permanent"
                anchor="right">

                <div style={styles.divStlye}>
                <TextField
                    style={ styles.searchField }
                    id="filled-search"
                    label="Search field"
                    type="search"
                />

                <button
                    style={ styles.filterButton } 
                    onClick={() => onChangeCollapse()}

                    onMouseEnter={(e) => {
                        setIconColor(COLORS.darkBlue);
                      }}
                      onMouseLeave={(e) => {
                        setIconColor(COLORS.blue);
                      }}
                    >
                    <FilterIcon color={iconColor}/>       
                </button>
                </div>

                <List style={ styles.list }>
                    <div style={ styles.prompt }>
                        <Prompt
                            name="Prompt 1"
                            dateCreated="29. July 2004"
                            status="Active"
                            tags={["tag1", "tag2", "tag3"]}
                            author="David Pospisil"
                            content="content"
                        />
                    </div>
                </List>
                <DragOverlay>
                    <Prompt
                        name="Prompt Name"
                        dateCreated="DD. Month Year"
                        status="Status"
                    />
                </DragOverlay>
            </Drawer>
        </div>
    );
}

export default SearchSidebar;