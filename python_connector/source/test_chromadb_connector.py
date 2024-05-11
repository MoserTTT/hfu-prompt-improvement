import unittest
import chromaDB_connector as cDB

class Test_chromaDB_connector(unittest.TestCase):
 
    valid_metadata_list = [
            {
                "name": "Create Documentation for Java/C#",
                "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
                "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
                "models": ["GPT3.5","GPT4"],
                "tags" : ["Create Documentation", "Update Documentation"],
                "languages" :["C#","Java"],
                "comments": ["The Output of this Prompt is not detailed enough","True!"]
            },
            {
                "name": "Prompt1"
            },
            {
                "name": "Go"
            },
            
        ]
    invalid_metadata_list =[
            {
                "name": ""
            },
            {
                "name": 5.039475
            },
            {
                "name": "  "
            },
            {
                "name": "\t\n\r\n"
            },
            {
                "name": "@#$%^&*()-_=+[]{};:',.<>?/|`~"
            },
            {
                "name": "Create Documentation for Java/C#",
                "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
                "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
                "models": [],
                "tags" : [],
                "languages" :[],
                "comments": []
            },
            {
                "name": "Create Documentation for Java/C#",
                "description": "My first 12346790756494ß59395ß93ß95ß59359935ßß35ß335ß393###****=$%&&/(1234567890!@#$%^&*()-_=+[]{};:',.<>?/|`~) Description.",
                "author": "Marius Longasslastnamewhatthehellsheeeeeeeeeeeeesh",
                "models": "",
                "tags" : "",
                "languages" :"",
                "comments": ""
            },
        ]
    
    @classmethod
    def setUpClass(cls):
        cls.db = cDB.chromaDB_connector("25978b3afbb74c359f29d3003915917f")

    @classmethod
    def tearDownClass(cls):
        #cls.db.__close ??? close db connection? or is the python service always running?
        
        
        #Clear the Collection of all entries? or simply delete Collection and make a new one
        pass
 
    # setUp runs before each test method.
    def setUp(self):
        pass

    # tearDown runs after each test method.
    def tearDown(self):
        pass
    
    def test_validate_metadata(self):
        """
        Tests the validate Method for a prompts metadata.
        
        ==================================
        
        Fields or single elements of lists cannot be longer than 50 Characters, except Description with 500 Characters.
        
        As of now Metadata includes fields:
        - name                  *required   
        - description
        - author
        - models                *list type
        - tags                  *list type
        - languages             *list type
        - comments              *list type
        
        """
        
        prompttext = "Count to {number}"
        for metadata in self.valid_metadata_list:
            try:
                self.db.create_prompt(prompt=prompttext,metadata=metadata)
            except ValueError as e:
                self.fail(f"An exception was raised: {e}")
        for metadata in self.invalid_metadata_list:
            with self.assertRaises(ValueError):
                self.db.create_prompt(metadata=metadata)
        
    
    def test_create_prompt(self):
        prompts_and_valid_metadata = [
            ("Create Documentation for every function call in this Class: {Code}",self.valid_metadata_list[0]),
        ]
        for prompt,metadata in prompts_and_valid_metadata:
            self.db.create_prompt(prompt=prompt,metadata=metadata)
            search_result = self.db.get_prompt_by_metadata(self.valid_metadata_list[0])
            pass
            #self.assertIn( , )
        
    def test_another_example(self):
        # Your test code goes here.
        self.assertEqual(1 + 1, 2)  # Another example assertion

if __name__ == '__main__':
    unittest.main()