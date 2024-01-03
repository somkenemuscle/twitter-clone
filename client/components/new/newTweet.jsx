'use client'
import './newTweet.css'
import { useState } from 'react'

function newTweet(props) {
  //state for tweets
  const [tweets, setTweets] = useState({
    text: '',
    image: ''
  });

  //form bootsrap validation state
  const [validated, setValidated] = useState(false);

  //handling input change and updating tweet state
  function handleChange(e) {
    const { value, name } = e.target;
    setTweets((prevTweet) => {
      return {
        ...prevTweet,
        [name]: value
      }
    })
  }

  //handling submit when form is filled with (Bootstrap form validation)
  async function handlesubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return; // Exit early if the form is not valid
    }

    try {
      // Attempt to add tweet to the database
      await props.addTweet(tweets);
      setValidated(false); // Reset validated state
      setTweets({ text: '', image: '' }); // Reset the input fields after adding the tweet
    } catch (error) {
      console.error('Error adding tweet:', error);
    }
  }

  return (
    <div>
      <div className='new-tweet-container'>
        <form className={validated ? 'was-validated' : ''} noValidate onSubmit={handlesubmit}>
          <textarea onChange={handleChange} value={tweets.text} required className="tweet-input form-control" rows="3" placeholder='Say something' name='text'></textarea>
          <div className="invalid-feedback">
            say something
          </div>
          <input onChange={handleChange} type="text" value={tweets.image} className="tweet-input form-control" placeholder="Image Url" required name='image' />
          <div className="invalid-feedback">
            Please provide an image url
          </div>
          <button className='btn btn-sm btn-dark'>Post tweet</button>
        </form>
      </div>
    </div>
  )
}

export default newTweet