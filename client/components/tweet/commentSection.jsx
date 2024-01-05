import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import '../tweet/tweet.css'

export default function commentSection(props) {
  //get tweet id from params 
  const { tweetid } = useParams();
  //handling routing
  const router = useRouter();
  //state for delete and current user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  //get token from local storage
  const token = localStorage.getItem('token');

  // Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence (true or false)
  }, [token]);

  // Fetch current user ID if logged in
  useEffect(() => {
    async function getCurrentUser() {
      try {
        if (token) {
          const headers = createAuthHeaders(token);
          //get currentuser id and save to state
          const response = await axios.get(`http://localhost:4000/api/user`, {
            headers: headers,
          });
          setCurrentUserId(response.data._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, [token]);


  async function handleDelete(id, author_id) {
    try {
      // Set the Authorization header with the JWT token
      const headers = createAuthHeaders(token);
      //check for authorization for deleting a post
      if (currentUserId === author_id) {
        // Make the DELETE request with the provided headers
        const response = await axios.delete(`http://localhost:4000/api/tweets/${tweetid}/comments/${id}`, {
          headers: headers,
        });
        router.push(`/tweets/${tweetid}`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  //for token headers
  function createAuthHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  //change the date format to yy/mm/dd
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = new Date(props.time).toLocaleDateString('en-US', options);

  return (
    <div className="tweet-card" >
      <div >
        <div>
          <span> <FontAwesomeIcon icon={faCircle} style={{ fontSize: 15, color: "grey" }} />  </span>
          <span className="card-title">{props.name}</span> <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 15, color: "#1DA1F2" }} /> <span className="subtitle">@{props.username}.  {formattedDate}</span>


          {/* Render delete button only if user is logged in and currentUserId matches authorId */}
          {isLoggedIn && currentUserId === props.author_id && (
            <span className="delete-btn dropdown">
              <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              </span>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><span onClick={() => handleDelete(props.id, props.author_id)} className="dropdown-item">Delete</span></li>
              </ul>
            </span>
          )}
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
