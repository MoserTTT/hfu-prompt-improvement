const transformMarkdownContent = (input) => {
    // Regular expression to match the <Prompt> component and capture its content attribute
    const promptRegex = /<Prompt\s+title="([^"]*)"\s+content="([^"]*)"[^>]*\/>/g;

    // Replace all occurrences of <Prompt> components with their content attribute
    const output = input.replace(promptRegex, (match, title, content) => {
        return content; // Replace with the content attribute
    });

    return output;
};

export default transformMarkdownContent;