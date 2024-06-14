import os
from openai import AzureOpenAI
import requests
import json

# TODO
# - external prompt or even in the database
# immer neu abspeichern nach scoring?
# alle scorings in einer liste
# nicht doch in nem seperaten container

class AzureOpenAIHandler:
    def __init__(self, api_key: str, endpoint : str = 'https://hfu-prompt-improvement.openai.azure.com/', api_version:str="2024-02-01",deployment_name:str="EvaluateAndExecutePrompts"):
        self.client = AzureOpenAI(
            api_key=api_key,  
            api_version=api_version,
            azure_endpoint = endpoint
            )
        #self.db_client = chromaDB_connector.chromaDB_connector(embedding_api_key=api_key)
        self.deployment_name = deployment_name
        self.prompt_by_metadata_url = "http://127.0.0.1:5000/prompt_by_metadata"   #TODO change to chroma inside docker
        self.create_prompt_url = "http://127.0.0.1:5000/set_prompt"   #TODO change to chroma inside docker
        self.eval_templates={
                "structure": """
Your task is to evaluate the structure of a given prompt based on specific criteria. Please score the prompt on a scale from 0 to 5, where each score represents the following:

- **0:** The prompt is completely unclear, lacks coherence, and provides no useful guidance.
- **1:** The prompt is mostly unclear and confusing, with very little useful guidance.
- **2:** The prompt has significant issues with clarity and coherence, and provides minimal useful guidance.
- **3:** The prompt is somewhat clear and coherent but still has notable issues that affect its effectiveness.
- **4:** The prompt is clear and mostly coherent, with minor issues that slightly impact its effectiveness.
- **5:** The prompt is very clear, coherent, and provides precise and useful guidance without any issues.

---

**Example of Evaluation:**

Prompt to be evaluated: "Describe the main character in a novel, including their physical appearance, personality traits, and background. Make sure to include specific details and examples."

**Evaluation:**
score: 5
advice: This prompt is very clear and provides precise and useful guidance. It specifies what aspects of the main character to describe and encourages the inclusion of specific details and examples.

---

**Please follow the criteria above to evaluate the prompt provided.**
Prompt to be evaluated: {prompt}

**Evaluation:**
score: """
            }
        self.improve_template = """Please improve the following Prompt according to this advice and score, try to keep the key charectaristics of the original prompt. 
        Please do not further elaborate on what you did, simply give the improved prompt.
        Please make the Heading of your new prompt: "Improved Prompt".
        This is the Prompt which you should improve: {prompt}
        
        This is the Advice you should consider for the improvement: {scores}"""
        
    def __create_prompt(self, template, **kwargs):
        return template.format(**kwargs)
    
    def __request_prompt(self, prompt_name_and_id):
        prompt_name_and_id_split = prompt_name_and_id.split(":") 
        filter_param = {"$and": [{"name": prompt_name_and_id_split[0]}, {"version": int(prompt_name_and_id_split[1])}]}
        params = {"filter": json.dumps(filter_param)}
        response = requests.get(self.prompt_by_metadata_url, params=params)
        if response.status_code == 200:
            print("Response:", response.json())
        else:
            print("Failed to get response. Status code:", response.status_code)
        return response

    def call_LLM(self, prompt: str, system_prompt:str = None) -> str:
        messages = []
        if system_prompt is not None:
            messages = [{"role": "system", "content": system_prompt}]
            
        messages.append({"role": "user", "content": prompt})
        
        response = self.client.chat.completions.create(
            model=self.deployment_name,
            messages=messages,
            max_tokens=100
        )
        return response.choices[0].message.content
    
    def eval_prompt_by_LLM(self, prompt_name_and_id:str):
        response = self.__request_prompt(prompt_name_and_id)
        prompt_to_eval = json.loads(response.text)["documents"][0]
        previous_metadata = json.loads(response.text)["metadatas"][0]
        
        scores = []
        for metric in self.eval_templates:
            compiled_prompt = self.__create_prompt(template=self.eval_templates[metric], prompt=prompt_to_eval)
            response = self.call_LLM(prompt=compiled_prompt)
            
            if "advice:" not in response:
                print(f"evaluation failed for {metric}!")
                continue 
            
            response_split = response.split("advice:")
            scores.append(metric)
            scores.append(response_split[0].strip())
            scores.append(response_split[1].strip())
            
        previous_metadata["ratings"] = scores
        
        previous_metadata.pop("version")
        previous_metadata.pop("date_of_creation")
        
        body = {
            "prompt":prompt_to_eval,
            "metadata":previous_metadata  
        }
        
        response = requests.post(self.create_prompt_url, json=body)

        if response.status_code == 200:
            print("Response:", response.json())
        else:
            print("Failed to get response. Status code:", response.status_code)
            print("Response:", response.text)
        
        prompt_name_and_id_split = prompt_name_and_id.split(":")
        return_dict = {
            scores[0] : [scores[1],scores[2]],
            "id": prompt_name_and_id_split[0] + ":" + str(int(prompt_name_and_id_split[1].strip())+1)
        }
        return return_dict
    
    def improve_prompt(self, prompt_name_and_id:str):
        response = self.__request_prompt(prompt_name_and_id)
        user_prompt = json.loads(response.text)["documents"][0]
        user_metadata = json.loads(response.text)["metadatas"][0]
        if "ratings" not in user_metadata:
            raise ValueError("Prompt has no ratings")
        ratings = user_metadata["ratings"][2]
        improve_prompt = self.__create_prompt(self.improve_template,prompt=user_prompt, scores=ratings)
        improved_response = self.call_LLM(prompt=improve_prompt)       
        return improved_response
        

# Usage example:
if __name__ == "__main__":
    api_key = os.getenv('EF_API_KEY')

    handler = AzureOpenAIHandler(api_key)
    result = handler.eval_prompt_by_LLM("rest-prompt:1")
    print(result)
