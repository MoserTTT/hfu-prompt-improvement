import unittest
import os
from unittest.mock import MagicMock

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
        cls.db = cDB.chromaDB_connector(os.getenv("EF_API_KEY"))

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
            {"name": "Prompt1", "author": "Toni"},
            {"name": "Prompt1", "author": "Toni"},
            {"name": "Prompt1", "author": "Toni"},
            {"name": "Prompt1", "author": "Toni"},
        ]
        for prompt, metadata in zip(prompttexts, metadatas):
            self.db.create_prompt(prompt=prompt, metadata=metadata)
        self.assertIn("Create Documentation for every function call in this Class: {Code}",
                      self.db.get_prompt_by_vector(
                          "Create Documentation", top_n=5)["documents"][0])
        self.assertIn("Hello, please write a Poem", self.db.get_prompt_by_vector(
            "Poem", top_n=5)["documents"][0])
        self.assertIn("Tell me a fun fact!", self.db.get_prompt_by_vector(
            "fun fact", top_n=5)["documents"][0])
        self.assertIn("Recommend simplification for this code snippet: {Code}", self.db.get_prompt_by_vector(
            "simplification", top_n=5)["documents"][0])

    """
    def test_find_new_version(self):
                
        self.db.clear_database()
        # Add some prompts with the same name but different versions
        metadata = {"name": "PromptVersionTesthello"}
        for i in range(1, 5):
            # Temporary adjustment to metadata to exclude additional keys
            adjusted_metadata = {"name": "PromptVersionTesthello"}
            self.db.create_prompt(prompt=f"Test prompt version {i}", metadata=adjusted_metadata)

        # Check if the next version is correctly determined
        new_version = self.db._chromaDB_connector__find_new_version(name="PromptVersionTesthello")
        self.assertEqual(new_version, 5)
    """

    def test_compile_prompt(self):
        """
        Tests the __compile_prompt method.
        """

        # Create a prompt with a specification
        prompt_text = "This is a test prompt with a specification: {{Prompt1:latest}}"
        metadata = {"name": "Prompt1"}
        actual_prompt = "This is the actual content of Prompt1"
        self.db.create_prompt(prompt=actual_prompt, metadata=metadata)

        # Compile the prompt and check if the specification is replaced with the actual prompt content
        compiled_prompt = self.db._chromaDB_connector__compile_prompt(prompt_text)
        expected_prompt = "This is a test prompt with a specification: This is the actual content of Prompt1"
        self.assertEqual(compiled_prompt, expected_prompt)

    def test_convert_metadata_strings_to_list(self):
        """
        Tests the __convert_metadata_strings_to_list method.
        """

        # Create a metadata dictionary with string values
        metadata = {
            "models": "GPT3.5\nGPT4",
            "tags": "tag1\ntag2",
            "languages": "Python\nJava"
        }

        # Convert the metadata strings to lists
        converted_metadata = self.db._chromaDB_connector__convert_metadata_strings_to_list(metadata)

        # Check if the metadata values are converted to lists
        self.assertIsInstance(converted_metadata["models"], list)
        self.assertIsInstance(converted_metadata["tags"], list)
        self.assertIsInstance(converted_metadata["languages"], list)

    def test_convert_metadata_lists_to_string(self):
        """
        Tests the __convert_metadata_lists_to_string method.
        """

        # Create a metadata dictionary with list values
        metadata = {
            "models": ["GPT3.5", "GPT4"],
            "tags": ["tag1", "tag2"],
            "languages": ["Python", "Java"]
        }

        # Convert the metadata lists to strings
        converted_metadata = self.db._chromaDB_connector__convert_metadata_lists_to_string(metadata)

        # Check if the metadata values are converted to strings
        self.assertIsInstance(converted_metadata["models"], str)
        self.assertIsInstance(converted_metadata["tags"], str)
        self.assertIsInstance(converted_metadata["languages"], str)

    def test_validate_list(self):
        """
        Tests the validate_list method.
        """

        # Create valid and invalid metadata dictionaries
        valid_metadata = {
            "name": "ValidTest",
            "models": ["GPT3.5", "GPT4"],
            "tags": ["tag1", "tag2"],
            "languages": ["Python", "Java"]
        }
        invalid_metadata = {
            "name": "InvalidTest",
            "models": "GPT3.5",
            "tags": "tag1",
            "languages": "Python"
        }

        # Validate the valid metadata dictionary (should not raise any exceptions)
        try:
            self.db._chromaDB_connector__validate_metadata(valid_metadata)
        except ValueError:
            self.fail("validate_list raised an unexpected ValueError for valid metadata.")

        # Validate the invalid metadata dictionary (should raise exceptions)
        with self.assertRaises(ValueError):
            self.db._chromaDB_connector__validate_metadata(invalid_metadata)

    def test_validate_field(self):
        """
        Tests the validate_field method.
        """

        # Test valid field values (should not raise any exceptions)
        valid_cases = [
            {"name": "ValidName", "description": "Valid description", "author": "ValidAuthor",
             "models": ["GPT3.5", "GPT4"], "tags": ["tag1", "tag2"], "languages": ["Python", "Java"]}
        ]
        for metadata in valid_cases:
            try:
                self.db._chromaDB_connector__validate_metadata(metadata)
            except ValueError as e:
                self.fail(f"validate_field raised an unexpected ValueError: {e}")

        # Test invalid field values (should raise exceptions)
        invalid_cases = [
            {"name": "", "description": "Valid description", "author": "ValidAuthor", "models": ["GPT3.5", "GPT4"],
             "tags": ["tag1", "tag2"], "languages": ["Python", "Java"]}
        ]
        for metadata in invalid_cases:
            with self.assertRaises(ValueError):
                self.db._chromaDB_connector__validate_metadata(metadata)

    def test_validate_metadata(self):
        """
        Tests the __validate_metadata method.
        """

        # Test valid metadata (should not raise any exceptions)
        valid_metadata = {
            "name": "ValidTest",
            "description": "Valid description",
            "author": "ValidAuthor",
            "models": ["GPT3.5", "GPT4"],
            "tags": ["tag1", "tag2"],
            "languages": ["Python", "Java"]
        }
        try:
            self.db._chromaDB_connector__validate_metadata(valid_metadata)
        except ValueError:
            self.fail("validate_metadata raised an unexpected ValueError for valid metadata.")

        # Test invalid metadata (should raise exceptions)
        invalid_metadata = {
            "name": "",
            "description": "Invalid description",
            "author": "InvalidAuthor",
            "models": "",
            "tags": "",
            "languages": ""
        }
        with self.assertRaises(ValueError):
            self.db._chromaDB_connector__validate_metadata(invalid_metadata)



if __name__ == '__main__':
    unittest.main()
