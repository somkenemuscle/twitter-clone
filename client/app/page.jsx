import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import './styles/home.css';
import Footer from "@/components/footer";
// import the icons you need
import {
  faFolderOpen,
  faCheckCircle,
  faBullseye,
  faHeart,
  faCircleUp
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <section className="title">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <h1 className="title-header">Bestow the next generation of development operations engineering</h1>
              <h5 className="title-text">Develop, test, run, and bundle JavaScript & TypeScript projects—all with Bun. Bun is an
                all-in-one JavaScript runtime & toolkit test runner, and Node.js-compatible package manager.</h5>
              <Link href='/tweets'>
                <button type="button" className='btn btn-primary btn-md dw-btn'>
                  Make A Tweet  <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize: 15, color: "white" }} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container text-center">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <p><FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 60, color: "#0275d8" }} /></p>
              <h3 className='features-header'>Easy to use.</h3>
              <p className='features-p'>So easy to use, even your dog could do it.</p>
            </div>
            <div className="col-xl-4 col-md-6">
              <p> <FontAwesomeIcon icon={faBullseye} style={{ fontSize: 60, color: "orange" }} /></p>
              <h3 className='features-header'>Anonymous tweets</h3>
              <p className='features-p'>All tweets are published Anonymously on the site.</p>
            </div>
            <div className="col-xl-4 col-md-12">
              <p> <FontAwesomeIcon icon={faHeart} style={{ fontSize: 60, color: "#d9534f" }} /></p>
              <h3 className='features-header'>Guaranteed to work.</h3>
              <p className='features-p'>Find the gists you've been looking at yeah</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials testimonial-1">
        <h2 className='testimonial-text'>With private messaging and calling, you can be yourself, speak freely and feel close to the most important people in your life no matter where they are.</h2>
        <p className='testimonial-icon'> <FontAwesomeIcon icon={faCircleUp} style={{ fontSize: 60, color: "#0275d8" }} /></p>
      </section>


      <section className='cards-section home-cards-section'>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 home-card">
              <div className="card-body">
                <h5 className="card-title home-card-title">Workspaces</h5>
                <p className="card-text home-card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 home-card">
              <div className="card-body">
                <h5 className="card-title home-card-title">Durability</h5>
                <p className="card-text home-card-text">This is a short card card with supporting text below as a natural lead-in to additional content is durable for use and extension.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 home-card">
              <div className="card-body">
                <h5 className="card-title home-card-title">Enhance</h5>
                <p className="card-text home-card-text">This is a longer card with supporting text below as a natural lead-in to additional content also improves UI/UX enchancements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className='testimonial-text'>A new and modern way of  private messaging and calling, speak freely and feel close to the most important people in your life , to stranger's or more peeps.</h2>
        <Link href='/tweets'>
          <button type="button" className='btn btn-danger btn-md dw-btn'>
            Get Started
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  )
}
