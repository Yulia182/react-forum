import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <nav className="Header">
      <div className="title">
        <Link to="/">
          <h1>CodeConnect</h1>
        </Link>
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
