import { useState } from "react";
import { supabase } from "../client";
import "./CreatePost.css";

const CreatePostFrom = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Insert a new post into the database
    await supabase
      .from("Posts")
      .insert({
        title: title,
        content: content,
        image: image,
        created_at: new Date().toISOString(),
      })
      .select();

    window.location = "/";
  };

  return (
    <form className="CreatePostFrom" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Content:</label>
      <textarea
        type="text"
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label>Image:</label>
      <input
        type="url"
        name="image"
        id="image"
        placeholder="Image URL (Optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <img id="uploadImg" src={file} alt="" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreatePostFrom;
