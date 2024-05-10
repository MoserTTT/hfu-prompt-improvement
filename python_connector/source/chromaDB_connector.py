import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import re
import os
from datetime import datetime



class chromaDB_connector:
    def __init__(self):
        self.__openai_ef = embedding_functions.OpenAIEmbeddingFunction( # TODO private attributes?
                        api_key=os.environ.get('EF_API_KEY'), # YOU HAVE TO SET AN ENVIRONEMT VAR
                        api_base="https://hfu-prompt-improvement.openai.azure.com/",
                        api_type="azure",
                        api_version="2023-05-15",
                        model_name="Test-Ada"
                    )
        self.__client = chromadb.PersistentClient(path="chromadb_persistance")
        self.__prompt_collection = self.__client.get_or_create_collection(embedding_function=self.__openai_ef, name="prompts")
        
        self.allowed_metadata_keys = ["name", "description","author", "models", "tags", "languages", "ratings", "comments"]



    def create_prompt(self, prompt:str, metadata: dict): 
        self._validate_metadata(metadata=metadata)
        
        # get correct version
        all_versions_of_prompt = self.get_prompt_by_metadata(filter = {"name":metadata["name"]}, top_n = 1, compile = False)
        version = 1
        for prompt_metadata in all_versions_of_prompt["metadatas"]:
            if prompt_metadata["version"] >= version:
                version = prompt_metadata["version"] +1
        
        # enriching metadat
        metadata["version"] = version
        metadata["date_of_creation"] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')   # TODO string oder float objekt?
        #TODO Autor? Bentzerverwalung? und alle anderen
        
        self.__prompt_collection.add(
            documents=[prompt], 
            metadatas=metadata,
            ids=[f"{metadata['name']}:{version}"]
        )
        return # TODO sollte man irgendwie success returnen?


    def _validate_metadata(self, metadata):
        # check if there are any invalid keys in metadata
        if len([key for key in metadata if key not in self.allowed_metadata_keys]) > 0:
            raise ValueError(f"You entered invalid keys in the metadata: {str([key for key in metadata if key not in self.allowed_metadata_keys])}!")
        
        # name validation
        if type(metadata["name"]) != str:
            raise ValueError("The name has to be of type str!")
        if len(metadata["name"]) < 2 or len(metadata["name"]) > 50:
            raise ValueError("The name has to be of length >2 and < 50")
        if not re.match(r'^[a-zA-Z\-\'\s]+$', metadata["name"]):
            raise ValueError("The name can only contain letters, hyphens, apostrophes and spaces")
        
        # description validation
        if "description" in metadata:
            if type(metadata["description"]) != str:
                raise ValueError("The description has to be of type str!")
            if len(metadata["description"]) < 2 or len(metadata["description"]) > 500:
                raise ValueError("The description has to be of length >2 and < 500")
            if not metadata["description"].isprintable():
                raise ValueError("The description is not printable")
        
        # author validation
        if "author" in metadata:
            if type(metadata["author"]) != str:
                raise ValueError("The author has to be of type str!")
            if len(metadata["author"]) < 2 or len(metadata["author"]) > 50:
                raise ValueError("The author has to be of length >2 and < 50")
            if not re.match(r'^[a-zA-Z\-\'\s]+$', metadata["author"]):
                raise ValueError("The author can only contain letters, hyphens, apostrophes and spaces")
        


    def get_prompt_by_vector(self, query:str, filter:dict = {}, top_n:int = 1, compile = True): #TODO signature
        # TODO validate inputs or not?
        
        # query prompts by vector
        query_result = self.__prompt_collection.query(
            query_texts=[query],
            n_results=top_n,
            where=filter,
            include=["metadatas","documents"],
        )
        # compile prompts
        if compile:
            for i, result in enumerate(query_result["documents"][0]):
                query_result["documents"][0][i] = self._compile_prompt(result)
        
        return query_result 


    def get_prompt_by_metadata(self, filter:dict, top_n:int=1, compile = True):
        # TODO validate inputs
        
        query_result = self.__prompt_collection.get(
            limit=top_n,
            where=filter,
            include=["documents","metadatas"],
        )
        # compile prompts
        if compile:
            for i, result in enumerate(query_result["documents"]):
                query_result["documents"][i] = self._compile_prompt(result)
        
        return query_result 


    def _compile_prompt(self, prompt:str):#TODO latest
        # search for prompt pieces in prompt
        matches = re.finditer(r"\{{(.*?)\}}", prompt)

        # loop throug all found prompt pieces
        for match in matches:
            prompt_piece_name = match.group(1)

            # get prompt piece
            query_result = self.__prompt_collection.get(
                ids=[prompt_piece_name]
            )
            prompt_piece = query_result["metadatas"][0]["prompt"]

            # replace prompt piece name with value
            prompt = prompt.replace("{{" + prompt_piece_name + "}}", prompt_piece)
            
        return prompt




