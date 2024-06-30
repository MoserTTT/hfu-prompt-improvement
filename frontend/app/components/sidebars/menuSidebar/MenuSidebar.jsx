import React from "react";
import COLORS from "../../../../styles/theme";
import { BuildPromptIcon, OldSettingsIcon, SettingsIcon, StatisticIcon } from "../../../../assets/icons/components";
import { Drawer, ListItemIcon, ListItemText, Typography, List, Divider, ListItemButton } from "@mui/material";
import styles from "./styles/menuSidebar.style";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import CollapsableArrow from "./assets/CollapsableArrow";

const MenuSidebar = ({ onToggle }) => {

  // useNavigate hook to handle navigation within the component
  const history = useNavigate();

  // track the currently selected menu item index
  const [selectedItem, setSelectedItem] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState(true);

  // Define menu items as an array of objects
  const menuItems = [
    {
      text: 'Build Prompt',
      disabled: false,
      icon: <BuildPromptIcon
              color={(selectedItem === 0) ? COLORS.blue : COLORS.black}
              height={42}
              width={42}
              />,
      path: '/buildPrompt'
    },
    {
      text: 'MyPrompt',
      disabled: true,
      icon: <OldSettingsIcon
              color={(selectedItem === 1) ? COLORS.blue : COLORS.black}
              height={42}
              width={42}
              />,
      path: '/'
    },
    {
      text: 'Statistics',
      disabled: true,
      icon: <StatisticIcon
              color={(selectedItem === 1) ? COLORS.blue : COLORS.black}
              height={42}
              width={42}
              />,
      path: '/'
    },
    {
      text: 'Settings',
      disabled: true,
      icon: <SettingsIcon
              color={(selectedItem === 1) ? COLORS.blue : COLORS.black}
              height={42}
              width={42}
              />,
      path: '/'
    },
  ];

  function onChangeCollapse(){
    setIsCollapsed(!isCollapsed);
    onToggle(isCollapsed);
  }

  // Function to handle click events on menu items
  function onListItemClick(index, path) {
    // Update selected item state
    setSelectedItem(index);
    // Navigate to the corresponding path
    history(path);
  }

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left" >
        <div style={styles.navHeader}>
          <img
            style={styles.navHeaderLogo}
            src="../../../../assets/icons/gft_icon.png" 
            alt="GFT Logo"/>
            {
              !isCollapsed ? (
                <Typography
                  style={styles.navHeaderText} >
                      Builder
                </Typography>
              ) : ""
            }
          <button
            style={ styles.collapseArrow } 
            onClick={() => onChangeCollapse()}
            >
            <CollapsableArrow
              rotationLeft="0"
              rotationRight="180"
              changeRotation={ isCollapsed }
              />
          </button>
          
        </div>
        <Divider />
        <List
          style={ styles.list }>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={item.text}
              disabled={item.disabled}
              style={ styles.listItemButton }
              onClick={() => onListItemClick(index, item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {
                !isCollapsed ? (
                  <ListItemText
                  disableTypography
                  style={selectedItem === index ? styles.selectedListItemText : styles.listItemText}
                  primary={item.text}
                ></ListItemText>
                ) : ""
              }
              
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default MenuSidebar;