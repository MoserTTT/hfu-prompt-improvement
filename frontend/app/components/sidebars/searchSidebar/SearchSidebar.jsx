import { Drawer, List, TextField } from "@mui/material";
import { Prompt } from "../../../components";
import styles from "./styles/searchSidebar.style";

const SearchSidebar = ({ onToggle }) => {
    return (
        <div style={ styles.root }>
            <Drawer
                variant="permanent"
                anchor="right">
                <TextField
                    style={ styles.searchField }
                    id="filled-search"
                    label="Search field"
                    type="search"
                />
                <List>
                    <div style={ styles.prompt } >
                        <Prompt
                            name="Lorem Ipsum Prompt"
                            dateCreated="29. July 2004"
                            status="Active"
                            tags="listOfTags"
                            author="Mustermann"
                            content="Simple Prompt example"
                        />
                    </div>
                    <div style={ styles.prompt } >
                        <Prompt
                            name="Lorem Ipsum Prompt"
                            dateCreated="29. July 2004"
                            status="Active"
                            tags="listOfTags"
                            author="Mustermann"
                            content="Simple Prompt example"
                        />
                    </div>
                </List>
            </Drawer>
        </div>
    );
}

export default SearchSidebar;