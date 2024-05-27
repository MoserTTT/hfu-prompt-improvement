import chromaDB_connector
from flask import Flask, request, jsonify
import os
import ast

class main:
    
    def __init__(self):
        self.db = chromaDB_connector.chromaDB_connector(os.getenv("EF_API_KEY"))
        self.app = Flask(__name__)
        self.setup_routes()
    
    def setup_routes(self):
        @self.app.route("/")
        def home():
            return jsonify("Hello")
        
        @self.app.route("/set_prompt", methods=["POST"])
        def call_create_prompt():    
            prompt = request.args.get("prompt")
            metadata = request.args.get("metadata")
            metadata = ast.literal_eval(metadata)
            if prompt is None or metadata is None:
                return jsonify({"error":"Missing required Parameter"}), 400
            try:
                self.db.create_prompt(prompt, metadata)
                return jsonify({"message": "Prompt added successfully"}), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({f"error":"Unexpected Error: {unexpected_error}"}), 500
    
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
            if top_n is str:    # Otherwise None 
                top_n = ast.literal_eval(top_n)
                params["top_n"] = top_n
            if compile is str:
                compile = ast.literal_eval(compile)      
                params["compile"] = compile
            try:
                result =  self.db.get_prompt_by_metadata(**params)
                return jsonify(result), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({f"error":"Unexpected Error: {unexpected_error}"}), 500
            
        
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
            if filter is str:   # Otherwise None 
                filter = ast.literal_eval(filter)      
                params["filter"] = filter
            if top_n is str:    
                top_n = ast.literal_eval(top_n)
                params["top_n"] = top_n
            if compile is str:
                compile = ast.literal_eval(compile)      
                params["compile"] = compile
            try:
                result = self.db.get_prompt_by_vector(**params)
                return jsonify(result), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({f"error":"Unexpected Error: {unexpected_error}"}), 500

# The Flask App ("app") must be exposed at Module level
backend_app = main()            
app = backend_app.app

if __name__ == "__main__":
    backend_app.app.run(debug=True, use_reloader=False)