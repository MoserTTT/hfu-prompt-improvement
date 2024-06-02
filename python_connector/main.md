# main.py
Main file for the Flask application that manages access to the database through stateless HTTP Requests.

## Code Explanation 
**Note: Parameters in the following Documentation refer to URI Parameters, not *Function* Parameters unless specified**
### Constructor
Initializes a main object with an instance of a `chromaDB_connector` as well as initializing the Flask application. The `chromaDB_connector` uses the "EF_API_KEY" system variable as a key. Sets up all the available Routes.
- **Function Parameters**
  - None

### Methods
#### `setup_routes()`
Nested function that sets up the API Routes.
- **Function Parameters**
  - None
#### `home()`
A simple route that returns a greeting message.
- **Parameters**
  - None
#### `call_create_prompt()`
A POST route that creates a new prompt in the database.
- **Parameters**
  - None 

- **Example of an expected JSON Body**
  ```json
  {
    "prompt": "Your prompt text here",          *required
   "metadata": {
    "name": "name",                             *required
    "description": "description",
    "author": "authors name",
    "models": ["model 1", "model2"],
    "tags": ["tag", "other tag"],
    "languages": ["C Sharp", "Java"],
    "comments": ["comment1", "comment2"]
    }
  }

- **Responses**
    - 200 OK if the prompt is added successfully
    - 400 Bad Request if the required parameters are missing
    - 500 Internal Server Error if there is an unexpected error

#### `call_get_by_metadata()`
A GET route that retrieves prompts based on metadata filters.
- **Parameters**
    - ``filter`` (string, required): A filter condition in string format
    - ``top_n`` (string, optional): Number of top results to return.
    - ``compile`` (string, optional): Compilation flag.
- **Responses**
    - ``200 OK`` with the result in JSON format
    - ``400 Bad Request`` if the required parameters are missing
    - ``500 Internal Server Error`` if there is an unexpected error
#### ``call_get_by_vector()``
A GET route that retrieves prompts based on a vector query.
- **Parameters**
  - `query` (string, required): The vector query in string format.
  - `filter` (string, optional): A filter condition in string format.
  - `top_n` (string, optional): Number of top results to return.
  - `compile` (string, optional): Compilation flag.
- **Responses**
    - `200 OK` with the result in JSON format
    - `400 Bad Request` if the required parameters are missing
    - `500 Internal Server Error` if there is an unexpected error
