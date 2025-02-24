from flask import Flask
from flask_cors import CORS
from rembg import remove
from flask import request, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == "__main__":
    app.run(debug=True)



def remove_bg(image):
    return remove(image)
  


@app.route('/remove-bg', methods=['POST'])
def remove_bg_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image'].read()
    try:
        result = remove_bg(image)
        return result, 200, {'Content-Type': 'image/png'}
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


