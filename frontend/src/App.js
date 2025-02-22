import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Upload,
  message,
  Form,
  Spin,
} from "antd";

const { Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [formData, setFormData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
  });
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(1);
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(0);

  const handleImageUpload = (file) => {
    setFormData({ ...formData, productImage: file });
    return false; // Prevent automatic upload
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (
      !formData.productImage ||
      !formData.productName ||
      !formData.productDescription
    ) {
      message.error("Please fill in all fields and upload an image.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setProcessedImage(formData.productImage);
      setCurrentStage(currentStage + 1);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success("Product successfully submitted!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={260}
        style={{
          background: "#171717",
          padding: "14px",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        {/* Sidebar content will be added later */}
      </Sider>

      <Layout style={{ marginLeft: 260 }}>
        <Content
          style={{
            background: "#212121",
            padding: "0",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              width: "100%",
              padding: "24px",
              color: "#fff",
            }}
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 260,
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                background: "#212121",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                zIndex: 1000,
                width: "calc(100% - 260px)",
              }}
            >
              PixelForge
            </div>

            {currentStage === 1 && (
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
                }}
              >
                <Title
                  level={2}
                  style={{ color: "#fff", marginBottom: "24px" }}
                >
                  Upload Product Details
                </Title>
                <Form layout="vertical">
                  <Form.Item
                    label={<span style={{ color: "#fff" }}>Product Name</span>}
                    required
                  >
                    <Input
                      placeholder="Enter product name"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      style={{
                        background: "#303030",
                        border: "none",
                        color: "#fff",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ color: "#fff" }}>Product Description</span>
                    }
                    required
                  >
                    <div style={{ position: "relative" }}>
                      <Input.TextArea
                        placeholder="Enter product description"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        style={{
                          background: "#303030",
                          border: "none",
                          color: "#fff",
                          marginBottom: "10px",
                        }}
                        rows={4}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Upload
                        beforeUpload={handleImageUpload}
                        showUploadList={false}
                        accept="image/*"
                      >
                        <Button
                          icon={<i className="fas fa-file-upload" />}
                          style={{
                            background: "#303030",
                            border: "none",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          Upload Image
                        </Button>
                      </Upload>
                      {formData.productImage && (
                        <Button
                          icon={<i className="fas fa-times" />}
                          onClick={() =>
                            setFormData({ ...formData, productImage: null })
                          }
                          style={{
                            background: "#303030",
                            border: "none",
                            color: "#fff",
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {formData.productImage && (
                      <div style={{ marginTop: "10px" }}>
                        <img
                          src={URL.createObjectURL(formData.productImage)}
                          alt="Product"
                          style={{
                            maxHeight: "100px",
                            width: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    )}
                  </Form.Item>
                </Form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "24px",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={handleNext}
                    style={{ background: "#19c37d", border: "none" }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {currentStage === 2 && (
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
                <Title
                  level={2}
                  style={{ color: "#fff", marginBottom: "24px" }}
                >
                  Review Your Submission
                </Title>
                <div style={{ marginBottom: "24px" }}>
                  <p>
                    <strong>Product Name:</strong> {formData.productName}
                  </p>
                  <p>
                    <strong>Product Description:</strong>{" "}
                    {formData.productDescription}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "24px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(processedImage)}
                      alt="Processed Product"
                      style={{
                        maxHeight: "300px",
                        width: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    style={{ background: "#19c37d", border: "none" }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {currentStage === 3 && (
              <div
                className="chat-message"
                style={{
                  background: "#212121",
                  borderRadius: "8px",
                  padding: "24px",
                  marginBottom: "24px",
                  maxWidth: "600px",
                  margin: "0px auto 0",
                  width: "100%",
                  color: "#fff",
                }}
              >
                <Title
                  level={2}
                  style={{ color: "#fff", marginBottom: "24px" }}
                >
                  Generate Product Background
                </Title>

                {/* Original Product Image Section */}
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ color: "#fff", marginBottom: "16px" }}>
                    Original Product
                  </h3>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={URL.createObjectURL(processedImage)}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <h3 style={{ color: "#fff", margin: 0 }}>
                      Generated Background
                    </h3>
                    <Button
                      onClick={() => {
                        setIsLoading(true);
                        // TODO: Backend Connection - Generate new background
                        // API endpoint: POST /api/generate-background
                        // Request body: { productImage: processedImage }
                        // Response: { backgrounds: string[] (base64) }
                        setTimeout(() => {
                          setIsLoading(false);
                          // After getting new backgrounds, reset selection to first one
                          setSelectedBackgroundIndex(0);
                        }, 1500);
                      }}
                      style={{
                        background: "#303030",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      Generate New Background
                    </Button>
                  </div>

                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "40px",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                      }}
                    >
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedBackgroundIndex(index)}
                          style={{
                            background: "#303030",
                            borderRadius: "8px",
                            padding: "8px",
                            cursor: "pointer",
                            border:
                              index === selectedBackgroundIndex
                                ? "2px solid #19c37d"
                                : "2px solid transparent",
                            transition: "all 0.2s ease",
                            position: "relative",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(processedImage)} // Placeholder - replace with actual background image
                            alt={`Background ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                          {index === selectedBackgroundIndex && (
                            <div
                              style={{
                                position: "absolute",
                                top: "16px",
                                right: "16px",
                                background: "#19c37d",
                                borderRadius: "50%",
                                padding: "4px",
                                width: "24px",
                                height: "24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="fas fa-check"
                                style={{ color: "#fff" }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    onClick={() => {
                      // TODO: Backend Connection - Save final selection
                      // API endpoint: POST /api/save-product
                      // Request body: {
                      //   productName: formData.productName,
                      //   productDescription: formData.productDescription,
                      //   originalImage: processedImage,
                      //   selectedBackground: selectedBackgroundIndex
                      // }
                      handleSubmit();
                    }}
                    style={{ background: "#19c37d", border: "none" }}
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
