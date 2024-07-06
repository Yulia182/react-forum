import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
