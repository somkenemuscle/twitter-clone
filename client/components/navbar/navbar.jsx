import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from '../../app/context/userLog';
import { useRouter } from 'next/navigation';
import { UseCurrentUserId } from "@/app/context/currentUserId";

// Navbar function component
function navbar() {
  //global state to check if user is logged in or not
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  //state for navbar
  const [loading, setLoading] = useState(true);
  //get the userid from global state
  const { CurrentUserId } = UseCurrentUserId();
  //route declaration
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

  //handling redirect to a specific id ( id passed to the function from props.id)
  function gotoPage() {
    if (isLoggedIn) {
      router.push(`/posts/${CurrentUserId}`);
    }
  }

  //logout function
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