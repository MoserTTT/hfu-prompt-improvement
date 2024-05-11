# chromaDB_connector Class

Connects to the ChromaDB database and provides methods to interact with prompts.

## Code Explanation

### Constructor

#### `__init__(embedding_api_key: str, embedding_api_base: str = "https://hfu-prompt-improvement.openai.azure.com/", embedding_model_name: str = "Test-Ada")`

Initializes the ChromaDB connector.

- **Parameters:**
  - `embedding_api_key` (str): API key for the OpenAI embedding service.
  - `embedding_api_base` (str, optional): Base URL for the embedding API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
  - `embedding_model_name` (str, optional): Name of the embedding model to use. Defaults to "Test-Ada".

### Methods

#### `create_prompt(prompt: str, metadata: dict) -> None`

Saves a prompt to the database.

- **Parameters:**
  - `prompt` (str): The prompt text to be saved.
  - `metadata` (dict): Metadata associated with the prompt. Metadata is specified more specifically in the Specification section later.

#### `get_prompt_by_vector(query: str, filter: dict = {}, top_n: int = 1, compile=True) -> dict`

Queries the database by vector search.

- **Parameters:**
  - `query` (str): The query string.
  - `filter` (dict, optional): Additional filtering criteria. Defaults to {}.
  - `top_n` (int, optional): Number of results to return. Defaults to 1.
  - `compile` (bool, optional): Whether to compile prompts. Defaults to True.
- **Returns:**
  - `dict`: Query results. Format: 
  
  `{'ids': [['name:1']],
 'distances': None,
 'metadatas': [[{'name': 'name', 'version': 1}]],
 'embeddings': None,
 'documents': [['test_prompt']],
 'uris': None,
 'data': None}`

#### `get_prompt_by_metadata(filter: dict, top_n: int = 1, compile=True) -> dict`

Retrieves prompts based on metadata filtering.

- **Parameters:**
  - `filter` (dict): Metadata filtering criteria.
  - `top_n` (int, optional): Number of results to return. Defaults to 1.
  - `compile` (bool, optional): Whether to compile prompts. Defaults to True.
- **Returns:**
  - `dict`: Query results. Format:

```
{
'ids': ['name:1'],
'embeddings': None,
'metadatas': [{'name': 'name', 'version': 1}],
'documents': ['test_prompt'],
'uris': None,
'data': None
}
 ```

### Private Methods

#### `__validate_metadata(metadata: dict) -> None`

Validates metadata fields.

- **Parameters:**
  - `metadata` (dict): Metadata to be validated.

#### `__compile_prompt(prompt: str) -> str`

Replaces prompt specifications with actual prompt values.

- **Parameters:**
  - `prompt` (str): The prompt string with specifications.
- **Returns:**
  - `str`: Compiled prompt.

#### `__find_new_version(name: str) -> int`

Finds the next version number for a prompt name.

- **Parameters:**
  - `name` (str): The name of the prompt.
- **Returns:**
  - `int`: Next version number.

## Specification

### Prompt
Currently 1000 versions can be created of one prompt. This is limited by the `__find_new_version()` method and can be adjusted to allow for more if needed.

If you want to use other prompts in prompts you can use them like: `{{NAME:VERSION}}`. Alternatively, you can use `latest` as the version if you always want to get the latest version on compilation.

### Metadata
#### Format
The Format is a dict like:

```
{
"name":"name",
"description":"description",
"author": "author",
"models": ["model1","model2"],
"tags": ["tag1","tag2"],
"languages": ["language1","language2"],
"ratings": [],
"comments": ["comment1","comment2"]
}
```

#### Name
- Description: The name of the prompt. Should be unique.
- Is required.
- Type: str
- Length: Between 2 and 50 characters
- Allowed Characters: Letters, '-', ''', and whitespaces

#### Description
- Description: A description of the prompt. Provides additional context.
- Type: str
- Length: Up to 500 characters
- Printable: Yes

#### Author
- Description: The author of the prompt.
- Type: str
- Length: Between 2 and 50 characters
- Allowed Characters: Letters, '-', ''', and whitespaces

#### Models
- Description: Models associated with the prompt.
- Type: A list of str
- Str length: Between 2 and 50 characters
- Printable: Yes

#### Tags
- Description: Tags associated with the prompt.
- Type: A list of str
- Str length: Between 2 and 50 characters
- Printable: Yes

#### Languages
- Description: Languages used in the prompt.
- Type: A list of str
- Str length: Between 2 and 50 characters
- Printable: Yes

#### Ratings
- Description: Ratings associated with the prompt.
- Not yet specified!

#### Comments
- Description: Comments associated with the prompt.
- Type: A list of str
- Str length: Up to 500 characters
- Printable: Yes


## Usage Example

### Import
First, import the `chromaDB_connector` class:
```python
from chromaDB_connector import chromaDB_connector
```
Ensure that the location of your working directory is relative to the `chromaDB_connector.py` file.

### Initialization
Initialize the class with your embedding API key:
```python
chromaDB_connector = chromaDB_connector(embedding_api_key="INSERT_KEY_HERE")
```

### Create a Prompt
To save a prompt, use the following syntax:
```python
chromaDB_connector.create_prompt(prompt="test_prompt", metadata={"name": "test-name"})
```

### Search with Vector Search
Perform a vector search using the following command:
```python
chromaDB_connector.get_prompt_by_vector(query="test", top_n=1)
```

### Get Filtered Prompts
Retrieve filtered prompts using the metadata filter:
```python
chromaDB_connector.get_prompt_by_metadata(filter={"name": "test_name"}, top_n=1)
```


