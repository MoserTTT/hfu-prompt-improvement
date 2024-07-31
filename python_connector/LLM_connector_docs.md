## AzureOpenAIHandler Class

Connects to Azure OpenAI services and facilitates prompt evaluation and improvement using a language model.

### Code Explanation

### Constructor

#### `__init__(api_key: str, endpoint: str = 'https://hfu-prompt-improvement.openai.azure.com/', api_version: str = "2024-02-01", deployment_name: str = "EvaluateAndExecutePrompts")`

Initializes an instance of the AzureOpenAIHandler class.

- **Parameters:**
  - `api_key` (str): API key for Azure OpenAI services.
  - `endpoint` (str, optional): Base URL for the Azure OpenAI API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
  - `api_version` (str, optional): API version of the deployment. Defaults to "2024-02-01".
  - `deployment_name` (str, optional): Name of the embedding model to use. Defaults to "EvaluateAndExecutePrompts".

### Methods

#### `call_LLM(prompt: str, system_prompt: str = None, max_tokens: int = 500) -> str`

Calls the Language Model (LLM) to generate a response based on the provided prompt.

- **Parameters:**
  - `prompt` (str): The user prompt to send to the LLM.
  - `system_prompt` (str, optional): Optional system prompt for context.
  - `max_tokens` (int, optional): Maximum number of output tokens. Defaults to 500.
- **Returns:**
  - `str`: The LLM-generated response.

#### `eval_prompt_by_LLM(prompt_name_and_id: str) -> dict`

Evaluates a prompt by its name and version using the LLM.

- **Parameters:**
  - `prompt_name_and_id` (str): Name and version of the prompt, e.g., "rest-prompt:1".
- **Returns:**
  - `dict`: Dictionary containing evaluation scores and the new prompt ID.

#### `improve_prompt(prompt_name_and_id: str) -> str`

Improves a prompt by its name and version using the LLM and provided ratings.

- **Parameters:**
  - `prompt_name_and_id` (str): Name and version of the prompt, e.g., "rest-prompt:1".
- **Returns:**
  - `str`: The improved prompt.

### Internal Methods

#### `__compile_prompt(template: str, **kwargs) -> str`

Compiles a prompt based on a template and provided variables.

- **Parameters:**
  - `template` (str): The template of the prompt. Use {} to insert kwargs.
  - `**kwargs`: Variables to insert into the template.
- **Returns:**
  - `str`: The compiled prompt.

#### `__request_prompt(prompt_name_and_version: str) -> requests.Response`

Fetches a prompt based on its name and version.

- **Parameters:**
  - `prompt_name_and_version` (str): Name and version of the prompt, e.g., "prompt1:2".
- **Returns:**
  - `requests.Response`: Response object containing the prompt data.
