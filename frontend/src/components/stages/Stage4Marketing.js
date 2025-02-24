import React from 'react';
import { Typography, Button, Input, Spin, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Stage4Marketing = ({
  isLoading,
  currentSlogan,
  setCurrentSlogan,
  currentCaption,
  setCurrentCaption,
  setCurrentStage,
  handleStage4Next,
  setIsLoading,
  formData
}) => {
  const generateSlogan = async () => {
    try {
      setIsLoading((prevState) => ({ ...prevState, slogan: true }));
      const response = await axios.post('http://127.0.0.1:5000/generate-slogan', {
        productName: formData.productName,
        productDescription: formData.productDescription
      });
      setCurrentSlogan(response.data.slogan);
    } catch (error) {
      message.error('Failed to generate slogan. Please try again.');
    } finally {
      setIsLoading((prevState) => ({ ...prevState, slogan: false }));
    }
  };

  const generateCaption = async () => {
    try {
      setIsLoading((prevState) => ({ ...prevState, caption: true }));
      const response = await axios.post('http://127.0.0.1:5000/generate-description', {
        productName: formData.productName,
        productDescription: formData.productDescription
      });
      setCurrentCaption(response.data.description);
    } catch (error) {
      message.error('Failed to generate caption. Please try again.');
    } finally {
      setIsLoading((prevState) => ({ ...prevState, caption: false }));
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
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Stage4Marketing; 