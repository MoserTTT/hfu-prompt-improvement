from . import chromaDB_connector
from . import LLM_connector
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import ast

class main:
    
    def __init__(self):
        self.db  = chromaDB_connector.chromaDB_connector(embedding_api_key=os.getenv("EF_API_KEY"))
        self.llm = LLM_connector.AzureOpenAIHandler(api_key=os.getenv("EF_API_KEY"))
        self.app = Flask(__name__)
        self.setup_routes()
        CORS(self.app)  # This will enable CORS for all routes
    
    def setup_routes(self):
        @self.app.route("/")
        def home():
            return jsonify("Hello")
        
        @self.app.route("/set_prompt", methods=["POST"])
        def call_create_prompt():    
            data = request.get_json()
            if not data or "prompt" not in data or "metadata" not in data:
                return jsonify({"error":"Missing required Parameter"}), 400
            prompt = data["prompt"]
            metadata = data["metadata"]
            try:
                self.db.create_prompt(prompt, metadata)
                return jsonify({"message": "Prompt added successfully"}), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
    
        @self.app.route("/prompt_by_metadata", methods=["GET"])
        def call_get_by_metadata():
            params = {}
            filter = request.args.get("filter")
            top_n = request.args.get("top_n")
            compile = request.args.get("compile")
            if filter is None:
                return jsonify({"error":"Missing required Parameter"}), 400
            filter = ast.literal_eval(filter)
            params["filter"] = filter           
            if type(top_n) is str:    # Otherwise None 
                top_n = ast.literal_eval(top_n)
                params["top_n"] = top_n
            if type(compile) is str:
                compile = ast.literal_eval(compile)      
                params["compile"] = compile
            try:
                result =  self.db.get_prompt_by_metadata(**params)
                return jsonify(result), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
            
        
        @self.app.route("/prompt_by_vector", methods=["GET"])
        def call_get_by_vector():
            params = {}
            query = request.args.get("query")
            filter = request.args.get("filter")
            top_n = request.args.get("top_n")
            compile = request.args.get("compile")
            if query is None:
                return jsonify({"error":"Missing required Parameter"}), 400
            params["query"] = query
            if type(filter) is str:   # Otherwise None 
                filter = ast.literal_eval(filter)      
                params["filter"] = filter
            if type(top_n) is str:    
                top_n = ast.literal_eval(top_n)
                params["top_n"] = top_n
            if type(compile) is str:
                compile = ast.literal_eval(compile)      
                params["compile"] = compile
            try:
                result = self.db.get_prompt_by_vector(**params)
                return jsonify(result), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
        
        @self.app.route("/call_llm", methods=["POST"])
        def call_llm():
            data = request.get_json()
            if not data or "prompt" not in data:
                return jsonify({"error":"Missing required Parameter"}), 400
            prompt = data["prompt"]
            try:
                prompt_response = self.llm.call_LLM(prompt=prompt)
                return jsonify(prompt_response), 200
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
        
        @self.app.route("/prompt_eval", methods=["GET"])    
        def call_eval_prompt_by_LLM():
            data = request.get_json()
            if not data or "prompt_name_and_id" not in data:
                return jsonify({"error":"Missing required Parameter"}), 400
            prompt_name_and_id = data["prompt_name_and_id"]
            try:
                scores = self.llm.eval_prompt_by_LLM(prompt_name_and_id)
                return jsonify(scores), 200   
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
        
        @self.app.route("/prompt_improve", methods=["GET"])    
        def call_improve_prompt():
            data = request.get_json()
            if not data or "prompt_name_and_id" not in data:
                return jsonify({"error":"Missing required Parameter"}), 400
            prompt_name_and_id = data["prompt_name_and_id"]
            try:
                improved_prompt= self.llm.improve_prompt(prompt_name_and_id)
                return jsonify(improved_prompt), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({"error":f"Unexpected Error: {unexpected_error}"}), 500
                
            

# The Flask App ("app") must be exposed at Module level
backend_app = main()            
app = backend_app.app

if __name__ == "__main__":
    backend_app.app.run(debug=True, use_reloader=False, host="0.0.0.0", port=5000)