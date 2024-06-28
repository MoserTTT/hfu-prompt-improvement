import React, { useEffect, useState } from "react";
import { Drawer, List, TextField, Typography, Divider, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import CollapsableArrow from "../menuSidebar/assets/CollapsableArrow";
import COLORS from "../../../../styles/theme";
import styled from "@emotion/styled";
import styles from "./styles/filterSidebar.style";

const StyledDrawer = styled(Drawer)`
    ${styles.root}
`;

const FilterSidebar = ({ onClose }) => {
    // State variables for different filters
    const [authorFilter, setAuthorFilter] = useState("");
    const [creationDateFilter, setCreationDateFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [languageFilter, setLanguageFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(true); // State to control if the sidebar is open

    // Function to handle closing the sidebar
    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        console.log("FilterSidebar is open!"); // Log when the sidebar is opened
    }, []);

    // Event handlers for filter changes
    const handleAuthorFilterChange = (event) => {
        setAuthorFilter(event.target.value);
    };

    const handleCreationDateFilterChange = (event) => {
        setCreationDateFilter(event.target.value);
    };

    const handleTagFilterChange = (event) => {
        setTagFilter(event.target.value);
    };

    const handleLanguageFilterChange = (event) => {
        setLanguageFilter(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleModelFilterChange = (event) => {
        setModelFilter(event.target.value);
    };

    return (
        <StyledDrawer variant="persistent" anchor="right" open={isFilterOpen} onClose={handleClose}>
            <div className="root">
                {/* Header with title and collapse button */}
                <div className="navHeader">
                    <Typography variant="h6">Filter</Typography>
                    <button className="collapseArrow" onClick={handleClose}>
                        {/* Custom collapsible arrow icon */}
                        <CollapsableArrow rotationLeft="0" rotationRight="180" changeRotation={true} />
                    </button>
                </div>
                <Divider />
                <List>
                    {/* Mapping through filter options */}
                    {[
                        { id: 'author-filter', label: 'Filter by Author', value: authorFilter, onChange: handleAuthorFilterChange },
                        { id: 'creation-date-filter', label: 'Filter by Creation Date', value: creationDateFilter, onChange: handleCreationDateFilterChange },
                        { id: 'tag-filter', label: 'Filter by Tag', value: tagFilter, onChange: handleTagFilterChange },
                        { id: 'language-filter', label: 'Filter by Language', value: languageFilter, onChange: handleLanguageFilterChange }
                    ].map(({ id, label, value, onChange }) => (
                        <TextField
                            key={id}
                            style={{ margin: "10px 20px" }}
                            id={id}
                            label={label}
                            value={value}
                            onChange={onChange}
                        />
                    ))}
                    {/* Dropdown for status filter */}
                    <FormControl className="formControl">
                        <InputLabel className="inputLabel" id="status-filter-label">Filter by Status</InputLabel>
                        <Select
                            className="select"
                            labelId="status-filter-label"
                            id="status-filter"
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Dropdown for model filter */}
                    <FormControl className="formControl">
                        <InputLabel className="inputLabel" id="model-filter-label">Filter by Model</InputLabel>
                        <Select
                            className="select"
                            labelId="model-filter-label"
                            id="model-filter"
                            value={modelFilter}
                            onChange={handleModelFilterChange}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value={"Model A"}>Model A</MenuItem>
                            <MenuItem value={"Model B"}>Model B</MenuItem>
                            <MenuItem value={"Model C"}>Model C</MenuItem>
                        </Select>
                    </FormControl>
                </List>
            </div>
        </StyledDrawer>
    );
};

export default FilterSidebar;
