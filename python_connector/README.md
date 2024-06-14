# Running the Backend

### Creating a Prompt

To create a prompt, use the following URL:

```sh
http://127.0.0.1:5000/set_prompt
```

and the following body:

```json
{
    "prompt":"Wie erstellt man eine REST Schnittstelle?",
    "metadata":{"name":"rest-prompt"}
}
```

### Searching by Metadata

To search by metadata, use the following URL:

```sh
http://127.0.0.1:5000/prompt_by_metadata?filter={"name": "test-rest-prompt"}
```

### Searching by Vector

To search by vector, use the following URL:

```sh
http://127.0.0.1:5000/prompt_by_vector?query=REST Schnittstellen
```

These examples showcase some basic functionalities of the REST interface. For a comprehensive guide, please refer to the REST API documentation or the chromaDB_connector_docs.
