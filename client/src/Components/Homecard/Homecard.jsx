import React, { useEffect } from 'react';
import './Homecard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Homecard() {
  useEffect(() => {
    AOS.init();
  }, []);

  const imageURL = 'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <div>
      <section className="second-sec" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
        <div className="container">
          <div className="row">
            <div className="main-head ">
              <h3>We Carry your Favorite Brands</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-4">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="abc" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>945 E Jericho Turnpike, Huntington Station, NY 11746</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="locate" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-4">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="card2" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>600 Sunrise Highway, Bay Shore, NY 11706</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="locate" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-4">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="card3" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>959 E Jericho Turnpike, Huntington Station, NY 11746</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="locate" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-3">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="card1" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>390 E Jericho Turnpike, Huntington Station, NY 11746</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="location" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-3">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="card2" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>11621 US Highway 1, North Palm Beach, FL 33408</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="locate" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-3">
              <div className="card-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <div className="card-img">
                  <img className="img-fluid" src={imageURL} alt="card3" />
                </div>
                <div className="main-locate">
                  <div className="locate-st">
                    <h5>They're Located At:</h5>
                    <p>959 E Jericho Turnpike, Huntington Station, NY 11746</p>
                  </div>
                  <div className="locate-img">
                    <img className="img-fluid" src={imageURL} alt="locate" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homecard;
