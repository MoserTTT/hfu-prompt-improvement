const call_improve_prompt = async (prompt_name_and_id) => {
  console.log("call_improve_prompt...");
  const data = { prompt_name_and_id: prompt_name_and_id }; // Create a data object with the prompt

  try {
    const response = await fetch("http://127.0.0.1:5000/prompt_improve", {
      method: "POST", // Use POST method for sending JSON data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data object to JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to eval prompt");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error in prompt eval:", error);
  }
};

export default call_improve_prompt;