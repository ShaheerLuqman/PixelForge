import React, { useState } from 'react';
import { Typography, Button, Input, Spin, message, notification } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Title } = Typography;

const Stage4Marketing = ({
  generatedBgImage,
  isLoading,
  currentSlogan,
  setCurrentSlogan,
  currentCaption,
  setCurrentCaption,
  setCurrentStage,
  handleStage4NextProp,
  setIsLoading,
  formData,
  setFinalImageUrl,
  setIsGenerating,
  setGenerationError
}) => {
  const [isGenerating, setIsGeneratingState] = useState(false);
  const [generationError, setGenerationErrorState] = useState('');

  const generateSlogan = async () => {
    console.log('Generating slogan...');
    try {
      setIsLoading((prevState) => ({ ...prevState, slogan: true }));
      console.log('Making API request to generate slogan...');
      const response = await axios.post('http://127.0.0.1:5000/generate-slogan', {
        imagePath: 'temp/product-nonbg.png'
      });
      console.log('Slogan response:', response.data);
      setCurrentSlogan(response.data.slogan);
    } catch (error) {
      console.error('Slogan generation error:', error);
      message.error('Failed to generate slogan. Please try again.');
    } finally {
      setIsLoading((prevState) => ({ ...prevState, slogan: false }));
    }
  };

  const generateCaption = async () => {
    console.log('Generating caption...');
    try {
      setIsLoading((prevState) => ({ ...prevState, caption: true }));
      console.log('Making API request to generate caption...');
      const response = await axios.post('http://127.0.0.1:5000/generate-description', {
        imagePath: 'temp/product-nonbg.png',
        productName: formData.productName
      });
      console.log('Caption response:', response.data);
      setCurrentCaption(response.data.description);
    } catch (error) {
      console.error('Caption generation error:', error);
      message.error('Failed to generate caption. Please try again.');
    } finally {
      setIsLoading((prevState) => ({ ...prevState, caption: false }));
    }
  };

  const handleStage4Next = async () => {
    console.log('handleStage4Next called'); // Debug log
    
    if (!generatedBgImage || !currentSlogan) {
      message.error("Image and slogan are required to create the final post.");
      console.log('Missing image or slogan'); // Debug log
      return;
    }
  
    try {
      setIsGeneratingState(true);
      setGenerationErrorState('');
      setIsLoading(true);
  
      console.log('Preparing to call API...'); // Debug log
  
      const formData = new FormData();
      const response = await fetch(generatedBgImage);
      const blob = await response.blob();
      formData.append("image", blob, "generated-image.png");
  
      // Prepare JSON data for the slogan
      const jsonData = {
        slogan: currentSlogan,
        textColor: "black", // or any color you prefer
      };
  
      // Append JSON data as a string
      formData.append("data", JSON.stringify(jsonData));
  
      console.log('Sending JSON data:', jsonData);
  
      // Send the request to the API
      const result = await axios.post("http://localhost:5000/create-final-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
  
      console.log('API response:', result);
  
      const imageUrl = URL.createObjectURL(result.data);
      
      // Set the final image URL
      setFinalImageUrl(imageUrl);
      
      message.success("Final post created successfully!");
      setCurrentStage(5);
    } catch (error) {
      console.error("Error creating final post:", error);
      setGenerationErrorState("Failed to create the final post. Please try again.");
      notification.error({
        message: "Error",
        description: "Failed to create the final post. Please try again.",
        style: {
          background: "#303030",
          borderRadius: "4px",
        },
      });
    } finally {
      setIsGeneratingState(false);
      setIsLoading(false);
    }
  };
  
  console.log('setFinalImageUrl:', setFinalImageUrl);

  return (
    <div
      className="chat-message"
      style={{
        background: "#212121",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        maxWidth: "600px",
        margin: "70px auto 0",
        width: "100%",
        color: "#fff",
      }}
    >
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        Generate Marketing Content
      </Title>

      {/* Slogan Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h3 style={{ color: "#fff", margin: 0 }}>Product Slogan</h3>
          <Button
            onClick={generateSlogan}
            style={{
              background: "#303030",
              border: "none",
              color: "#fff",
            }}
          >
            Generate New Slogan
          </Button>
        </div>
        <div style={{
          background: "#303030",
          padding: "16px",
          borderRadius: "8px",
          minHeight: "60px",
        }}>
          {isLoading?.slogan ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin size="small" />
            </div>
          ) : (
            <Input.TextArea
              value={currentSlogan}
              onChange={(e) => setCurrentSlogan(e.target.value)}
              placeholder="Your generated slogan will appear here"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                resize: "none",
              }}
              autoSize
            />
          )}
        </div>
      </div>

      {/* Caption Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h3 style={{ color: "#fff", margin: 0 }}>Social Media Caption</h3>
          <Button
            onClick={generateCaption}
            style={{
              background: "#303030",
              border: "none",
              color: "#fff",
            }}
          >
            Generate New Caption
          </Button>
        </div>
        <div style={{
          background: "#303030",
          padding: "16px",
          borderRadius: "8px",
          minHeight: "120px",
        }}>
          {isLoading?.caption ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin size="small" />
            </div>
          ) : (
            <Input.TextArea
              value={currentCaption}
              onChange={(e) => setCurrentCaption(e.target.value)}
              placeholder="Your generated caption will appear here"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                resize: "none",
              }}
              autoSize
              rows={4}
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => setCurrentStage(3)}
          style={{
            background: "#303030",
            border: "none",
            color: "#fff",
          }}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={handleStage4Next}
          style={{ background: "#19c37d", border: "none" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

Stage4Marketing.propTypes = {
  generatedBgImage: PropTypes.string.isRequired,
  isLoading: PropTypes.object.isRequired,
  currentSlogan: PropTypes.string.isRequired,
  setCurrentSlogan: PropTypes.func.isRequired,
  currentCaption: PropTypes.string.isRequired,
  setCurrentCaption: PropTypes.func.isRequired,
  setCurrentStage: PropTypes.func.isRequired,
  handleStage4NextProp: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFinalImageUrl: PropTypes.func.isRequired,
  setIsGenerating: PropTypes.func.isRequired,
  setGenerationError: PropTypes.func.isRequired
};

export default Stage4Marketing; 