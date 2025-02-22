import React, { useState } from 'react';
import { Layout, Typography, Input, Button, Upload, message, Form, Spin } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [formData, setFormData] = useState({
    productImage: null,
    productName: '',
    productDescription: '',
  });

  const handleImageUpload = (file) => {
    setFormData({ ...formData, productImage: file });
    return false; // Prevent automatic upload
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (!formData.productImage || !formData.productName || !formData.productDescription) {
      message.error('Please fill in all fields and upload an image.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setProcessedImage(formData.productImage);
      setCurrentStage(currentStage + 1);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <Header style={{ background: '#001529', color: '#fff' }}>
        <Title level={1} style={{ color: '#fff', margin: 0 }}>
          PixelForge
        </Title>
      </Header>
      <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
        {isLoading && currentStage === 1 ? (
          <Spin size="large" tip="Processing your image..." />
        ) : currentStage === 1 && (
          <div style={{ 
            background: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '50vw' 
          }}>
            <Form layout="vertical">
              <Title level={2}>Upload Product Details</Title>
              <Form.Item label="Product Image" required>
                <Dragger 
                  beforeUpload={handleImageUpload} 
                  showUploadList={false}
                  accept="image/*"
                >
                  <p className="ant-upload-drag-icon">
                    <i className="fas fa-upload" style={{ fontSize: '24px' }}></i>
                  </p>
                  <p className="ant-upload-text">Drag and drop a file here, or click to select a file</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  {formData.productImage && (
                    <img 
                      src={URL.createObjectURL(formData.productImage)} 
                      alt="Product" 
                      style={{ height: '50vh', width: 'auto', borderRadius: '8px', marginTop: '10px' }}
                    />
                  )}
                </Dragger>
              </Form.Item>
              <Form.Item label="Product Name" required>
                <Input
                  placeholder="Enter product name"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Product Description" required>
                <Input.TextArea
                  placeholder="Enter product description"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <Button type="default" onClick={() => setCurrentStage(1)}>Back</Button>
              <Button type="primary" onClick={handleNext}>Next</Button>
            </div>
          </div>
        )}
        {currentStage === 2 && (
          <div style={{ 
            background: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '50vw' 
          }}>
            <Title level={2}>Review Your Submission</Title>
            <p><strong>Product Name:</strong> {formData.productName}</p>
            <p><strong>Product Description:</strong> {formData.productDescription}</p>
            <p><strong>Product Image:</strong> {formData.productImage?.name}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={URL.createObjectURL(processedImage)} alt="Processed Product" style={{ height: '50vh', width: 'auto', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <Button type="default" onClick={() => setCurrentStage(1)}>Back</Button>
              <Button type="primary" onClick={handleNext}>Next</Button>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default App;
