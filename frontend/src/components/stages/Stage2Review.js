import React, { useState } from 'react';
import { Typography, Button, message } from 'antd';

const { Title } = Typography;

const Stage2Review = ({ formData, processedImage, setCurrentStage, handleStage2Next }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = async () => {
    try {
      setIsProcessing(true);
      if (!processedImage) {
        message.error('Image processing failed. Please try again.');
        return;
      }
      await handleStage2Next();
    } catch (error) {
      message.error('Failed to process image. Please try again.');
      setCurrentStage(1);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="chat-message"
      style={{
        background: "#212121",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        maxWidth: "600px",
        margin: "120px auto 0",
        width: "100%",
        color: "#fff",
      }}
    >
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        Review Your Submission
      </Title>
      <div style={{ marginBottom: "24px" }}>
        <p>
          <strong>Product Name:</strong> {formData.productName}
        </p>
        <p>
          <strong>Product Description:</strong> {formData.productDescription}
        </p>
        {processedImage ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <img
              src={processedImage}
              alt="Processed Product"
              style={{
                maxHeight: "300px",
                width: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "20px", 
            background: "#303030",
            borderRadius: "8px",
            color: "#ff4d4f" 
          }}>
            Failed to load processed image. Please go back and try again.
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => setCurrentStage(1)}
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
          loading={isProcessing}
          disabled={!processedImage || isProcessing}
          style={{ 
            background: "#19c37d", 
            border: "none",
            opacity: (!processedImage || isProcessing) ? 0.5 : 1 
          }}
        >
          {isProcessing ? 'Processing...' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Stage2Review; 