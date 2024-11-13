import React, { useEffect } from 'react';
import './pixel.css';

function Pixel() {
  useEffect(() => {
    const images = document.querySelectorAll(".pixels-slider");
    const accordions = document.querySelectorAll(".accordion");

    const handleImageClick = (image) => {
      image.classList.add("active");

      images.forEach((otherImage) => {
        if (otherImage !== image) {
          otherImage.classList.remove("active");
        }
      });
    };

    // Event listener for pixels-slider clicks
    images.forEach((image) => {
      image.addEventListener("click", () => handleImageClick(image));
    });

    // Event listener for accordion clicks
    accordions.forEach((accordion, index) => {
      const header = accordion.querySelector(".accordion__header");
      const content = accordion.querySelector(".accordion__content");
      const icon = accordion.querySelector(".accordion__icon i");

      header.addEventListener("click", () => {
        const isOpen = content.style.height === `${content.scrollHeight}px`;

        accordions.forEach((a, i) => {
          const c = a.querySelector(".accordion__content");
          const ic = a.querySelector(".accordion__icon i");

          if (i === index) {
            c.style.height = isOpen ? "0px" : `${c.scrollHeight}px`;
            ic.classList.toggle("fa-plus", isOpen);
            ic.classList.toggle("fa-minus", !isOpen);
          } else {
            c.style.height = "0px";
            ic.classList.remove("fa-minus");
            ic.classList.add("fa-plus");
          }
        });
      });
    });

    // Cleanup event listeners when component unmounts
    return () => {
      images.forEach((image) => {
        image.removeEventListener("click", () => handleImageClick(image));
      });
      accordions.forEach((accordion) => {
        const header = accordion.querySelector(".accordion__header");
        header.removeEventListener("click", () => {});
      });
    };
  }, []); 

  return (
    <div className='container'> 
      <section className="second-sec">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="3000">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0">
              <div className="pixels">
                <ul className="list-unstyled pixels">
                  <li className="pixels-slider">
                    <i className="fa-solid fa-angles-right"></i>
                    <img className="img img-fluid" src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                  </li>
                  <li className="pixels-slider">
                    <i className="fa-solid fa-angles-right"></i>
                    <img className="img img-fluid" src="https://images.pexels.com/photos/2294363/pexels-photo-2294363.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                  </li>
                  <li className="pixels-slider">
                    <i className="fa-solid fa-angles-right"></i>
                    <img className="img img-fluid" src="https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                  </li>
                  <li className="pixels-slider active">
                    <i className="fa-solid fa-angles-right"></i>
                    <img className="img img-fluid" src="https://images.pexels.com/photos/1435822/pexels-photo-1435822.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <div className="about-st mt-4">
                <h6>About us</h6>
                <h3>Why Our Fitness Tracker App</h3>
                <p>
            In recent years, there has been a significant surge in health and fitness consciousness among individuals worldwide. With the advent of technology and the proliferation of smartphones, people are increasingly turning to digital solutions to help them manage and monitor their fitness journeys.
          </p>                <p> labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              </div>
              <div className="custom-btn mt-3 mb-3">
                <a href="#" className="btn-whimsical">EXPLORE NOW</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pixel;
