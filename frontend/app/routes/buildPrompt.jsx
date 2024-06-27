import { DndContext } from "@dnd-kit/core";
import { BuildPrompt } from "../components";
import useStore from "../components/buildPrompt/utils/markdownContentStore";
import SearchSidebar from "../components/sidebars/searchSidebar/SearchSidebar";
import styles from "./styles/buildPrompt.style";

export default function buildPrompt() {
    // Extracting state and setter functions from the store
    const setMarkdownContent = useStore(state => state.setMarkdownContent);
    const markdownContent = useStore(state => state.markdownContent);
    const setDnD = useStore(state => state.setDnD);

    // Function to handle drag end event (prompt)
    const handleDragEnd = (event) => {
      const { over, active } = event;
      if (over && over.id === 'droppable') {
        // Append the dropped content to the markdown content
        setMarkdownContent(markdownContent + "\n\n" + '\n<Prompt title="' + active.id + '" content="' + active.data.current.content + '" />', true);
        // Set DragAndDrop state to true
        setDnD(true);
      }
      document.body.style.overflow = 'scroll';
    }

    const handleDragStart = () => {
      document.body.style.overflow = 'hidden';
    }

    return (
      <div>
        <h1 style={ styles.header }>Build Prompt</h1>
          <div style={ styles.root }>
            <DndContext onDragEnd={handleDragEnd}>
              <div>
                <SearchSidebar onToggle="foo"/>
              </div>
              <div style={{ overflowX: 'hidden', flex: 1, marginRight: '10px' }}>
                <BuildPrompt/>
              </div>
            </DndContext>
          </div>
      </div>
    );
}