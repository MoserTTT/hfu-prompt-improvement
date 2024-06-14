import * as MDX from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import styles from "./styles/textPromptArea.style";
import { useState } from "react";

const TextPromptArea = () => {

    const [value, setValue] = useState("# Hello World");

    return (
        <div style={ styles.markdownArea }>
            <MDX.MDXEditor
                markdown={ value }
                onChange={(val) => setValue(val)}
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
                            {' '}
                            <MDX.DiffSourceToggleWrapper>
                                <MDX.UndoRedo/>
                                <MDX.Separator/>
                                <MDX.BoldItalicUnderlineToggles/>
                                <MDX.Separator/>
                                <MDX.ListsToggle/>
                                <MDX.Separator/>
                                <MDX.BlockTypeSelect/>
                                <MDX.Separator/>
                                <MDX.InsertThematicBreak/>
                                <MDX.CodeToggle/>
                                <MDX.InsertCodeBlock/>
                                <MDX.CreateLink/>
                                <MDX.Separator/>
                            </MDX.DiffSourceToggleWrapper>
                            </>
                        )
                    }),
                    MDX.codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
                    MDX.codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                    MDX.headingsPlugin(), MDX.listsPlugin(), MDX.quotePlugin(), MDX.thematicBreakPlugin(),
                    MDX.markdownShortcutPlugin()
                ]} />
        </div>
    );
}

export default TextPromptArea;