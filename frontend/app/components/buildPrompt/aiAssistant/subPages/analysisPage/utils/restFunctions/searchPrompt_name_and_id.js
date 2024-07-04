const searchPrompt_name_and_id = async (name) => {
  console.log("searchPrompt_name_and_id...");

  const query = encodeURIComponent(name);
  const url = `http://127.0.0.1:5000/prompt_by_vector?query=${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to search by vector");
    }

    const responseData = await response.json();
    return responseData.ids[0][0];
  } catch (error) {
    console.error("Error searching by vector:", error);
  }
};

export default searchPrompt_name_and_id;
