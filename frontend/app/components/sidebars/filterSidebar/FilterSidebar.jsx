import React, { useState } from "react";
import { Drawer, Typography, Button, TextField } from "@mui/material";
import styles from "./styles/filterSidebar.style";
import COLORS from "../../../../styles/theme";

const FilterSidebar = ({ isOpen, onClose, onBackToSearch, onSearch }) => {
    const [tagSearch, setTagSearch] = useState("");
    const [authorSearch, setAuthorSearch] = useState("");
    const [nameSearch, setNameSearch] = useState("");

    const handleTagChange = (e) => {
        setTagSearch(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthorSearch(e.target.value);
    };

    const handleNameChange = (e) => {
        setNameSearch(e.target.value);
    };

    const handleSearch = () => {
        const filterCriteria = {
            tags: tagSearch,
            author: authorSearch,
            name: nameSearch
        };

        if (typeof onSearch === 'function') {
            onSearch(filterCriteria);
            onClose(); // Schließe die Filter-Sidebar nach der Suche
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Verhindere das Standardverhalten des Formulars
            handleSearch();
        }
    };

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={isOpen}
            onClose={onClose}
            className="filter-drawer"
        >
            <div style={styles.root}>
                <div style={styles.header}>
                    <Button
                        onClick={onBackToSearch}
                        style={styles.backButton}
                    >
                        ← Back to Search
                    </Button>
                </div>
                <div style={styles.divStyle}>
                    <Typography variant="body1" gutterBottom>
                        Filter by Tag:
                    </Typography>
                    <TextField
                        id="tag"
                        label="Enter Tag"
                        variant="outlined"
                        value={tagSearch}
                        onChange={handleTagChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        style={styles.tagField}
                    />

                    <Typography variant="body1" gutterBottom>
                        Filter by Author:
                    </Typography>
                    <TextField
                        id="author"
                        label="Enter Author"
                        variant="outlined"
                        value={authorSearch}
                        onChange={handleAuthorChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        style={styles.tagField}
                    />

                    <Typography variant="body1" gutterBottom>
                        Filter by Name:
                    </Typography>
                    <TextField
                        id="name"
                        label="Enter Name"
                        variant="outlined"
                        value={nameSearch}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        style={styles.tagField}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        style={styles.searchButton}
                    >
                        Search
                    </Button>

                    <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                        Filters must be exact matches.
                    </Typography>
                </div>
            </div>
        </Drawer>
    );
};

export default FilterSidebar;
