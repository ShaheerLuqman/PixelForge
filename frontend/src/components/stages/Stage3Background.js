import React, { useState } from 'react';
import { Typography, Button, Spin, message, Select } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const Stage3Background = ({
  processedImage,
  isLoading,
  selectedBackgroundIndex,
  setSelectedBackgroundIndex,
  setCurrentStage,
  handleStage3Next,
  setIsLoading,
  setProcessedImage,
  generatedImage,
  setGeneratedImage,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);

  const models = [
    { id: 1, name: 'IP2P' },
    { id: 2, name: 'QABG' }
  ];

  const handleGenerateBackground = async () => {
    if (!selectedModel) {
      message.error('Please select a model first');
      return;
    }

    try {
      setIsGenerating(true);
      setGenerationError('');
      setIsLoading(true);
      
      const formData = new FormData();
      
      // Convert base64 URL to blob
      const response = await fetch(processedImage);
      const blob = await response.blob();
      formData.append('image', blob, 'product-nonbg.png');

      // Call appropriate API based on selected model
      const apiEndpoint = selectedModel === 1 ? '/generate-bg-1' : '/generate-bg-2';
      const result = await axios.post(`http://127.0.0.1:5000${apiEndpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const generatedImageUrl = URL.createObjectURL(result.data);
      setGeneratedImage(generatedImageUrl);
      setSelectedBackgroundIndex(0);
    } catch (error) {
      console.error('Background generation error:', error);
      setGenerationError('Failed to generate background. Please try again.');
      message.error('Background generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!generatedImage) {
      message.error('Please generate a background image first');
      return;
    }
    setProcessedImage(generatedImage);
    handleStage3Next();
  };

  const selectStyles = {
    width: "100%",
    // Style for the select input
    '.ant-select-selector': {
      background: "#303030 !important",
      borderColor: "#424242 !important",
      color: "#fff !important",
    },
    // Style for the select dropdown
    '.ant-select-dropdown': {
      background: "#303030 !important",
      borderColor: "#424242 !important",
    },
    // Style for the dropdown options
    '.ant-select-item': {
      color: "#fff !important",
      '&:hover': {
        backgroundColor: "#424242 !important",
      },
    },
    // Style for the selected option
    '.ant-select-item-option-selected': {
      backgroundColor: "#19c37d !important",
      color: "#fff !important",
    },
  };

  if (!processedImage) {
    return (
      <div className="chat-message" style={{
        background: "#212121",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        maxWidth: "600px",
        margin: "120px auto 0",
        width: "100%",
      }}>
        <div style={{
          textAlign: "center",
          padding: "20px",
          background: "#303030",
          borderRadius: "8px",
          color: "#ff4d4f"
        }}>
          No processed image found. Please go back and try again.
        </div>
        <Button
          onClick={() => setCurrentStage(2)}
          style={{
            background: "#303030",
            border: "none",
            color: "#fff",
            marginTop: "16px"
          }}
        >
          Back to Previous Step
        </Button>
      </div>
    );
  }

  return (
    <div className="chat-message" style={{
      background: "#212121",
      borderRadius: "8px",
      padding: "24px",
      marginBottom: "24px",
      maxWidth: "600px",
      margin: "0px auto 0",
      width: "100%",
      color: "#fff",
    }}>
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        Generate Product Background
      </Title>

      {/* Original Product Image Section */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ color: "#fff", marginBottom: "16px" }}>Original Product</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={processedImage}
            alt="Original Product"
            style={{
              maxHeight: "300px",
              width: "auto",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      {/* Background Generation Section */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ color: "#fff", marginBottom: "16px" }}>Generate Background</h3>
        
        {/* Model Selection Dropdown */}
        <div style={{ marginBottom: "20px", marginTop: "24px" }}>
          <Select
            placeholder="Select a model"
            style={{
              ...selectStyles,
              marginBottom: "16px"
            }}
            onChange={(value) => setSelectedModel(value)}
            dropdownStyle={{ 
              background: "#303030",
              borderRadius: "4px",
            }}
            popupClassName="dark-theme-dropdown"
          >
            {models.map(model => (
              <Option 
                key={model.id} 
                value={model.id}
                style={{ 
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#424242",
                  },
                }}
              >
                {model.name}
              </Option>
            ))}
          </Select>

          <Button
            onClick={handleGenerateBackground}
            loading={isGenerating}
            disabled={!selectedModel || isGenerating}
            style={{
              background: "#303030",
              border: "none",
              color: "#fff",
              width: "100%",
              opacity: (!selectedModel || isGenerating) ? 0.5 : 1,
              marginTop: "8px"
            }}
          >
            Generate Background
          </Button>
        </div>

        {/* Error Message */}
        {generationError && (
          <div style={{
            color: "#ff4d4f",
            marginBottom: "16px",
            padding: "8px",
            background: "#303030",
            borderRadius: "4px"
          }}>
            {generationError}
          </div>
        )}

        {/* Generated Image Display */}
        {isGenerating ? (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "500px",
            background: "#303030",
            borderRadius: "8px"
          }}>
            <Spin size="large" />
          </div>
        ) : generatedImage && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center",
            background: "#303030",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <img
              src={generatedImage}
              alt="Generated Background"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => setCurrentStage(2)}
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
          onClick={handleNext}
          disabled={!generatedImage || isGenerating}
          style={{ 
            background: "#19c37d", 
            border: "none",
            opacity: (!generatedImage || isGenerating) ? 0.5 : 1
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Add this CSS to your global styles or component
const globalStyles = `
  .dark-theme-dropdown .ant-select-item {
    color: #fff !important;
    background: #303030 !important;
  }
  
  .dark-theme-dropdown .ant-select-item:hover {
    background: #424242 !important;
  }
  
  .dark-theme-dropdown .ant-select-item-option-selected {
    background: #19c37d !important;
  }
  
  .dark-theme-dropdown .ant-select-dropdown {
    background: #303030 !important;
    border: 1px solid #424242 !important;
  }
`;

export default Stage3Background; 