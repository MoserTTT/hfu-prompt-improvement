import React, { useState } from "react";
import { Drawer, List, TextField } from "@mui/material"; // Importing components from MUI
import { Prompt } from "../../../components"; // Importing custom Prompt component
import styles from "./styles/searchSidebar.style"; // Importing styles for SearchSidebar
import FilterIcon from "../../../../assets/icons/components/FilterIcon"; // Importing FilterIcon component
import COLORS from "../../../../styles/theme"; // Importing theme colors
import FilterSidebar from "../filterSidebar/FilterSidebar"; // Importing FilterSidebar component

const SearchSidebar = ({ style, searchOpen, setSearchOpen }) => {
    const prompt = [];

    // Generating prompt items for demonstration
    for (let i = 0; i < 20; i++) {
        prompt[i] = "Prompt " + i;
    }

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
                        style={styles.searchField}
                        id="filled-search"
                        label="Search field"
                        type="search"
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
                <List style={styles.list}>
                    {/* Render prompt items */}
                    {prompt.map((value) => (
                        <div key={value} style={styles.prompt}>
                            <Prompt
                                name={value}
                                dateCreated="29. July 2004"
                                status="Active"
                                tags={["tag1", "tag2", "tag3"]}
                                author="David Pospisil"
                                content={"content: " + value}
                            />
                        </div>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};

export default SearchSidebar;
