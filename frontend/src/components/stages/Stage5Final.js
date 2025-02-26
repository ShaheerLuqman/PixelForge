import React from "react";
import { Typography, Rate, message, Space, Button } from "antd";

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
        Final Result
      </Title>

      {/* Final Image Display */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt="Final Product"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        ) : (
          <p style={{ color: "#fff" }}>Creating final post...</p>
        )}
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
          <h3 style={{ color: "#fff", marginTop: 0 }}>Slogan</h3>
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
          <h3 style={{ color: "#fff", marginTop: 0 }}>Caption</h3>
          <p style={{ margin: 0, color: "#fff" }}>
            {currentCaption || "No caption generated"}
          </p>
        </div>
      </div>

      {/* Rating Section */}
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
          How satisfied are you with the result?
        </h3>
        <Rate
          value={rating}
          onChange={setRating}
          style={{ fontSize: "24px", color: "#19c37d" }}
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
          onClick={handleReset}
          style={{ background: "#19c37d", border: "none" }}
        >
          Start New Project
        </Button>
      </Space>
    </div>
  );
};

export default Stage5Final;
