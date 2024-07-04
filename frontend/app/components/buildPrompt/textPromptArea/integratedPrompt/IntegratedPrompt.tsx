import React, { useState } from "react";
import { JsxComponentDescriptor } from "@mdxeditor/editor";
import CollapsableArrow from "../../../sidebars/menuSidebar/assets/CollapsableArrow";
import styles from "./integratedPrompt.style";

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'Prompt', // Name of your component
    kind: 'text', // Inline or block component (text or flow)
    // Assuming your CustomComponent is a local component, no source needed
    source: undefined, // Source path if external
    props: [
      { name: 'title', type: 'string' },
      { name: 'content', type: 'string' }
    ],
    hasChildren: false, // Specify if the component allows child elements
    Editor: ( props ) => {

      const [collapsed, setCollapsed] = useState(false);

      return (
        <div>
          <button style={ styles.button } onClick={() => setCollapsed(!collapsed)}>
            <div style={ styles.heading }>
              <CollapsableArrow rotationLeft="90" rotationRight="0" style={ styles.arrowIcon } changeRotation={collapsed}/>
              <p>{ props.mdastNode.attributes[0].value?.toString()}</p>
            </div>
          </button>
          {
            collapsed &&
            <div style={ styles.prompt }>
              <p
                style={styles.promptText}
                contentEditable
                suppressContentEditableWarning={true}
              >{ props.mdastNode.attributes[1].value?.toString() }</p>
            </div>
          }
        </div>
      )
    }
  },
]

export default jsxComponentDescriptors;