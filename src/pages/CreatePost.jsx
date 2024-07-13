import { useEffect, useRef, useState } from "react";
import { supabase } from "../client";
import "./CreatePost.css";
import uuid from "react-uuid";

// base url for an img path in a storage
const CDNURL =
  "https://ueacfxuhuiicpvkemhig.supabase.co/storage/v1/object/public/uploads/";

const CreatePostFrom = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imgLink, setImgLink] = useState("");
  const fileInputRef = useRef(null);

  // upload files to supabase
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const fileName = uuid();
    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);
    if (error) {
      alert("Error uploading file to supabase");
    } else {
      setImage(CDNURL + fileName);
    }
    // console.log(file);
  };

  // reset local img upload to make upload with url available
  const resetImgUpload = () => {
    setImage("");
    setImgLink("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // access files from supabase
  const getFiles = async () => {
    const { data, error } = await supabase.storage.from("uploads").list("");
    if (data !== null) {
      setFiles(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  // console.log(files); // to see files in supabase storage

  const handleSubmit = async (e) => {
    e.preventDefault();
    // insert a new post into the database
    await supabase
      .from("Posts")
      .insert({
        title: title,
        content: content,
        image: imgLink || image,
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
      <label>Upload image from browser OR your local storage:</label>
      <input
        type="url"
        name="image"
        id="image"
        placeholder="Image URL (Optional)"
        value={imgLink}
        onChange={(e) => setImgLink(e.target.value)}
        disabled={image ? true : false}
      />
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
        ref={fileInputRef}
        disabled={imgLink ? true : false}
      />
      <button type="button" onClick={resetImgUpload} className="reset">
        Reset file
      </button>
      {imgLink && <img src={imgLink} className="uploadImg"></img>}
      {image && <img src={image} className="uploadImg"></img>}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreatePostFrom;
