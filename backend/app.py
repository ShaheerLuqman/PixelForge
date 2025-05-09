from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User
from config import Config
from flask_migrate import Migrate
import os
from datetime import timedelta
# from logics import remove_bg, generate_bg_model_1, generate_bg_model_2, generate_slogan, generate_description     # Uncomment
# from finalPost import add_slogan_to_image                                                                         # Uncomment
from PIL import Image
import io
import json

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app)
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Create database tables
with app.app_context():
    db.create_all()

# Authentication routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(email=data['email'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'access_token': access_token,
        'user': user.to_dict()
    }), 200

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        # Get current user
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({'error': 'Invalid token'}), 401

        # Since we're using JWT, we don't need to do anything server-side
        # The client will remove the token
        return jsonify({'message': 'Successfully logged out'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/remove-bg', methods=['POST'])
def remove_bg_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image'].read()
    try:
        # result = remove_bg(image)
        img = Image.open('sample/product-og.png')   # Temporary
        result = io.BytesIO()                       # Temporary
        img.save(result, format='PNG')              # Temporary
        result = result.getvalue()                  # Temporary
        return result, 200, {'Content-Type': 'image/png'}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-bg-1', methods=['POST'])
def generate_bg_1_route():
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
        
        # Generate background
        # result_image, text_color = generate_bg_model_1(image, input_path)
        result_image, text_color = Image.open('sample/bg.png'), 'black'     # Temporary
        
        # Convert result back to bytes
        img_byte_arr = io.BytesIO()
        result_image.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        return img_byte_arr, 200, {'Content-Type': 'image/png'}
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
        # result_image, text_color = generate_bg_model_2(image, temp_output_path)
        result_image, text_color = Image.open('sample/bg.png'), 'black'
        
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
            
        # result = generate_slogan(image_path)
        result = 'This is a sample slogan'
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
            
        # result = generate_description(image_path, product_name)
        result = 'This is a sample description' 
        return jsonify({'description': result}), 200
    except Exception as e:
        print(f"Error in generate_description_route: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/create-final-post', methods=['POST'])
def create_final_post_route():
    print("Received POST body:")
    print(request.form)  # Log the entire form data

    if 'image' not in request.files:
        return jsonify({'error': 'Image and JSON data are required'}), 400

    '''     # Temporary
    # Get image and convert to PIL Image
    try:
        image_file = request.files['image'].read()
        image = Image.open(io.BytesIO(image_file))
    except Exception as e:
        print(f"Error loading image: {e}")
        return jsonify({'error': 'Failed to load image'}), 500

    # Get JSON data
    try:
        data = json.loads(request.form['data'])  # Load JSON data from form
        slogan = data.get('slogan')
        text_color = data.get('textColor', 'black')  # Default to black if not provided
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({'error': 'Invalid JSON data'}), 400
    except Exception as e:
        print(f"Error processing JSON data: {e}")
        return jsonify({'error': 'Failed to process JSON data'}), 500

    if not slogan:
        print("Slogan is missing from the data.")
        return jsonify({'error': 'Slogan is required'}), 400
    '''     # Temporary

    try:
        # Create temporary directory if it doesn't exist
        os.makedirs("temp", exist_ok=True)
        
        '''     # Temporary
        # Save the input image first
        input_path = "temp/generated_bg.png"
        image.save(input_path)
        
        # Create temporary file path for output
        temp_output_path = "temp/final_image.png"

        # Process image by adding slogan
        processed_image = add_slogan_to_image(image, slogan, text_color)

        # Check if processed_image is None
        if processed_image is None:
            print("Error: add_slogan_to_image returned None.")
            return jsonify({'error': 'Failed to process image with slogan.'}), 500
        
        # Save final image
        processed_image.save(temp_output_path)
        '''     # Temporary
        
        processed_image = Image.open('sample/final_image.png')      # Temporary
        # Convert result back to bytes
        img_byte_arr = io.BytesIO()
        processed_image.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()

        return img_byte_arr, 200, {'Content-Type': 'image/png'}
    except Exception as e:
        print(f"Error processing final image: {e}")
        return jsonify({'error': str(e)}), 500


