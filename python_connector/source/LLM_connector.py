import os
from openai import AzureOpenAI
import requests
import json

# TODO
# seperater container?


class AzureOpenAIHandler:
    """
    Connects to the Azure deployment and provides LLM execution, LLM guided scoring, and LLM-based improvement.

    Args:
        api_key (str): API key for the Azure OpenAI embedding deployment.
        endpoint (str, optional): Base URL for the embedding API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
        api_version (str, optional): API version of the deployment, defaults to "2024-02-01".
        deployment_name (str, optional): Name of the embedding model to use. Defaults to "EvaluateAndExecutePrompts".
    """

    def __init__(self, api_key: str, endpoint: str = 'https://hfu-prompt-improvement.openai.azure.com/', api_version: str = "2024-02-01", deployment_name: str = "EvaluateAndExecutePrompts"):
        """
        Initializes the AzureOpenAIHandler class.

        Args:
            api_key (str): API key for the Azure OpenAI embedding deployment.
            endpoint (str, optional): Base URL for the embedding API. Defaults to "https://hfu-prompt-improvement.openai.azure.com/".
            api_version (str, optional): API version of the deployment, defaults to "2024-02-01".
            deployment_name (str, optional): Name of the embedding model to use. Defaults to "EvaluateAndExecutePrompts".
        """
        self.client = AzureOpenAI(
            api_key=api_key,
            api_version=api_version,
            azure_endpoint=endpoint
        )
        self.deployment_name = deployment_name
        self.prompt_by_metadata_url = "http://python-connector:5000/prompt_by_metadata"
        self.create_prompt_url = "http://python-connector:5000/set_prompt"
        self.eval_templates = {
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

    def __compile_prompt(self, template: str, **kwargs):
        """
        Compiles a prompt based on a template and provided variables.

        Args:
            template (str): The template of the prompt. Use {} to insert kwargs.
            **kwargs: The variables that can be inserted into the template.

        Returns:
            str: The compiled prompt.
        """
        return template.format(**kwargs)

    def __request_prompt(self, prompt_name_and_version: str):
        """
        Fetches a prompt based on its name and version.

        Args:
            prompt_name_and_version (str): The name and version of the prompt, e.g., "prompt1:2".

        Returns:
            response (requests.Response): The response object containing the prompt data.
        """
        prompt_name_and_id_split = prompt_name_and_version.split(":")

        # Make REST call to fetch prompt by metadata
        filter_param = {"$and": [{"name": prompt_name_and_id_split[0]}, {
            "version": int(prompt_name_and_id_split[1])}]}
        params = {"filter": json.dumps(filter_param)}
        response = requests.get(self.prompt_by_metadata_url, params=params)

        # Response handling
        if response.status_code == 200:
            print("Response:", response.json())
        else:
            print("Failed to get response. Status code:", response.status_code)
        return response

    def call_LLM(self, prompt: str, system_prompt: str = None, max_tokens: int = 250) -> str:
        """
        Calls the LLM to generate a response based on the provided prompt.

        Args:
            prompt (str): The user prompt to be sent to the LLM.
            system_prompt (str, optional): An optional system prompt for context.
            max_tokens (int, optional): The limit of output tokens. Defaults to 250.

        Returns:
            str: The LLM response.
        """
        messages = []

        # Set system prompt if available
        if system_prompt is not None:
            messages = [{"role": "system", "content": system_prompt}]

        # add user prompt
        messages.append({"role": "user", "content": prompt})

        # make request to LLM
        response = self.client.chat.completions.create(
            model=self.deployment_name,
            messages=messages,
            max_tokens=max_tokens
        )
        return response.choices[0].message.content

    def eval_prompt_by_LLM(self, prompt_name_and_id: str):
        """
        Evaluates a prompt by its name and version using the LLM.

        Args:
            prompt_name_and_id (str): The name and version of the prompt, e.g., "rest-prompt:1".

        Returns:
            dict: A dictionary containing the evaluation scores and the new prompt ID.
        """
        # Fetch prompt and metadata
        response = self.__request_prompt(prompt_name_and_id)
        prompt_to_eval = json.loads(response.text)["documents"][0]
        previous_metadata = json.loads(response.text)["metadatas"][0]

        # Loop through each scoring prompt and collect them in scores
        scores = [] # ["metric1","score1","advice1","metric2", ...]
        for metric in self.eval_templates:
            # Compile the eval prompt and run it
            compiled_prompt = self.__compile_prompt(
                template=self.eval_templates[metric], prompt=prompt_to_eval)
            response = self.call_LLM(prompt=compiled_prompt)

            # Check if syntax of the response is correct
            if "advice:" not in response:
                print(f"evaluation failed for {metric}!")
                continue

            # Add the results to scores
            response_split = response.split("advice:")
            scores.append(metric)   # metric name
            scores.append(response_split[0].strip())    # score
            scores.append(response_split[1].strip()[:249])  # advice

        # set the ratings in previous metadata
        previous_metadata["ratings"] = scores

        # Remove unnecessary/auto-generated metadata
        previous_metadata.pop("version")
        previous_metadata.pop("date_of_creation")

        # Create new version of prompt by making a REST request
        body = {
            "prompt": prompt_to_eval,
            "metadata": previous_metadata
        }
        response = requests.post(self.create_prompt_url, json=body)

        # Response handling
        if response.status_code == 200:
            print("Response:", response.json())
        else:
            print("Failed to get response. Status code:", response.status_code)
            print("Response:", response.text)

        # Return the new name and id and the scores
        prompt_name_and_id_split = prompt_name_and_id.split(":")
        return_dict = {
            scores[0]: [scores[1], scores[2]],
            "id": prompt_name_and_id_split[0] + ":" + str(int(prompt_name_and_id_split[1].strip())+1)
        }
        return return_dict

    def improve_prompt(self, prompt_name_and_id: str):
        """
        Improves a prompt by its name and version using the LLM and the provided ratings.

        Args:
            prompt_name_and_id (str): The name and version of the prompt, e.g., "rest-prompt:1".

        Returns:
            str: The improved prompt.
        """
        # Get the prompt and metadata
        response = self.__request_prompt(prompt_name_and_id)
        user_prompt = json.loads(response.text)["documents"][0]
        user_metadata = json.loads(response.text)["metadatas"][0]
        
        # Check if ratings exist 
        if "ratings" not in user_metadata:
            self.eval_prompt_by_LLM(prompt_name_and_id = prompt_name_and_id)
            
        # Compile the improvement Prompt with the ratings
        ratings = user_metadata["ratings"][2]
        improve_prompt = self.__compile_prompt(
            self.improve_template, prompt=user_prompt, scores=ratings)
        
        # Return LLM response
        improved_response = self.call_LLM(prompt=improve_prompt)
        return improved_response
