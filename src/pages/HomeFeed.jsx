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
    <div className="homeFeed">
      <input
        className="searchBar"
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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