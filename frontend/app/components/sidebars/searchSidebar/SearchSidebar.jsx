import React, { useState } from "react";
import { Drawer, List, Box, TextField, Typography } from "@mui/material";
import styles from "./styles/searchSidebar.style";
import FilterIcon from "../../../../assets/icons/components/FilterIcon";
import COLORS from "../../../../styles/theme";
import FilterSidebar from "../filterSidebar/FilterSidebar";
import PromptSkeleton from "../../prompt/utils/promptSkeleton/PromptSkeleton";

const SearchSidebar = ({ style, searchOpen, setSearchOpen }) => {
    const [prompts, setPrompts] = useState([]);
    const [iconColor, setIconColor] = useState(COLORS.blue);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState("");

    const handleToggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleSearch = async () => {
        setLoading(true);
        const query = encodeURIComponent(document.getElementById("searchTextField").value);
        const top_n = encodeURIComponent(15);
        const url = selectedAuthor 
            ? `http://127.0.0.1:5000/prompt_by_metadata?filter=${JSON.stringify({ author: selectedAuthor })}`
            : `http://127.0.0.1:5000/prompt_by_vector?query=${query}&top_n=${top_n}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to search');
            }

            const responseData = await response.json();
            const newPrompts = responseData.documents[0].map((doc, index) => {
                const metadata = responseData.metadatas[0][index];
                return {
                    name: metadata.name,
                    dateCreated: metadata.date_of_creation,
                    status: "Active",
                    tags: metadata.tags,
                    author: metadata.author,
                    content: doc
                };
            });

            setPrompts(newPrompts);
            console.log(responseData);
            console.log('Prompt found:', responseData);
        } catch (error) {
            console.error('Error searching:', error);
        }
        setLoading(false);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAuthorSelect = (author) => {
        setSelectedAuthor(author);
        setSearchOpen(false); // Close the filter sidebar after selecting an author
        handleSearch(); // Perform search with the selected author
    };

    return (
        <div style={styles.root}>
            {isFilterOpen && <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onBackToSearch={() => setIsFilterOpen(false)} onSelectAuthor={handleAuthorSelect} />}
            
            <Drawer
                variant="temporary"
                anchor="right"
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                style={style}
                className="search-drawer"
            >
                <div style={styles.divStyle}>
                    <TextField
                        style={styles.searchField}
                        id="searchTextField"
                        label="Search field"
                        type="search"
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button
                        style={styles.filterButton}
                        onClick={handleToggleFilter}
                        onMouseEnter={() => setIconColor(COLORS.darkBlue)}
                        onMouseLeave={() => setIconColor(COLORS.blue)}
                    >
                        <FilterIcon color={iconColor} />
                    </button>
                </div>
                <List style={styles.list}>
                    {loading ? (
                        <div style={styles.prompt}>
                            <PromptSkeleton />
                        </div>
                    ) : prompts.length > 0 ? (
                        prompts.map((prompt, index) => (
                            <div key={index} style={styles.prompt}>
                                <Prompt
                                    name={prompt.name}
                                    dateCreated={prompt.dateCreated}
                                    status={prompt.status}
                                    tags={prompt.tags}
                                    author={prompt.author}
                                    content={prompt.content}
                                />
                            </div>
                        ))
                    ) : (
                        <Box sx={styles.noResults}>
                            <Typography variant="body1" color="textSecondary">
                                No prompts found. Try another search.
                            </Typography>
                        </Box>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default SearchSidebar;
