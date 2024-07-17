import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import calculateTimeDifference from "../components/TimePosted";
import EditPost from "./UpdatePost";
import "./PostDetails.css";
import { getPostDetailsById } from "../services/supabaseService";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [imgWidth, setImgWidth] = useState("50");
  const [cursor, setCursor] = useState("zoom-in");
  const [imgClass, setImgClass] = useState("");

  // Search for post details
  useEffect(() => {
    setTimeout(() => {
      const postDetails = async () => {
        const data = await getPostDetailsById(id);
        setPost(data);
        setIsLoading(false);
      };
      postDetails();
    }, 1000);
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

  // enlarge and reduce post image on click
  const toggleImgSizeonClick = (e) => {
    if (
      e.target.className === "postImage" ||
      e.target.className === "postImage zoomedIn"
    ) {
      if (imgWidth === "50") {
        setImgWidth("80");
        setCursor("zoom-out");
        setImgClass(" zoomedIn");
      } else {
        setImgWidth("50");
        setCursor("zoom-in");
        setImgClass("");
      }
    }
  };

  return (
    <>
      {imgClass === " zoomedIn" && <div className="overlay"></div>}
      <div className="PostDetails">
        <div className="postDetailsNav">
          <Link to="/" className="previousPage">
            ⬅
          </Link>
          <button onClick={() => setEditing(true)}>Edit Post</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : post ? (
          <div>
            <p className="postTime">
              {calculateTimeDifference(post.created_at)}
            </p>
            <h2 className="postTitle">{post.title}</h2>
            <p className="postContent">{post.content}</p>
            <img
              style={{ width: `${imgWidth}%`, cursor: `${cursor}` }}
              className={`postImage${imgClass}`}
              src={post.image}
              alt=""
              onClick={toggleImgSizeonClick}
            />
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
    </>
  );
};

export default PostDetails;
