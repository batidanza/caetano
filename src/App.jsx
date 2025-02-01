import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Contact from "./components/contact/Contact.jsx";
import Work from "./components/sketch/Work.jsx";

import Collection from "./components/work/Collection.jsx";
import RapidImagePrintSketch from "./components/sketch/RapidImagePrintSketch.jsx";

import WorkSketchPixel from "./components/sketch/WorkSketchPixel.jsx";

import Login, { AuthProvider } from "./components/management/user/Login.jsx";
import Management from "./components/management/Management.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import WorkHome from "./components/work/WorkHome.jsx";
import CreateArchive from "./components/management/Archive/CreateArchive.jsx";
import UploadArchivePhotos from "./components/management/Archive/UploadArchivePhotos.jsx";
import CreateCollection from "./components/management/Collection/CreateCollection.jsx";
import UploadCollectionPhotos from "./components/management/Collection/UploadCollectionPhotos.jsx";
import ManageCollections from "./components/management/Collection/ManageCollections.jsx";
import Home from "./components/layout/Home.jsx";
import LoadingSketch from "./components/layout/LoadingSketch.jsx";
import ImageSketch from "./components/sketch/ImageSketch.jsx";

function App() {

  const [isLoading, setIsLoading] = useState(false); 

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Navbar />
      <AuthProvider>
      {isLoading && <LoadingSketch />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-collections" element={<ManageCollections showLoading={showLoading} hideLoading={hideLoading} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<ImageSketch />} />
          <Route path="/experimentation" element={<WorkSketchPixel />} />
          <Route
            path="/rapid-image-print"
            element={<RapidImagePrintSketch />}
          />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/collection-create" element={<CreateCollection />} />
          <Route
            path="/collection-photos-upload"
            element={<UploadCollectionPhotos />}
          />
          <Route
            path="/collection-archive-create"
            element={<CreateArchive />}
          />
          <Route
            path="/collection-archive-photos-upload"
            element={<UploadArchivePhotos />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
