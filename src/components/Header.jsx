import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="nav">
      <div className="websiteTitle">
        <Link to="/">GlamGlow Insights</Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="create">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
