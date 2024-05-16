import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import re
from datetime import datetime


class chromaDB_connector:
    """
    Connects to the ChromaDB database and provides methods to interact with prompts.

    Args:
        embedding_api_key (str): API key for the Azure OpenAI embedding deployment.
        embedding_api_base (str, optional): Base URL for the embedding API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
        embedding_model_name (str, optional): Name of the embedding model to use. Defaults to "Test-Ada".
    """

    def __init__(self, embedding_api_key: str, embedding_api_base: str = "https://hfu-prompt-improvement.openai.azure.com/", embedding_model_name: str = "Test-Ada"):
        """
        Initializes the ChromaDB connector.

        Args:
            embedding_api_key (str): API key for the OpenAI embedding service.
            embedding_api_base (str, optional): Base URL for the embedding API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
            embedding_model_name (str, optional): Name of the embedding model to use. Defaults to "Test-Ada".
        """

        # creating the embedding function of the deployment
        self.__openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=embedding_api_key,
            api_base=embedding_api_base,
            api_type="azure",
            api_version="2023-05-15",
            model_name=embedding_model_name
        )

        # getting the client
        self.__client = chromadb.PersistentClient(path="chromadb_persistance")

        # getting or creating the collection
        self.__prompt_collection = self.__client.get_or_create_collection(
            embedding_function=self.__openai_ef, name="prompts")

        # defining the allowed metadata keys for metadata validation
        self.allowed_metadata_keys = [
            "name", "description", "author", "models", "tags", "languages", "ratings", "comments"]

    def create_prompt(self, prompt: str, metadata: dict):
        """
        Saves a prompt to the database.

        Args:
            prompt (str): The prompt text to be saved.
            metadata (dict): Metadata associated with the prompt.
        """

        # validate the metadata
        self.__validate_metadata(metadata=metadata)

        # convert all lists to strings, as it is impossible to save lists in chromadb
        metadata = self.__convert_metadata_lists_to_string(metadata=metadata)

        # enriching metadata
        metadata["version"] = self.__find_new_version(
            name=metadata["name"])  # dynamically look for the next version
        metadata["date_of_creation"] = datetime.now().strftime(
            '%Y-%m-%dT%H:%M:%S')

        # adding the prompt to the collection
        self.__prompt_collection.add(
            documents=[prompt],
            metadatas=metadata,
            ids=[f"{metadata['name']}:{metadata['version']}"]  # id is unique
        )

    def get_prompt_by_vector(self, query: str, filter: dict = {}, top_n: int = 1, compile=True):
        """
        Queries the database by vector search.

        Args:
            query (str): The query string.
            filter (dict, optional): Additional filtering criteria. Defaults to {}.
            top_n (int, optional): Number of results to return. Defaults to 1.
            compile (bool, optional): Whether to compile prompts. Defaults to True.

        Returns:
            dict: Query results.
        """

        # query prompts by vector
        query_result = self.__prompt_collection.query(
            query_texts=[query],
            n_results=top_n,
            where=filter,
            include=["metadatas", "documents"],
        )

        # compile prompts and convert list strings back to lists
        for i, result in enumerate(query_result["documents"][0]):
            if compile:
                query_result["documents"][0][i] = self.__compile_prompt(
                    result)  # compile prompts
            query_result["metadatas"][0][i] = self.__convert_metadata_strings_to_list(
                query_result["metadatas"][0][i])  # convert list strings back to lists

        return query_result

    def get_prompt_by_metadata(self, filter: dict, top_n: int = 1, compile=True):
        """
        Retrieves prompts based on metadata filtering.

        Args:
            filter (dict): Metadata filtering criteria.
            top_n (int, optional): Number of results to return. Defaults to 1.
            compile (bool, optional): Whether to compile prompts. Defaults to True.

        Returns:
            dict: Query results.
        """

        # get all prompts that follow the set filter
        query_result = self.__prompt_collection.get(
            limit=top_n,
            where=filter,
            include=["documents", "metadatas"],
        )

        # compile prompts and convert list strings back to lists
        for i, result in enumerate(query_result["documents"]):
            if compile:
                query_result["documents"][i] = self.__compile_prompt(
                    result)    # compile prompt
            query_result["metadatas"][i] = self.__convert_metadata_strings_to_list(
                query_result["metadatas"][i])  # convert list strings back to lists

        return query_result

    def __validate_metadata(self, metadata: dict):
        """
        Validates metadata fields.

        Args:
            metadata (dict): Metadata to be validated.
        """

        # Function that validates fields/keys
        def validate_field(key, value, type=str, required=False, min_length=2, max_length=50, has_to_pass_regex=False):
            if required and key not in metadata:
                raise ValueError(f"{key} has to be set in metadata!")
            if key in metadata:
                if not isinstance(value, type):
                    raise ValueError(
                        f"The {key} has to be of type {str(type)}!")
                if len(value) < min_length or len(value) > max_length:
                    raise ValueError(
                        f"The {key} has to be of length between {min_length} and {max_length}")
                if not value.isprintable():
                    raise ValueError(f"The {key} is not printable")
                if has_to_pass_regex and not re.match(r'^[a-zA-Z0-9\-\'\s]+$', value):
                    raise ValueError(
                        f"The {key} can only contain letters, numbers, - ,' and whitespaces.")

        # Function that validates lists
        def validate_list(key, value, type=str, required=False, min_length=2, max_length=50, printable=False):
            if key in metadata:
                if not isinstance(value, list):
                    raise ValueError(f"The {key} has to be of type list!")
                for element in value:
                    validate_field(key=key, value=element, type=type, required=required,
                                   min_length=min_length, max_length=max_length, has_to_pass_regex=printable)

        # check if there are any invalid keys in metadata
        if len([key for key in metadata if key not in self.allowed_metadata_keys]) > 0:
            raise ValueError(
                f"You entered invalid keys in the metadata: {str([key for key in metadata if key not in self.allowed_metadata_keys])}!")

        # validating each key
        validate_field("name", metadata.get("name"),
                       required=True, has_to_pass_regex=True)
        validate_field("description", metadata.get(
            "description"), max_length=500)
        validate_field("author", metadata.get(
            "author"), has_to_pass_regex=True)
        validate_list("models", metadata.get("models"))
        validate_list("tags", metadata.get("tags"))
        validate_list("languages", metadata.get("languages"))
        # validate_list("ratings", metadata.get("ratings"))  # TODO: add further validation
        validate_list("comments", metadata.get("comments"),
                      max_length=500)

    def __convert_metadata_lists_to_string(self, metadata: dict):
        """
        Converts all the lists of metadata into strings

        Args:
            metadata (dict): The metadata to convert.

        Returns:
            dict: The converted metadata.
        """

        # loop through all keys in metadata and convert if they are of type list by specification
        for key, value in metadata.items():
            if key in ["models", "tags", "languages", "comments"]:
                # using \n as it is forbbiden as input and will never occur naturally
                metadata[key] = '\n'.join(value)
        return metadata

    def __convert_metadata_strings_to_list(self, metadata: dict):
        """
        Converts all the strings that should be lists of metadata into lists

        Args:
            metadata (dict): The metadata to convert.

        Returns:
            dict: The converted metadata.
        """

        # loop through all keys in metadata and convert if they are of type list by specification
        for key, value in metadata.items():
            if key in ["models", "tags", "languages", "comments"]:
                # using \n as it is forbbiden as input and will never occur naturally
                metadata[key] = value.split('\n')
        return metadata

    def __compile_prompt(self, prompt: str):
        """
        Replaces prompt specifications with actual prompt values.

        Args:
            prompt (str): The prompt string with specifications.

        Returns:
            str: Compiled prompt.
        """

        # search for prompt pieces in prompt
        matches = re.finditer(r"\{{(.*?)\}}", prompt)

        # loop through all found prompt pieces
        for match in matches:
            original_match = match.group(1)

            # check if the match has not yet been replaced and if there is one : in the match
            if original_match in prompt and original_match.count(":") == 1:
                # lookup the latest version if latest was used
                if original_match.split(":")[1] == "latest":
                    prompt_name_and_version = original_match.replace(
                        ":latest", ":" + str(self.__find_new_version(name=original_match.split(":")[0])-1))
                else:
                    prompt_name_and_version = original_match

                # get relevant prompt
                query_result = self.__prompt_collection.get(
                    ids=[prompt_name_and_version]
                )
                # if the specified prompt exists
                if len(query_result["documents"]) > 0:
                    prompt_piece = query_result["documents"][0]

                    # replace prompt specification with value
                    prompt = prompt.replace(
                        "{{" + original_match + "}}", prompt_piece)

        return prompt

    def __find_new_version(self, name: str):
        """
        Finds the next version number for a prompt name.

        Args:
            name (str): The name of the prompt.

        Returns:
            int: Next version number.
        """

        # get all prompts with this name
        all_versions_of_prompt = self.get_prompt_by_metadata(
            filter={"name": name}, top_n=1000, compile=False)

        # set version to the highest one found +1
        version = 1
        for prompt_metadata in all_versions_of_prompt["metadatas"]:
            if prompt_metadata["version"] >= version:
                version = prompt_metadata["version"] + 1

        return version
