# Running the Backend

## Preparation

### Environment Setup

Ensure the `EF_API_KEY` environment variable is set with your Azure OpenAI key for the Ada 2 deployment.

### Docker Installation

Make sure Docker is installed and running on your system. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Correct Directory

Navigate to the `python_connector` directory in your project.

```sh
cd ./python_connector
```

## Starting the Backend

To start the backend, use Docker Compose:

```sh
docker-compose up
```

## Building and Starting the Python Connector

To build the Python connector and start the services, use the following command:

```sh
docker-compose up --build
```

# Using the Backend

You can interact with the backend through its REST API. Here are some simple examples:

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
