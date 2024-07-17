import React, { useState } from "react";
import { supabase } from "../client";
import "./UpdatePost.css";

const EditPost = ({ id, onClose, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleUpdate = async () => {
    try {
      // Fetch the current post data from the database
      const { data: currentData, error: fetchError } = await supabase
        .from("Posts")
        .select()
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching current post data:", fetchError);
        return;
      }

      // Check if any changes have been made
      const isChanged =
        title !== currentData.title ||
        content !== currentData.content ||
        image !== currentData.image;

      if (!isChanged) {
        // If no changes, still call onUpdate to save the post data
        onUpdate();
        onClose();
        return;
      }

      // If changes detected, create an object with only the altered fields
      const updatedFields = {
        title: title !== "" ? title : currentData.title,
        content: content !== "" ? content : currentData.content,
        image: image !== "" ? image : currentData.image,
      };

      // Update the post data with the altered fields
      const { data, error } = await supabase
        .from("Posts")
        .update(updatedFields)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error updating post:", error);
      } else {
        onUpdate(data);
        onClose();
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
    window.location = "/posts/" + id;
  };

  return (
    <div className="EditPost">
      <h2>Edit Post</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength="2000"
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="updatePost-button" onClick={handleUpdate}>
        Update Post
      </button>
      <button className="updatePost-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default EditPost;
