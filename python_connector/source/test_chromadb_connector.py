import unittest
import os
import chromaDB_connector as cDB


class Test_chromaDB_connector(unittest.TestCase):

    valid_metadata_list = [
        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": ["GPT3.5", "GPT4"],
            "tags": ["Create Documentation", "Update Documentation"],
            "languages": ["C Sharp", "Java"],
            "comments": ["The Output of this Prompt is not detailed enough", "True!"]
        },
        {
            "name": "Prompt1"
        },
        {
            "name": "Go"
        },
        {
            "name": "  "
        },
        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": [],
            "tags": [],
            "languages": [],
            "comments": []
        },
    ]
    invalid_metadata_list = [
        {
            "name": "@#$%^&*()-_=+[]{};:',.<>?/|`~"
        },
        {
            "name": ""
        },
        {
            "name": 5.039475
        },
        {
            "name": "\t\n\r\n"
        },

        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": "",
            "tags": "",
            "languages": "",
            "comments": ""
        },
        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": {},
            "tags": {},
            "languages": {},
            "comments": {}
        },
        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": (),
            "tags": (),
            "languages": (),
            "comments": ()
        },
        {
            "name": "Create Documentation for Java or C Sharp",
            "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
            "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
            "models": ["\t", "\r\n"],
            "tags": ["\t\t", "\r\n\n"],
            "languages": [],
            "comments": []
        },

    ]

    @classmethod
    def setUpClass(cls):
        cls.db = cDB.chromaDB_connector("25978b3afbb74c359f29d3003915917f")

    @classmethod
    def tearDownClass(cls):
        pass

    # setUp runs before each test method.
    def setUp(self):
        pass

    # tearDown runs after each test method.
    def tearDown(self):
        pass

    def test_create_prompt_and_get_by_metadata(self):
        """
        Tests the create Method for prompts as well as metadata search by
        comparing search results with inserts. 

        """
        prompttext = "Count to {number}"
        for metadata in self.valid_metadata_list:
            try:
                self.db.create_prompt(prompt=prompttext, metadata=metadata)
            except ValueError as e:
                # There should be no Exceptions raised here
                self.fail(f"An exception was raised: {e}")
            search = self.db.get_prompt_by_metadata(
                filter={"version": metadata["version"]})
            # Checks if the searched prompt is returned
            self.assertEqual(search["metadatas"][0]
                             ["version"], metadata["version"])
        for metadata in self.invalid_metadata_list:
            with self.assertRaises(ValueError):
                self.db.create_prompt(prompttext, metadata=metadata)
                # There SHOULD be Exceptions raised here

    def test_get_prompt_by_vector(self):
        """
        Tests the vector search function 

        """
        prompttexts = [
            "Create Documentation for every function call in this Class: {Code}",
            "Hello, please write a Poem",
            "Tell me a fun fact!",
            "Recommend simplification for this code snippet: {Code}"
        ]
        metadatas = [
            {"name": "Prompt1","author": "Toni"},
            {"name": "Prompt1","author": "Toni"},
            {"name": "Prompt1","author": "Toni"},
            {"name": "Prompt1","author": "Toni"},
        ]
        for prompt,metadata in zip(prompttexts,metadatas):
            self.db.create_prompt(prompt=prompt, metadata=metadata)
        self.assertIn("Create Documentation for every function call in this Class: {Code}", self.db.get_prompt_by_vector(
            "Create Documentation",top_n=5)["documents"][0])
        self.assertIn("Hello, please write a Poem", self.db.get_prompt_by_vector(
            "Poem",top_n=5)["documents"][0])
        self.assertIn("Tell me a fun fact!", self.db.get_prompt_by_vector(
            "fun fact",top_n=5)["documents"][0])
        self.assertIn("Recommend simplification for this code snippet: {Code}", self.db.get_prompt_by_vector(
            "simplification",top_n=5)["documents"][0])

if __name__ == '__main__':
    unittest.main()
