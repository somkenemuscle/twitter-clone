// TweetContext.js
import React, { createContext, useContext, useState } from 'react';

const allTweetContext = createContext();

export function useallTweetContext() {
    return useContext(allTweetContext);
}

export function AllTweetsProvider({ children }) {
    const [alltweets, setallTweets] = useState([]);

    return (
        <allTweetContext.Provider value={[ alltweets, setallTweets ]}>
            {children}
        </allTweetContext.Provider>
    );
}
