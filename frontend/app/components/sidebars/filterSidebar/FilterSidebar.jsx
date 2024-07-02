import React, { useState, useEffect } from "react";
import { Drawer, List, Box, TextField, Typography, Button } from "@mui/material";
import styles from "./styles/filterSidebar.style";
import COLORS from "../../../../styles/theme";

const FilterSidebar = ({ isOpen, onClose, onBackToSearch, onSelectAuthor }) => {
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAuthorSearch = async () => {
        const url = `http://127.0.0.1:5000/authors?searchTerm=${encodeURIComponent(searchTerm)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch authors');
            }

            const responseData = await response.json();
            setAuthors(responseData.authors);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAuthorSearch();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".filter-drawer")) {
                onClose();
            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

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
                    <TextField
                        style={styles.searchField}
                        label="Filter by Author"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAuthorSearch}
                        style={styles.searchButton}
                    >
                        Filter
                    </Button>
                </div>
                <List style={styles.list}>
                    {authors.length > 0 ? (
                        authors.map((author, index) => (
                            <Box key={index} style={styles.authorItem} onClick={() => onSelectAuthor(author)}>
                                <Typography variant="body1">{author}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Box sx={styles.noResults}>
                            <Typography variant="body1" color="textSecondary">
                                No authors found. Try another search.
                            </Typography>
                        </Box>
                    )}
                </List>
            </div>
        </Drawer>
    );
};

export default FilterSidebar;
