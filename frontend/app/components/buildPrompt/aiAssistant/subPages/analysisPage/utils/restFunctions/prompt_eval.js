const prompt_eval = async (prompt_name_and_id) => {
  console.log("prompt_eval...");
  
  const data = { prompt_name_and_id: prompt_name_and_id }; // Create a data object with the prompt

  try {
    const response = await fetch("http://127.0.0.1:5000/prompt_eval", {
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

    return (
      "Completeness Score: " +
      responseData.completeness[0][0] + "\n" +
      responseData.completeness[0][1] + "\n\n" +
      "Structure Score: " +
      responseData.structure[0][0] + "\n" +
      responseData.structure[0][1]
    );
  } catch (error) {
    console.error("Error in prompt eval:", error);
  }
};

export default prompt_eval;
