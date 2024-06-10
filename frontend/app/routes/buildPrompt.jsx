import { BuildPrompt } from "../components";
import styles from "./styles/buildPrompt.style"

export default function buildPrompt() {
    return (
      <div>
        <h1 style={ styles.header }>Build Prompt</h1>
        <BuildPrompt/>
      </div>
    );
}