import React, { useState } from 'react';
import { Typography, Input, Button, Upload, Form, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Stage1Upload = ({ formData, handleInputChange, handleImageUpload, handleStage1Next }) => {
  const [errors, setErrors] = useState({
    productName: '',
    productDescription: '',
    productImage: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      productName: '',
      productDescription: '',
      productImage: ''
    };

    // Product Name validation
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
      isValid = false;
    } else if (formData.productName.length < 3) {
      newErrors.productName = 'Product name must be at least 3 characters';
      isValid = false;
    }

    // Product Description validation
    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'Product description is required';
      isValid = false;
    } else if (formData.productDescription.length < 10) {
      newErrors.productDescription = 'Description must be at least 10 characters';
      isValid = false;
    }

    // Image validation
    if (!formData.productImage) {
      newErrors.productImage = 'Please upload a product image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      handleStage1Next();
    } else {
      message.error('Please fix the errors before proceeding');
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
      }}
    >
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        Upload Product Details
      </Title>
      <Form layout="vertical">
        <Form.Item
          label={<span style={{ color: "#fff" }}>Product Name</span>}
          required
          validateStatus={errors.productName ? "error" : ""}
          help={errors.productName && <span style={{ color: "#ff4d4f" }}>{errors.productName}</span>}
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
          label={<span style={{ color: "#fff" }}>Product Description</span>}
          required
          validateStatus={errors.productDescription ? "error" : ""}
          help={errors.productDescription && <span style={{ color: "#ff4d4f" }}>{errors.productDescription}</span>}
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
                icon={<UploadOutlined style={{ color: "#19c37d" }} />}
                style={{
                  background: "#303030",
                  border: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "4px 15px",
                  height: "32px"
                }}
              >
                Upload Image
              </Button>
            </Upload>
            {formData.productImage && (
              <Button
                icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
                onClick={() =>
                  handleInputChange({
                    target: { name: 'productImage', value: null }
                  })
                }
                style={{
                  background: "#303030",
                  border: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "4px 15px",
                  height: "32px"
                }}
              >
                Remove
              </Button>
            )}
          </div>
          {errors.productImage && (
            <div style={{ color: "#ff4d4f", marginTop: "8px" }}>
              {errors.productImage}
            </div>
          )}
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default Stage1Upload; 