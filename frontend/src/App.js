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
  Rate,
} from "antd";
import axios from "axios";
import Header from "./components/Header";
import Stage1Upload from "./components/stages/Stage1Upload";
import Stage2Review from "./components/stages/Stage2Review";
import Stage3Background from "./components/stages/Stage3Background";
import Stage4Marketing from "./components/stages/Stage4Marketing";
import Stage5Final from "./components/stages/Stage5Final";

const { Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState({
    main: false,
    slogan: false,
    caption: false,
  });
  const [processedImage, setProcessedImage] = useState(null);
  const [formData, setFormData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
  });
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(1);
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(0);
  const [currentSlogan, setCurrentSlogan] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [finalImage, setFinalImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [nonBgImage, setNonBgImage] = useState(null);
  const [generatedBgImage, setGeneratedBgImage] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);

  const handleReset = () => {
    setCurrentStage(1);
    setIsLoading({
      main: false,
      slogan: false,
      caption: false,
    });
    setFormData({
      productImage: null,
      productName: "",
      productDescription: "",
    });
    setSelectedBackgroundId(1);
    setSelectedBackgroundIndex(0);
    setCurrentSlogan("");
    setCurrentCaption("");
    setRating(0);
    setOriginalImage(null);
    setNonBgImage(null);
    setGeneratedBgImage(null);
  };

  const handleImageUpload = (file) => {
    setFormData({ ...formData, productImage: file });
    return false; // Prevent automatic upload
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Stage 1: Initial form submission
  const handleStage1Next = () => {
    if (!formData.productImage || !formData.productName || !formData.productDescription) {
      message.error("Please fill in all fields and upload an image.");
      return;
    }

    // Store original image and move to next stage
    const originalImageUrl = URL.createObjectURL(formData.productImage);
    setOriginalImage(originalImageUrl);
    setProcessedImage(originalImageUrl); // Use original image for now
    setCurrentStage(2);
  };

  // Stage 2: Review submission
  const handleStage2Next = async () => {
    try {
      setIsLoading(prevState => ({ ...prevState, main: true }));
      
      // Process image for background removal
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.productImage);
      
      const response = await axios.post('http://127.0.0.1:5000/remove-bg', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const nonBgImageUrl = URL.createObjectURL(response.data);
      setNonBgImage(nonBgImageUrl); // Store non-bg image
      setProcessedImage(nonBgImageUrl); // Update processed image
      
      setCurrentStage(3);
    } catch (error) {
      console.error('Error removing background:', error);
      message.error('Failed to remove background. Please try again.');
    } finally {
      setIsLoading(prevState => ({ ...prevState, main: false }));
    }
  };

  // Stage 3: Background selection
  const handleStage3Next = () => {
    if (!generatedBgImage) {
      message.error("Please generate a background first");
      return;
    }
    setCurrentStage(4);
  };

  // Stage 4: Marketing content
  const handleStage4Next = () => {
    if (!currentSlogan || !currentCaption) {
      message.error('Please generate both slogan and caption before proceeding.');
      return;
    }
    setCurrentStage(5);
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
      {/* Commenting out Sider
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
        {/* Sidebar content will be added later
      </Sider>
      */}

      <Layout style={{ marginLeft: 0 }}>
        {" "}
        {/* Updated marginLeft from 260 to 0 */}
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
          <Header />

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
              originalImage={originalImage}
              nonBgImage={nonBgImage}
              isLoading={isLoading}
              selectedBackgroundIndex={selectedBackgroundIndex}
              setSelectedBackgroundIndex={setSelectedBackgroundIndex}
              setCurrentStage={setCurrentStage}
              handleStage3Next={handleStage3Next}
              setIsLoading={setIsLoading}
              generatedBgImage={generatedBgImage}
              setGeneratedBgImage={setGeneratedBgImage}
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
}

export default App;
