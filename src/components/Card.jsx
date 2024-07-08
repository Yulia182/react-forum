import { Link } from "react-router-dom";
import calculateTimeDifference from "./TimePosted";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="Card">
      <Link to={`/posts/${props.id}`}>
        {props.title}
        <p>{calculateTimeDifference(props.time)}</p>
      </Link>
    </div>
  );
};

export default Card;
