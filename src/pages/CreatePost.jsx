import { supabase } from "../client";
import "./CreatePost.css";

const CreatePost = async (event) => {
  event.preventDefault();

  //Capture the data entered in the form fileds.
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").value;

  //Insert a new post into the database
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

const CreatePostFrom = () => {
  return (
    <div>
      <form onSubmit={CreatePost}>
        <label>Title:</label>
        <input type="text" name="title" id="title" placeholder="Title" />
        <label>Content:</label>
        <textarea type="text" name="content" id="content" />
        <label>Image:</label>
        <input
          type="url"
          name="image"
          id="image"
          placeholder="Image URL (Optional)"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePostFrom;
