import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import calculateTimeDifference from "../components/TimePosted";
import EditPost from "./UpdatePost";
import "./PostDetails.css";
import { getPostDetailsById } from "../services/supabaseService";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);

  // Search for post details
  useEffect(() => {
    const postDetails = async () => {
      const data = await getPostDetailsById(id);
      setPost(data);
    };
    postDetails();
  }, [id]);

  useEffect(() => {
    // Scroll to the bottom of the creen when use press edit button
    if (editing) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [editing]);

  const handleUpdate = (updatedData) => {
    setPost(updatedData);
  };

  return (
    <div className="PostDetails">
      <div className="postDetailsNav">
        <Link to="/" className="previousPage">
          ⬅
        </Link>
        <button onClick={() => setEditing(true)}>Edit Post</button>
      </div>
      {post ? (
        <div>
          <p className="postTime">{calculateTimeDifference(post.created_at)}</p>
          <h2 className="postTitle">{post.title}</h2>
          <p className="postContent">{post.content}</p>
          <img className="postImage" src={post.image} alt="" />
        </div>
      ) : (
        <h2>Post not found</h2>
      )}
      {editing && (
        <EditPost
          id={post.id}
          onClose={() => setEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default PostDetails;
