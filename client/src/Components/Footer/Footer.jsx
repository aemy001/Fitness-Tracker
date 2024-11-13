import React from 'react'
import {Link} from 'react-router-dom'
// import logo from "../../Components/images/image.png"
import './Footer.css'
function Footer() {
  return (
    <div>
        <section className="footer">
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <div className="footer2">
          <div className="footerlogo">
            <Link className='logotext' to="/"> FITNESS TRACKER
              {/* <img src={logo} className="img-fluid" alt="footerlogo"/> */}
            </Link>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <ul className="footer1 mt-4 list-unstyled">
            <li><Link to="">Locations</Link></li>
            <li><Link to="">About</Link></li>
            <li><Link to="">Services</Link></li>
          </ul>
          <hr className="hr1"/>
          <div className="footer3">
            <p>Copyright © 2024 - All Rights Reserved.</p>

            <div className="footer4">
               <p>Download The App</p> 

            </div>
            <p>Privacy &amp; Policy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



</div>
  )
}

export default Footer