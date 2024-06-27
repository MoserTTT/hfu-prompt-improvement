import { Drawer, GlobalStyles, List, TextField } from "@mui/material";
import { Prompt } from "../../../components";
import styles from "./styles/searchSidebar.style";
import FilterIcon from "../../../../assets/icons/components/FilterIcon";
import COLORS from "../../../../styles/theme";
import { useState } from "react";
import { DragOverlay } from "@dnd-kit/core";

const SearchSidebar = ({ style, searchOpen, setSearchOpen }) => {

    const prompt = [];

    for(let i=0; i<20; i++){
        prompt[i] = "Prompt " + i;
    }

    console.log(prompt);

    const [iconColor, setIconColor] = useState(COLORS.blue);

    const onChangeOpen = (state) => {
        setSearchOpen(state);
    }

    return (
        <div style={ styles.root }>
            <Drawer
                variant="temporary"
                anchor="right"
                open={searchOpen}
                onClose={() => onChangeOpen(false)}
                style={style}>

                <div style={styles.divStyle}>
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
                      {
                        prompt.map((value) => 
                            <div key={value} style={ styles.prompt }>
                                <Prompt
                                    name={value}
                                    dateCreated="29. July 2004"
                                    status="Active"
                                    tags={["tag1", "tag2", "tag3"]}
                                    author="David Pospisil"
                                    content={"content: " + value}
                                />
                            </div>
                        )
                      }
                </List>
            </Drawer>
        </div>
    );
}

export default SearchSidebar;