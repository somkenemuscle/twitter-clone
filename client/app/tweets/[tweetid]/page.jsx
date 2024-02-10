"use client"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import TweetContainer from "@/components/tweet/tweetContainer";
import CommentSection from "@/components/tweet/commentSection";
import NewComment from "@/components/new/newComment";
import { useUserContext } from '../../context/userLog';
import "../../styles/tweetcontainer.css";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";


export default function TweetPage() {
  //global state to check if user is logged in or not
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  //handling routing 
  const router = useRouter();
  //keeping track of id state
  const [tweets, setTweets] = useState(); //possible initialize with null later on as undefined might not be appropriate
  //keep track of comment state 
  const [comments, setComments] = useState();
  //get tweet id from params 
  const { tweetid } = useParams();
  //get current user id from state
  const [currentUserId, setCurrentUserId] = useState(null);
  //save token to a state if it is available
  const [token, setToken] = useState(null)

  //get token and see if a user is loggged in 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //Fetch current user ID if logged in
  useEffect(() => {
    async function getCurrentUser() {
      try {
        if (token) {
          const headers = createAuthHeaders(token);
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




  // Fetch tweet data based on the 'tweetid' and display it
  useEffect(() => {
    axios.get(`http://localhost:4000/api/tweets/${tweetid}`)
      .then((res) => {
        setTweets(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
        setTweets(null); // Set tweets state to null on error
      });
  }, [tweetid, tweets]); // Include tweetid in the dependency array to re-fetch when it changes


  // Fetch comments based on the 'tweetid' and display it
  useEffect(() => {
    axios.get(`http://localhost:4000/api/comments/${tweetid}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComments(null); // Set comments state to null on error
      });
  }, [tweetid, comments]);// Include tweetid in the dependency array to re-fetch when it changes


  //add tweet to database function
  async function addComment(comments) {
    const token = localStorage.getItem('token');
    try {
      // Set the Authorization header with the JWT token
      const headers = createAuthHeaders(token);
      const res = await axios.post(`http://localhost:4000/api/comments/${tweetid}`, {
        comment: comments.comment,
      }, { headers }); // Pass headers as a third argument to axios.post()

      // Fetch updated tweets after successful addition
      const updatedCommentsResponse = await axios.get(`http://localhost:4000/api/comments/${tweetid}`);
      setComments(updatedCommentsResponse.data); // Update local state with the updated comments

    } catch (error) {
      console.log(error)
    }
  }

  //hadle deleting of a comment
  async function deleteComment(id, author_id) {
    const token = localStorage.getItem('token');
    try {
      // Set the Authorization header with the JWT token
      const headers = createAuthHeaders(token);
      //check for authorization for deleting a post
      if (currentUserId === author_id) {
        // Make the DELETE request with the provided headers
        const response = await axios.delete(`http://localhost:4000/api/tweets/${tweetid}/comments/${id}`, {
          headers: headers,
        });
        // Fetch updated tweets after successful addition
        const updatedCommentsResponse = await axios.get(`http://localhost:4000/api/comments/${tweetid}`);
        setComments(updatedCommentsResponse.data); // Update local state with the updated comments
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

  //handle redirect back to tweets page 
  function handlePostRedirect() {
    router.push('/tweets')
  }

  // Loading state while fetching data (error handling)
  if (!tweets) {
    return (<div>
    </div>);
  }

  return (
    <div className="tweet-container">
      <div className="backbtn">
        <span onClick={handlePostRedirect} className="back-logo"><FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 15, color: "whitesmoke" }} />   </span>
        <span className="back-text">Go back to post </span>
      </div>

      {/* Display the fetched tweet */}
      <TweetContainer
        id={tweets._id}
        name={tweets.author.name}
        username={tweets.author.username}
        text={tweets.text}
        url={tweets.image.url}
        author_id={tweets.author._id}
        time={tweets.createdAt}
        profile_img={tweets.author.profile_img.url}
        likes={tweets.likes}
      />

      {/* render create tweet form if user is logged in or not */}
      {isLoggedIn ? (
        <NewComment addComment={addComment} />
      ) : null}


      {/* displays comments under tweet */}
      <div className="comment-header">
        <span>View all comments ...</span>
      </div>


      {/* mapping through comments and rendering them */}
      <div className="comment-sec-hd">
        {!!comments ? (
          comments.map((newcomment, i) => (
            <CommentSection
              key={i}
              name={newcomment.author.name}
              username={newcomment.author.username}
              text={newcomment.comment}
              time={newcomment.createdAt}
              id={newcomment._id}
              author_id={newcomment.author._id}
              deleteComment={deleteComment}
              likes={newcomment.likes}
            />
          ))
        ) : null}
      </div>

    </div>
  );
}