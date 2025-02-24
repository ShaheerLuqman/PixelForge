from flask import Flask, request, jsonify
from flask_cors import CORS
from logics import remove_bg, generate_bg_model_1, generate_bg_model_2, generate_slogan, generate_description
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, Flask!"

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

@app.route('/generate-bg-1', methods=['POST'])
def generate_bg_1_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get image and body data
    image = request.files['image'].read()
    body_data = request.form.to_dict()

    try:
        result = generate_bg_model_1(image, body_data)
        return result, 200, {'Content-Type': 'image/png'}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-bg-2', methods=['POST'])
def generate_bg_2_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get image and convert to PIL Image
    image_file = request.files['image'].read()
    image = Image.open(io.BytesIO(image_file))
    
    try:
        # Create temporary directory if it doesn't exist
        os.makedirs("temp", exist_ok=True)
        
        # Save the input image first
        input_path = "temp/product-nonbg.png"
        image.save(input_path)
        
        # Create temporary file path for output
        temp_output_path = "temp/generated_bg.png"
        
        # Generate background
        result_image, text_color = generate_bg_model_2(image, temp_output_path)
        
        # Convert result back to bytes
        img_byte_arr = io.BytesIO()
        result_image.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        return img_byte_arr, 200, {'Content-Type': 'image/png'}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-slogan', methods=['POST'])
def generate_slogan_route():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    try:
        data = request.get_json()
        image_path = data.get('imagePath')
        if not image_path:
            return jsonify({'error': 'Image path is required'}), 400
            
        result = generate_slogan(image_path)
        return jsonify({'slogan': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-description', methods=['POST'])
def generate_description_route():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    try:
        data = request.get_json()
        image_path = data.get('imagePath')
        product_name = data.get('productName')
        
        if not image_path or not product_name:
            return jsonify({'error': 'Image path and product name are required'}), 400
            
        result = generate_description(image_path, product_name)
        return jsonify({'description': result}), 200
    except Exception as e:
        print(f"Error in generate_description_route: {e}")
        return jsonify({'error': str(e)}), 500
    


