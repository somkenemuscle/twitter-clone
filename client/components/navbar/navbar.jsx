import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from '../../app/context/userLog';
import { useRouter } from 'next/navigation';
import axios from "axios";

// Navbar function component
function navbar() {
  //global state to check if user is logged in or not
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [loading, setLoading] = useState(true);
  //state to store user id currently
  const [currentUserId, setCurrentUserId] = useState(null);
  //handling routing
  const router = useRouter();
  let tk = null;


  useEffect(() => {
    const token = localStorage.getItem('token');
    tk = token
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, [tk]);

  //for token headers
  function createAuthHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Fetch current user ID if logged in
  useEffect(() => {
    async function getCurrentUser() {
      try {
        // Check if the token exists in localStorage
        if (tk) {
          const headers = createAuthHeaders(tk);
          //get currentuser id and save to state
          const response = await axios.get(`http://localhost:4000/api/user`, {
            headers: headers,
          });
          setCurrentUserId(response.data._id);
        } else {
          setCurrentUserId(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, [tk]);

  //handling redirect to a specific id ( id passed to the function from props.id)
  function gotoPage() {
    if (isLoggedIn) {
      router.push(`/posts/${currentUserId}`);
    }
  }

  async function logout() {
    localStorage.removeItem('token');
    tk = null;
    setIsLoggedIn(false);
  }

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-nav">
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        <a className="navbar-brand" href="/">  <FontAwesomeIcon icon={faHamburger} style={{ fontSize: 18, color: "white" }} />  Retweet</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/tweets">Tweets</a>
            </li>
            {/* Conditionally render Signup and Login links */}
            {isLoggedIn ? null : (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/signup">Signup</a>
                </li>
              </>
            )}

            {/* Conditionally render Logout link */}
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a onClick={logout} className="nav-link active" aria-current="page" href="/login">
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => { gotoPage() }} className="nav-link active" aria-current="page" href="#">
                    Profile
                  </a>
                </li>
              </>

            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar