import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import "./App.css";
import Login from "./components/Login.jsx";
import { supabase } from "./client.js";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<HomeFeed />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts/:id" element={<PostDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
