import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Rate, Card, Image, Row, Col, Divider, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProductShowcase = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductShowcase = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/product-showcase/${id}`, {
          headers: { 'X-User-ID': user.id }
        });
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product showcase:', error);
        message.error('Failed to load product showcase data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductShowcase();
  }, [id, user?.id]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <Content
      style={{
        background: "#212121",
        padding: "24px",
        paddingBottom: "200px",
        overflow: "initial",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" style={{ color: "#52c41a" }} />
        </div>
      ) : productData ? (
        <div style={{ paddingBottom: '300px' }}>
          <Title level={1} style={{ color: '#fff', marginBottom: '30px', fontSize: '32px' }}>
            {productData.post.product_name}
          </Title>
          
          <Card 
            style={{ 
              background: '#262626', 
              marginBottom: '30px',
              borderRadius: '8px',
              border: 'none'
            }}
          >
            <Row gutter={[30, 30]}>
              <Col xs={24} md={12}>
                <Title level={3} style={{ color: '#fff', fontSize: '24px' }}>Final Image</Title>
                <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image 
                    src={productData.post.final_image} 
                    alt="Final Product Image"
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }} 
                  />
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <Title level={3} style={{ color: '#fff', fontSize: '24px' }}>Product Details</Title>
                <div style={{ color: '#ccc', fontSize: '18px' }}>
                  <p><strong>Product Name:</strong> {productData.post.product_name}</p>
                  <p><strong>Description:</strong> {productData.post.product_description}</p>
                  <p><strong>Slogan:</strong> {productData.post.product_slogan}</p>
                  <p><strong>Caption:</strong> {productData.post.caption_generated}</p>
                  <p><strong>Model Type:</strong> {productData.post.model_type}</p>
                  <p><strong>Created:</strong> {formatDate(productData.created_at)}</p>
                  <p>
                    <strong>Post Rating:</strong>
                    <div style={{ marginTop: '8px' }}>
                      <Rate disabled value={productData.post.post_rating} style={{ fontSize: '24px' }} />
                    </div>
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
          
          <Card 
            style={{ 
              background: '#262626', 
              marginBottom: '30px',
              borderRadius: '8px', 
              border: 'none'
            }}
          >
            <Title level={3} style={{ color: '#fff', fontSize: '24px' }}>Video Preview</Title>
            <Row gutter={[30, 30]}>
              <Col xs={24} md={12}>
                <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <video 
                    controls 
                    src={productData.video.videoUrl}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      borderRadius: '8px',
                      background: '#000',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div style={{ color: '#ccc', fontSize: '18px' }}>
                  <p><strong>Video Prompt:</strong> {productData.video.videoPrompt}</p>
                  <p><strong>Duration:</strong> {Math.round(productData.video.metadata.duration)} seconds</p>
                  <p><strong>Resolution:</strong> {productData.video.metadata.resolution}</p>
                  <p><strong>Video Rating:</strong></p>
                  <Rate disabled value={productData.video.video_rating} style={{ fontSize: '24px' }} />
                </div>
              </Col>
            </Row>
          </Card>
          
          <Card 
            style={{ 
              background: '#262626',
              borderRadius: '8px',
              border: 'none',
              marginBottom: '200px'
            }}
          >
            <Title level={3} style={{ color: '#fff', fontSize: '24px', marginBottom: '30px' }}>Image Sources</Title>
            <Row gutter={[30, 30]} style={{ minHeight: '60vh' }}>
              <Col xs={24} sm={12} md={8} style={{ height: '100%', marginBottom: '80px' }}>
                <Title level={4} style={{ color: '#fff', fontSize: '20px' }}>Original Image</Title>
                <div style={{ 
                  height: 'calc(60vh - 60px)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden',
                  marginBottom: '40px'
                }}>
                  <Image 
                    src={productData.post.product_org} 
                    alt="Original Product"
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }}
                    preview={{ 
                      mask: 'Click to view larger'
                    }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} style={{ height: '100%', marginBottom: '80px' }}>
                <Title level={4} style={{ color: '#fff', fontSize: '20px' }}>Without Background</Title>
                <div style={{ 
                  height: 'calc(60vh - 60px)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden',
                  marginBottom: '40px'
                }}>
                  <Image 
                    src={productData.post.product_nonbg} 
                    alt="Product without background"
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }}
                    preview={{ 
                      mask: 'Click to view larger'
                    }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} style={{ height: '100%', marginBottom: '80px' }}>
                <Title level={4} style={{ color: '#fff', fontSize: '20px' }}>Background</Title>
                <div style={{ 
                  height: 'calc(60vh - 60px)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden',
                  marginBottom: '40px'
                }}>
                  <Image 
                    src={productData.post.background} 
                    alt="Background Image"
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }}
                    preview={{ 
                      mask: 'Click to view larger'
                    }}
                  />
                </div>
              </Col>
            </Row>
            <div style={{ height: '100px' }}></div>
          </Card>
          <div style={{ height: '300px' }}></div>
        </div>
      ) : (
        <div style={{ color: '#fff', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#fff', fontSize: '28px' }}>No product data found</Title>
          <Text style={{ color: '#ccc', fontSize: '18px' }}>The requested product showcase could not be found.</Text>
        </div>
      )}
    </Content>
  );
};

export default ProductShowcase; 