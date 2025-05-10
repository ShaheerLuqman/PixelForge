import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Stage1Upload from './stages/Stage1Upload';
import Stage2Review from './stages/Stage2Review';
import Stage3Background from './stages/Stage3Background';
import Stage4Marketing from './stages/Stage4Marketing';
import Stage5Final from './stages/Stage5Final';

const { Content } = Layout;

const Dashboard = ({
    currentStage,
    formData,
    handleInputChange,
    handleImageUpload,
    handleStage1Next,
    originalImage,
    nonBgImage,
    setCurrentStage,
    handleStage2Next,
    isLoading,
    selectedBackgroundIndex,
    setSelectedBackgroundIndex,
    handleStage3Next,
    setIsLoading,
    generatedBgImage,
    setGeneratedBgImage,
    currentSlogan,
    setCurrentSlogan,
    currentCaption,
    setCurrentCaption,
    handleStage4Next,
    setFinalImageUrl,
    finalImageUrl,
    rating,
    setRating,
    handleReset
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/login');
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar onLogout={handleLogout} />
            <Layout style={{ marginLeft: 250 }}>
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
                    {currentStage === 1 && (
                        <Stage1Upload
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleImageUpload={handleImageUpload}
                            handleStage1Next={handleStage1Next}
                        />
                    )}

                    {currentStage === 2 && (
                        <Stage2Review
                            formData={formData}
                            originalImage={originalImage}
                            nonBgImage={nonBgImage}
                            setCurrentStage={setCurrentStage}
                            handleStage2Next={handleStage2Next}
                        />
                    )}

                    {currentStage === 3 && (
                        <Stage3Background
                            generatedBgImage={generatedBgImage}
                            isLoading={isLoading}
                            selectedBackgroundIndex={selectedBackgroundIndex}
                            setSelectedBackgroundIndex={setSelectedBackgroundIndex}
                            setCurrentStage={setCurrentStage}
                            handleStage3Next={handleStage3Next}
                            setIsLoading={setIsLoading}
                            setGeneratedBgImage={setGeneratedBgImage}
                            nonBgImage={nonBgImage}
                            originalImage={originalImage}
                        />
                    )}

                    {currentStage === 4 && (
                        <Stage4Marketing
                            generatedBgImage={generatedBgImage}
                            isLoading={isLoading}
                            currentSlogan={currentSlogan}
                            setCurrentSlogan={setCurrentSlogan}
                            currentCaption={currentCaption}
                            setCurrentCaption={setCurrentCaption}
                            setCurrentStage={setCurrentStage}
                            handleStage4Next={handleStage4Next}
                            setIsLoading={setIsLoading}
                            formData={formData}
                            setFinalImageUrl={setFinalImageUrl}
                            setIsGenerating={() => {}}
                            setGenerationError={() => {}}
                        />
                    )}

                    {currentStage === 5 && (
                        <Stage5Final
                            finalImageUrl={finalImageUrl}
                            currentSlogan={currentSlogan}
                            currentCaption={currentCaption}
                            rating={rating}
                            setRating={setRating}
                            handleReset={handleReset}
                            setCurrentStage={setCurrentStage}
                        />
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard; 