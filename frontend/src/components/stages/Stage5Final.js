import React, { useState } from "react";
import { Typography, Rate, message, Space, Button, Spin, Tooltip } from "antd";
import { DownloadOutlined, CopyOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Stage5Final = ({
  finalImageUrl,
  currentSlogan,
  currentCaption,
  rating,
  setRating,
  handleReset,
  setCurrentStage,
}) => {
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [imageRating, setImageRating] = useState(0);
  const [videoRating, setVideoRating] = useState(0);

  const handleGenerateVideo = () => {
    setVideoLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Use the Cloudinary URL
      setVideoUrl('https://res.cloudinary.com/drhafhnlg/video/upload/v1747245239/bcehu4tawrgmygyf35oh.mp4');
      setVideoLoading(false);
      message.success('Video generated successfully!');
    }, 120000); // 2 minutes loading simulation
  };

  const handleStartNewProject = () => {
    message.success('Post saved successfully!');
    handleReset();
  };

  const downloadImage = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = finalImageUrl;
    link.download = 'product-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Image downloading...');
  };

  const downloadVideo = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'product-video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Video downloading...');
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        message.success(`${type} copied to clipboard!`);
      })
      .catch(() => {
        message.error(`Failed to copy ${type.toLowerCase()}`);
      });
  };

  return (
    <div
      className="chat-message"
      style={{
        background: "#212121",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        maxWidth: "800px",
        margin: "70px auto 0",
        width: "100%",
        color: "#fff",
      }}
    >
      <Title level={2} style={{ color: "#fff", marginBottom: "24px", textAlign: "center" }}>
        Final Result
      </Title>

      {/* Final Image Display */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            background: "#303030",
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "16px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#fff", marginTop: 0, marginBottom: "20px" }}>Image Post</h3>
          
          {finalImageUrl ? (
            <>
              <img
                src={finalImageUrl}
                alt="Final Product"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", marginBottom: "8px", color: "#ccc" }}>Rate this image:</p>
                <Rate 
                  value={imageRating} 
                  onChange={setImageRating} 
                  style={{ fontSize: "24px", color: "#52c41a" }}
                  className="dark-stars"
                />
              </div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={downloadImage}
                style={{ 
                  marginTop: "16px", 
                  background: "#52c41a", 
                  borderColor: "#52c41a"
                }}
              >
                Download Image
              </Button>
            </>
          ) : (
            <p style={{ color: "#fff" }}>Creating final post...</p>
          )}
        </div>
      </div>

      {/* Video Display Section */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            background: "#303030",
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "16px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#fff", marginTop: 0, marginBottom: "20px" }}>Video Showcase</h3>
          
          {videoLoading ? (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <Spin size="large" style={{ color: "#52c41a" }} />
              <p style={{ color: "#ccc", marginTop: "16px" }}>Generating video, please wait...</p>
            </div>
          ) : videoUrl ? (
            <>
              <div style={{ 
                width: "100%", 
                maxWidth: "500px", 
                aspectRatio: "1/1",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <video 
                  controls 
                  src={videoUrl}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain"
                  }}
                />
              </div>
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", marginBottom: "8px", color: "#ccc" }}>Rate this video:</p>
                <Rate 
                  value={videoRating} 
                  onChange={setVideoRating} 
                  style={{ fontSize: "24px", color: "#52c41a" }}
                  className="dark-stars"
                />
              </div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={downloadVideo}
                style={{ 
                  marginTop: "16px", 
                  background: "#52c41a", 
                  borderColor: "#52c41a"
                }}
              >
                Download Video
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={handleGenerateVideo}
              size="large"
              style={{ 
                background: "#52c41a", 
                border: "none",
                height: "48px",
                borderRadius: "8px",
                marginTop: "16px"
              }}
            >
              Generate Video
            </Button>
          )}
        </div>
      </div>

      {/* Content Display */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            background: "#303030",
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>Slogan</h3>
            {currentSlogan && (
              <Button
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(currentSlogan, "Slogan")}
                style={{ background: "transparent", borderColor: "#52c41a", color: "#52c41a" }}
              >
                Copy
              </Button>
            )}
          </div>
          <p style={{ margin: 0, color: "#fff" }}>
            {currentSlogan || "No slogan generated"}
          </p>
        </div>

        <div
          style={{
            background: "#303030",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>Caption</h3>
            {currentCaption && (
              <Button
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(currentCaption, "Caption")}
                style={{ background: "transparent", borderColor: "#52c41a", color: "#52c41a" }}
              >
                Copy
              </Button>
            )}
          </div>
          <p style={{ margin: 0, color: "#fff" }}>
            {currentCaption || "No caption generated"}
          </p>
        </div>
      </div>

      {/* Overall Rating Section */}
      <div
        style={{
          marginBottom: "32px",
          textAlign: "center",
          background: "#303030",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ color: "#fff", marginBottom: "16px", marginTop: 0 }}>
          Overall Satisfaction
        </h3>
        <Rate
          value={rating}
          onChange={setRating}
          style={{ fontSize: "24px", color: "#52c41a" }}
          className="dark-stars"
        />

        {rating > 0 && (
          <div style={{ marginTop: "16px", color: "#fff" }}>
            <p style={{ margin: 0 }}>
              {rating >= 4
                ? "Thank you! We're glad you're satisfied with the result!"
                : "Thank you for your feedback. We'll keep improving our service."}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Button
          onClick={() => setCurrentStage(4)}
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
          onClick={handleStartNewProject}
          style={{ background: "#52c41a", border: "none" }}
        >
          Start New Project
        </Button>
      </Space>
    </div>
  );
};

export default Stage5Final;
