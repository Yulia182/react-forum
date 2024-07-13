import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import "./HomeFeed.css";
import { getPosts } from "../services/supabaseService.js";

function HomeFeed() {
  const [feed, setFeed] = useState([]);
  // controlled component
  const [searchTerm, setSearchTerm] = useState("");

  //Search for posts
  useEffect(() => {
    const getAllPosts = async () => {
      const data = await getPosts(searchTerm);
      setFeed(data);
    };
    getAllPosts();
  }, [searchTerm]);

  return (
    <div className="HomeFeed">
      <div className="introContainer">
        <p>
          <strong>
            <code className="title">CodeConnect</code>
          </strong>{" "}
          is your go-to platform for submitting <code>code_problems</code>,
          finding <code className="element-style-type">{`<solutions />`}</code>,
          and connecting with{" "}
          <code style={{ color: "red" }}>fellow_developers()</code>.
        </p>
      </div>
      <div className="searchDiv">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="searchBar"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {feed && feed.length > 0 ? (
        feed.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            time={post.created_at}
          />
        ))
      ) : (
        <h4>No Posts Found</h4>
      )}
    </div>
  );
}

export default HomeFeed;
