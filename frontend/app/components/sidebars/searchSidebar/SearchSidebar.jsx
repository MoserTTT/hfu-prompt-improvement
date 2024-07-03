import React, { useState, useEffect } from "react";
import { Drawer, List, Box, TextField, Typography, Button } from "@mui/material";
import styles from "./styles/searchSidebar.style";
import COLORS from "../../../../styles/theme";
import FilterIcon from "../../../../assets/icons/components/FilterIcon";
import FilterSidebar from "../filterSidebar/FilterSidebar";
import PromptSkeleton from "../../prompt/utils/promptSkeleton/PromptSkeleton";
import Prompt from "../../prompt/Prompt";

const SearchSidebar = ({ style, searchOpen, setSearchOpen }) => {
    const [prompts, setPrompts] = useState([]);
    const [iconColor, setIconColor] = useState(COLORS.blue);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Zustand für den Suchbegriff hinzufügen
    const [filterCriteria, setFilterCriteria] = useState(null); // Zustand für den Filter hinzufügen

    // Handler für das Öffnen und Schließen des Filters
    const handleToggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Handler für die Suche mit dem aktuellen Filter
    const handleSearch = async () => {
        setLoading(true);
        const query = encodeURIComponent(searchTerm);
        const top_n = encodeURIComponent(15);

        let url = `http://127.0.0.1:5000/prompt_by_vector?query=${query}&top_n=${top_n}`;

        if (filterCriteria) {
            let filter = {};

            // Nur die definierten Filterkriterien hinzufügen
            if (filterCriteria.tags) {
                filter = {
                    ...filter,
                    tags: filterCriteria.tags
                };
            }
            if (filterCriteria.author) {
                filter = {
                    ...filter,
                    author: filterCriteria.author
                };
            }
            if (filterCriteria.name) {
                filter = {
                    ...filter,
                    name: filterCriteria.name
                };
            }

            let filterParameter = encodeURIComponent(JSON.stringify(filter));
            url += `&filter=${filterParameter}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to search');
            }

            const responseData = await response.json();

            // Überprüfen Sie, ob responseData.documents und responseData.metadatas definiert sind und Daten enthalten
            if (!responseData.documents || !responseData.metadatas || !responseData.documents[0] || !responseData.metadatas[0]) {
                throw new Error('Invalid response data structure');
            }

            const newPrompts = responseData.documents[0].map((doc, index) => {
                const metadata = responseData.metadatas[0][index];
                return {
                    name: metadata.name,
                    dateCreated: metadata.date_of_creation,
                    status: metadata.status,
                    tags: metadata.tags,
                    author: metadata.author,
                    content: doc
                };
            });

            setPrompts(newPrompts);
            console.log('Prompts found:', newPrompts);
        } catch (error) {
            console.error('Error searching:', error);
        }

        setLoading(false);
    };

    // Handler für die Eingabe im Suchfeld
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handler für die Aktualisierung des Filters
    const handleUpdateFilter = (newFilter) => {
        console.log("Neuer Filter empfangen:", newFilter);
        setFilterCriteria(newFilter);
    };

    // useEffect Hook zum Aufrufen der Suche bei Filteraktualisierung
    useEffect(() => {
        if (filterCriteria) {
            handleSearch();
        }
    }, [filterCriteria]); // Nur bei Änderungen von filterCriteria aufrufen

    return (
        <div style={styles.root}>
            {/* FilterSidebar anzeigen, wenn isFilterOpen true ist */}
            {isFilterOpen && (
                <FilterSidebar
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onBackToSearch={() => setIsFilterOpen(false)}
                    onSearch={handleUpdateFilter} // Handler für die Filteraktualisierung übergeben
                />
            )}

            {/* Hauptinhalt der SearchSidebar */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                style={style}
                className="search-drawer"
            >
                <div style={styles.divStyle}>
                    {/* Suchfeld */}
                    <TextField
                        style={styles.searchField}
                        id="searchTextField"
                        label="Search field"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />

                    {/* Filter-Button */}
                    <button
                        style={styles.filterButton}
                        onClick={handleToggleFilter}
                        onMouseEnter={() => setIconColor(COLORS.darkBlue)}
                        onMouseLeave={() => setIconColor(COLORS.blue)}
                    >
                        <FilterIcon color={iconColor} />
                    </button>
                </div>

                {/* Liste der Prompts */}
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
