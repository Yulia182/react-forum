import { Link } from "react-router-dom";
import calculateTimeDifference from "./TimePosted";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="Card">
      <p>{calculateTimeDifference(props.time)}</p>
      <Link to={`/posts/${props.id}`}>{props.title}</Link>
    </div>
  );
};

export default Card;
