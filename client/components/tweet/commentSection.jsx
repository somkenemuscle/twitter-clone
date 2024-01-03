import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import '../tweet/tweet.css'

export default function commentSection(props) {

  //change the date format to yy/mm/dd
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = new Date(props.time).toLocaleDateString('en-US', options);

  return (
    <div className="tweet-card" >
      <div >
        <div>
          <span> <FontAwesomeIcon icon={faCircle} style={{ fontSize: 15, color: "grey" }} />  </span>
          <span className="card-title">{props.name}</span> <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 15, color: "#1DA1F2" }} /> <span className="subtitle">@{props.username}.  {formattedDate}</span>

          <span className="delete-btn dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            </span>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="/tweets">Delete</a></li>
            </ul>
          </span>
        </div>

        <p className="card-text">{props.text}</p>
      </div>
      <div className="engagement-container ">
        <span className="like-tweet engagement-count"><FontAwesomeIcon icon={faHeart} style={{ fontSize: 16, color: "orangered" }} /></span>
        <span className="like-count">25k Likes</span>
      </div>
    </div>
  )
}
