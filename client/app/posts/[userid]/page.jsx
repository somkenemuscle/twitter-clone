"use client"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import TweetContainer from "@/components/tweet/tweetContainer";
import './post.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCalendarDays,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

function posts() {
  //getting user id from url params
  const { userid } = useParams();
  //handling tweet state
  const [tweets, setTweets] = useState([]);
  //user state
  const [user, setUser] = useState();


  //fetching data-tweets from json api
  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:4000/api/tweets/${userid}/posts`)
        .then((res) => {
          setTweets(res.data);
        })
        .catch((error) => {
          console.error("Error fetching tweets:", error);
        });
    }
  }, [userid]); // Include userid as a dependen


  //get infromation about a particular user from the json api
  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:4000/api/user/${userid}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching tweets:", error);
        });
    }
  }, [userid]); // Include userid as a dependency


  // change the date format to yy/mm/dd
  const formattedDate = user ? (
    new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  ) : "";

  return (
    <div className="post-container">
      {tweets && tweets.length > 0 ? (
        <>
          <p>POSTS</p>
          {user && (
            <div>
              <p>{user.name}</p>
              <p>@{user.username}</p>
              <p>{user.about}</p>
              <p>Gender - {user.gender}</p>
              <p><FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 15, color: "grey" }} />   {user.niche}</p>
              <a style={{ textDecoration: "none", color: 'lightblue' }} href={user.socials}><FontAwesomeIcon icon={faLink} style={{ fontSize: 15, color: "grey" }} />   {user.socials}</a>
              <p><FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: 15, color: "grey" }} />  Joined {formattedDate}</p>
              <br />
            </div>
          )}
          {tweets.map((newtweet, i) => (
            <TweetContainer
              id={newtweet._id}
              key={i}
              name={newtweet.author.name}
              username={newtweet.author.username}
              text={newtweet.text}
              url={newtweet.image}
              author_id={newtweet.author._id}
              time={newtweet.createdAt}
            />
          ))}
        </>
      ) : (
        <p>No tweets found.</p>
      )}
    </div>
  )
}

export default posts