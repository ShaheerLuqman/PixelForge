import React from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar onLogout={handleLogout} />
      <Layout style={{ marginLeft: 250 }}>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout; 