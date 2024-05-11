import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import re
from datetime import datetime


class chromaDB_connector:
    def __init__(self, embedding_api_key: str, embedding_api_base: str = "https://hfu-prompt-improvement.openai.azure.com/", embedding_model_name: str = "Test-Ada"):
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

    # This function saves prompts to the database
    def create_prompt(self, prompt: str, metadata: dict):
        # validate the metadata
        self.__validate_metadata(metadata=metadata)

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

    # This function validates the metadata as defined in the docs
    def __validate_metadata(self, metadata):
        # Function that validates fields/keys
        def validate_field(key, value, type=str, required=False, min_length=2, max_length=50, printable=False):
            if required and key not in metadata:
                raise ValueError(f"{key} has to be set in metadata!")
            if key in metadata:
                if not isinstance(value, type):
                    raise ValueError(
                        f"The {key} has to be of type {str(type)}!")
                if len(value) < min_length or len(value) > max_length:
                    raise ValueError(
                        f"The {key} has to be of length between {min_length} and {max_length}")
                if printable and not value.isprintable():
                    raise ValueError(f"The {key} is not printable")
                if not printable and not re.match(r'^[a-zA-Z\-\'\s]+$', value):
                    raise ValueError(
                        f"The {key} can only contain letters, - ,' and whitespaces.")

        # Function that validates lists
        def validate_list(key, value, type=str, required=False, min_length=2, max_length=50, printable=False):
            if key in metadata:
                if not isinstance(value, list):
                    raise ValueError(f"The {key} has to be of type list!")
                for element in value:
                    validate_field(key=key, value=element, type=type, required=required,
                                   min_length=min_length, max_length=max_length, printable=printable)

        # check if there are any invalid keys in metadata
        if len([key for key in metadata if key not in self.allowed_metadata_keys]) > 0:
            raise ValueError(
                f"You entered invalid keys in the metadata: {str([key for key in metadata if key not in self.allowed_metadata_keys])}!")

        # validating each key
        validate_field("name", metadata.get("name"), required=True)
        validate_field("description", metadata.get(
            "description"), max_length=500, printable=True)
        validate_field("author", metadata.get("author"))
        validate_list("models", metadata.get("models"), printable=True)
        validate_list("tags", metadata.get("tags"), printable=True)
        validate_list("languages", metadata.get("languages"), printable=True)
        # validate_list("ratings", metadata.get("ratings"), printable=True)  # TODO: add further validation
        validate_list("comments", metadata.get("comments"),
                      max_length=500, printable=True)

    # This function uses vector search to query the database by a given query
    def get_prompt_by_vector(self, query: str, filter: dict = {}, top_n: int = 1, compile=True):

        # query prompts by vector
        query_result = self.__prompt_collection.query(
            query_texts=[query],
            n_results=top_n,
            where=filter,
            include=["metadatas", "documents"],
        )

        # compile prompts
        if compile:
            for i, result in enumerate(query_result["documents"][0]):
                query_result["documents"][0][i] = self.__compile_prompt(result)

        return query_result

    # This function uses filtering of metadata to return relevant prompts
    def get_prompt_by_metadata(self, filter: dict, top_n: int = 1, compile=True):
        # get all prompts that follow the set filter
        query_result = self.__prompt_collection.get(
            limit=top_n,
            where=filter,
            include=["documents", "metadatas"],
        )

        # compile prompts
        if compile:
            for i, result in enumerate(query_result["documents"]):
                query_result["documents"][i] = self.__compile_prompt(result)

        return query_result

    # This function replaces prompt specifications ({{name:1}} with the prompt
    def __compile_prompt(self, prompt: str):
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

    # This function returns the next version number for a prompt name
    def __find_new_version(self, name: str):
        # get all prompts with this name
        all_versions_of_prompt = self.get_prompt_by_metadata(
            filter={"name": name}, top_n=1000, compile=False)

        # set version to the highest one found +1
        version = 1
        for prompt_metadata in all_versions_of_prompt["metadatas"]:
            if prompt_metadata["version"] >= version:
                version = prompt_metadata["version"] + 1

        return version