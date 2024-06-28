import React, { useState } from "react";
import { Drawer, List, TextField } from "@mui/material"; // Importing components from MUI
import { Prompt } from "../../../components"; // Importing custom Prompt component
import styles from "./styles/searchSidebar.style"; // Importing styles for SearchSidebar
import FilterIcon from "../../../../assets/icons/components/FilterIcon"; // Importing FilterIcon component
import COLORS from "../../../../styles/theme"; // Importing theme colors
import FilterSidebar from "../filterSidebar/FilterSidebar"; // Importing FilterSidebar component

const SearchSidebar = ({ style, searchOpen, setSearchOpen }) => {
    
    const [prompts, setPrompts] = useState([]);

    const [iconColor, setIconColor] = useState(COLORS.blue); // State for icon color
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for FilterSidebar

    // Toggle function to open/close FilterSidebar and close SearchSidebar
    const handleToggleFilter = () => {
        setIsFilterOpen(!isFilterOpen); // Toggle FilterSidebar
        setSearchOpen(false); // Close SearchSidebar
    };

    // Function to close FilterSidebar and reopen SearchSidebar
    const handleCloseFilter = () => {
        setIsFilterOpen(false); // Close FilterSidebar
        setSearchOpen(true); // Reopen SearchSidebar
    };

    const searchByVector = async () => {
        console.log("Search...");
        const query = encodeURIComponent(document.getElementById("searchTextField").value);
        const url = `http://127.0.0.1:5000/prompt_by_vector?query=${query}?top_n=${10}`;
      
        try {
            const response = await fetch(url);
          
            if (!response.ok) {
              throw new Error('Failed to search by vector');
            }
      
            const responseData = await response.json();

            // Extracting prompts from responseData
            const newPrompts = responseData.documents[0].map((doc, index) => {
                const metadata = responseData.metadatas[0][index];
                return {
                    name: metadata.name,
                    dateCreated: metadata.date_of_creation,
                    status: "Active",
                    tags: metadata.tags,
                    author: metadata.author,
                    content: doc // Assuming content is the document content
                };
            });

            // Update the prompts state with the new prompts
            setPrompts(newPrompts);
          
            console.log(responseData);
            console.log('Prompt found by vector:', responseData);
        } catch (error) {
            console.error('Error searching by vector:', error);
        }
        console.log("...done");
    };

    const handleSearchKeyDown = (e) => {
        // pressed enter?
        if(e.keyCode == 13){
            searchByVector();
        }
    }

    return (
        <div style={styles.root}>
            {/* Display FilterSidebar if isFilterOpen is true */}
            {isFilterOpen && <FilterSidebar onClose={handleCloseFilter} />}

            <Drawer
                variant="temporary"
                anchor="right"
                open={searchOpen}
                onClose={() => setSearchOpen(false)} // Close SearchSidebar on onClose event
                style={style}
                className="search-drawer" // CSS class for SearchSidebar
            >
                <div style={styles.divStyle}>
                    <TextField
                        style={ styles.searchField }
                        id="searchTextField"
                        label="Search field"
                        type="search"
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button
                        style={styles.filterButton}
                        onClick={handleToggleFilter} // Click handler for toggling FilterSidebar visibility
                        onMouseEnter={() => setIconColor(COLORS.darkBlue)} // Change icon color on hover
                        onMouseLeave={() => setIconColor(COLORS.blue)} // Reset icon color on mouse leave
                    >
                        <FilterIcon color={iconColor} /> {/* Filter icon with dynamic color */}
                    </button>
                </div>
                    <List id="promptList" style={ styles.list }>
                        {
                            prompts.map((prompt, index) => 
                                <div key={index} style={ styles.prompt }>
                                    <Prompt
                                        name={prompt.name}
                                        dateCreated={prompt.dateCreated}
                                        status={prompt.status}
                                        tags={prompt.tags}
                                        author={prompt.author}
                                        content={prompt.content}
                                    />
                                </div>
                            )
                        }
                    </List>
            </Drawer>
        </div>
    );
};

export default SearchSidebar;
