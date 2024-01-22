"use client"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import TweetContainer from "@/components/tweet/tweetContainer";
import './post.css'

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


  //fetching data-tweets from json api
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


  return (

    <div className="post-container">
      {tweets && tweets.length > 0 ? (
        <>
          <p>POSTS</p>
          {user && (
            <>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </>
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