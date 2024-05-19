import chromaDB_connector
from flask import Flask, request, jsonify
import os

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
            filter = request.args.get("filter")
            top_n = request.args.get("top_n")
            compile = request.args.get("compile")
            if filter is None:
                return jsonify({"error":"Missing required Parameter"}), 400
            # Need to discuss the following lines until the try block. This looks like shit but it has to be done? -Tobi M
            if top_n is None:
                top_n = 1
            if compile is None:
                compile = True
            try:
                result =  self.db.get_prompt_by_metadata(filter, top_n, compile)
                return jsonify(result), 200
            except ValueError as error:
                return jsonify({"error": repr(error)}), 500
            except Exception as unexpected_error:
                unexpected_error = repr(unexpected_error)
                return jsonify({f"error":"Unexpected Error: {unexpected_error}"}), 500
            
        
        @self.app.route("/prompt_by_vector", methods=["GET"])
        def call_get_by_vector():
            query = request.args.get("query")
            filter = request.args.get("filter")
            top_n = request.args.get("top_n")
            compile = request.args.get("compile")
            if query is None:
                return jsonify({"error":"Missing required Parameter"}), 400
            # Need to discuss the following lines until the try block. This looks like shit but it has to be done? -Tobi M
            if top_n is None:
                top_n = 1
            if compile is None:
                compile = True
            if filter is None:
                filter = {}
            try:
                result = self.db.get_prompt_by_vector(query, filter, top_n, compile)
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
    backend_app.app.run(debug=True)