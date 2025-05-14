import React, { useState, useEffect } from 'react';
import { Layout, Button, Avatar, List, Typography, message } from 'antd';
import { 
  LogoutOutlined, 
  UserOutlined, 
  HistoryOutlined,
  PictureOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const { Sider } = Layout;
const { Text } = Typography;

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

const Sidebar = ({ onLogout }) => {
  const { user } = useAuth();
  const [pastProducts, setPastProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPastProducts = async () => {
      if (!user?.id) return; // Don't fetch if no user ID available
      
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/get-product-showcase', {
          headers: { 'X-User-ID': user.id }
        });
        setPastProducts(response.data);
      } catch (error) {
        console.error('Error fetching past products:', error);
        message.error('Failed to load past products');
      } finally {
        setLoading(false);
      }
    };

    fetchPastProducts();
  }, [user?.id]); // Re-fetch when user ID changes

  return (
    <Sider
      width={250}
      style={{
        background: '#171717',
        height: '100vh',
        position: 'fixed',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #303030',
          flexShrink: 0,
        }}
      >
        <h1 style={{ color: '#fff', margin: 0, fontSize: '24px' }}>PixelForge</h1>
      </div>

      {/* Past Products Section - Scrollable */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0, // Important for Firefox
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px',
          color: '#fff',
          flexShrink: 0, // Prevent header from shrinking
        }}>
          <HistoryOutlined style={{ marginRight: '8px' }} />
          <Text strong style={{ color: '#fff', margin: 0 }}>Past Products</Text>
        </div>
        
        <List
          loading={loading}
          style={{
            overflow: 'auto',
            flex: 1,
          }}
          dataSource={pastProducts}
          renderItem={item => (
            <List.Item
              style={{
                padding: '8px',
                background: '#212121',
                borderRadius: '6px',
                marginBottom: '8px',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => {/* TODO: Handle click */}}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
                color: '#fff' 
              }}>
                <div style={{ 
                  marginRight: '12px',
                  width: '32px',
                  height: '32px',
                  background: '#303030',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.product_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  ) : (
                    <PictureOutlined style={{ color: '#52c41a' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px' }}>{item.product_name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {formatDate(item.created_at)}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* User info and logout section - Fixed at bottom */}
      <div
        style={{
          borderTop: '1px solid #303030',
          padding: '16px',
          background: '#212121',
          flexShrink: 0, // Prevent from shrinking
          marginTop: 'auto', // Push to bottom
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Avatar
            icon={<UserOutlined />}
            style={{ 
              background: '#52c41a',
              marginRight: '12px' 
            }}
          />
          <div style={{ color: '#fff' }}>
            <div style={{ fontWeight: 500 }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogout}
          style={{
            width: '100%',
            textAlign: 'left',
            color: '#ff4d4f',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar; 