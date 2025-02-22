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
    input_path = 'input.png'
    output_path = 'output.png'
    with open(input_path, 'wb') as f:
        f.write(image)
    remove(input_path, output_path)
    with open(output_path, 'rb') as f:
        return f.read()
    


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
    


