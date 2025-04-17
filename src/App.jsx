import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import About from "./pages/about/About";
import { ColorThemeProvider } from "./context/ColorThemeContext";
import ColorThemeProviderWrapper from "./components/color/ColorThemeProviderWrapper";
import "./App.css";
import CreateProductForm from "./components/admin/CreateProductForm";
import Collection from "./pages/collection/Collection";
import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/shop/ProductDetail";
import LivingSketch from "./pages/sketch/LivingSketch";



function App() {
  return (
    <ColorThemeProvider>
      <ColorThemeProviderWrapper>
        <Navbar />
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/create_product" element={<CreateProductForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collabs" element={<LivingSketch />} />

        </Routes>
      </ColorThemeProviderWrapper>
    </ColorThemeProvider>
  );
}

export default App;
