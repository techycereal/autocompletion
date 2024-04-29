from flask import Flask, request, jsonify
from flask_cors import CORS
from typeahead import complete

app = Flask(__name__)

# Enable CORS for specific origin (http://localhost:5173)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/', methods=['POST', 'OPTIONS'])
def recieve_msg():
    """Handle POST requests for auto-completion and OPTIONS for CORS preflight.

    For POST requests, this function takes a JSON containing a 'msg' field,
    uses it to perform auto-completion, and returns the results.

    For OPTIONS requests, which are CORS preflight requests, this function
    sends the necessary CORS headers.

    Returns:
        A Flask Response object containing the auto-completion results in
        JSON format for POST requests, or an empty Flask Response object with
        CORS headers for OPTIONS requests.
    """
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = jsonify()
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    # Extract JSON data from the POST request
    r = request.get_json()

    # Call the complete function from your auto_complete module with the 'msg' data
    autocompletion = complete(r['msg'])

    # Return the autocompletion results as a JSON response
    return autocompletion


if __name__ == '__main__':
    app.run()
