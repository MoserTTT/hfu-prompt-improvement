import React, { useEffect, useRef } from "react";
import * as MDX from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useDroppable } from '@dnd-kit/core';
import styles from "./styles/textPromptArea.style";
import useStore from "../utils/markdownContentStore";

const TextPromptArea = () => {
  // Hook to set the droppable area
  const { setNodeRef } = useDroppable({ id: 'droppable' });

  // Accessing state variables from the store
  const markdownContent = useStore(state => state.markdownContent);
  const setMarkdownContent = useStore(state => state.setMarkdownContent);
  const contentAddedByDnD = useStore(state => state.contentAddedByDnD);
  const setDnD = useStore(state => state.setDnD);

  // Ref to the contentEditable area
  const contentEditableRef = useRef(null);

  useEffect(() => {
    // Checking if content was added by drag and drop
    if (contentAddedByDnD) {
      // Delaying the focusing logic slightly to ensure it runs after rendering
      setTimeout(() => {
        // Getting the contentEditable element
        const contentEditableElement = contentEditableRef.current;
        // Checking if contentEditableElement is a valid element
        if (contentEditableElement && contentEditableElement.nodeType === Node.ELEMENT_NODE) {
          // Focusing the contentEditable element
          contentEditableElement.focus();
          // Creating a range
          const range = document.createRange();
          // Selecting the entire content of the contentEditable element
          range.selectNodeContents(contentEditableElement);
          // Collapsing the range to the end
          range.collapse(false);
          // Getting the selection
          const selection = window.getSelection();
          // Removing any existing range
          selection.removeAllRanges();
          // Adding the range to the selection
          selection.addRange(range);
        }
        // Resetting DragAndDrop state after focusing
        setDnD(false);
      }, 0);
    }
  }, [contentAddedByDnD, setDnD]);

  return (
    <div ref={setNodeRef} style={styles.markdownArea}>
      <MDX.MDXEditor
        key={contentAddedByDnD ? markdownContent : undefined}
        ref={contentEditableRef}
        markdown={markdownContent}
        onChange={val => setMarkdownContent(val, false)}
        contentEditableClassName="mdEditor"
        plugins={[
          MDX.diffSourcePlugin({
            diffMarkdown: 'An older version',
            viewMode: 'rich-text',
            readOnlyDiff: true
          }),
          MDX.toolbarPlugin({
            toolbarContents: () => (
              <>
                <MDX.DiffSourceToggleWrapper>
                  <MDX.UndoRedo />
                  <MDX.Separator />
                  <MDX.BoldItalicUnderlineToggles />
                  <MDX.Separator />
                  <MDX.ListsToggle />
                  <MDX.Separator />
                  <MDX.BlockTypeSelect />
                  <MDX.Separator />
                  <MDX.InsertThematicBreak />
                  <MDX.CodeToggle />
                  <MDX.InsertCodeBlock />
                  <MDX.CreateLink />
                  <MDX.Separator />
                </MDX.DiffSourceToggleWrapper>
              </>
            )
          }),
          MDX.codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          MDX.codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
          MDX.headingsPlugin(), MDX.listsPlugin(), MDX.quotePlugin(), MDX.thematicBreakPlugin(),
          MDX.markdownShortcutPlugin()
        ]}
      />
    </div>
  );
};

export default TextPromptArea;
