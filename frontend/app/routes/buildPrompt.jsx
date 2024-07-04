import { DndContext, DragOverlay } from "@dnd-kit/core";
import { BuildPrompt, Prompt } from "../components";
import useStore from "../components/buildPrompt/utils/markdownContentStore";
import SearchSidebar from "../components/sidebars/searchSidebar/SearchSidebar";
import styles from "./styles/buildPrompt.style";
import CollapsableArrow from "../components/sidebars/menuSidebar/assets/CollapsableArrow";
import { useState } from "react";
import { SearchIcon } from "../../assets/icons/components";
import COLORS from "../../styles/theme";

export default function buildPrompt() {
    // Extracting state and setter functions from the store
    const setMarkdownContent = useStore(state => state.setMarkdownContent);
    const markdownContent = useStore(state => state.markdownContent);
    const setDnD = useStore(state => state.setDnD);

    var movedPixel_cnt = 0;

    const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);

    // Function to handle drag end event (prompt)
    const handleDragEnd = (event) => {
      if(movedPixel_cnt > 20){
        const { over, active } = event;
        if (over && over.id === 'droppable') {
          // Append the dropped content to the markdown content
          setMarkdownContent(markdownContent + "\n\n" + '\n<Prompt title="' + active.id + '" content="' + active.data.current.content + '" />', true);
          // Set DragAndDrop state to true
          setDnD(true);
        }
        document.body.style.overflow = 'auto';
        document.getElementsByClassName("css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop")[0].style.opacity = 1;
        document.getElementsByClassName("css-1160xiw-MuiPaper-root-MuiDrawer-paper")[0].style.opacity = 1;
        movedPixel_cnt = 0;
      }
    }

    const handleDragStart = () => {
      document.body.style.overflow = 'hidden';
    }

    const handleDragMove = () => {
      movedPixel_cnt++;
      if(movedPixel_cnt > 20){
        document.getElementsByClassName("css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop")[0].style.opacity = 0;
        document.getElementsByClassName("css-1160xiw-MuiPaper-root-MuiDrawer-paper")[0].style.opacity = 0;
      }
    }

    const handleDragOver = () => {
      movedPixel_cnt = 0;
    }

    return (
      <div>
        <div style={ styles.heading }>
          <h1 style={ styles.header }>Build Prompt</h1>
          <div style={ styles.collapseSearch } onClick={() => setIsSearchSidebarOpen(!isSearchSidebarOpen)}>
            <SearchIcon width={40} height={40} color={COLORS.blue}/>
            <CollapsableArrow rotationLeft="0" rotationRight="180" changeRotation={ isSearchSidebarOpen }/>
          </div>
        </div>
        <div style={ styles.root }>
          <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove} onDragStart={handleDragStart} onDragOver={handleDragOver}>
            <div>
              <SearchSidebar style={ styles.searchSidebar } searchOpen={isSearchSidebarOpen} setSearchOpen={setIsSearchSidebarOpen}/>
            </div>
            <div style={ styles.buildPrompt }>
              <BuildPrompt/>
            </div>
              <DragOverlay>
                <Prompt
                    name="Prompt Name"
                    dateCreated="DD. Month Year"
                    status="Status"
                />
              </DragOverlay>
          </DndContext>
        </div>
      </div>
    );
}