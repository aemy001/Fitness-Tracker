import "./HomePage.css";
import Pixel from "../../Components/pixelSlider/pixel";
import React, { useState } from "react";
import Homecard from "../../Components/Homecard/Homecard";
import Videobackground from "../../Components/Videobackground/Videobackground";
import FAQ from "../../Components/Faqs/Faq";
import Testimonials from "../../Components/Testimonials/Testimonials";

const HomePage = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What features does the Fitness Tracker app offer?",
      answer:
        "Our Fitness Tracker app offers a range of features including workout tracking, nutrition logging, progress monitoring, personalized dashboards, data visualization, and more. You can create, edit, and delete workout routines, log daily food intake, record your fitness progress, and view detailed analytics of your workouts and nutrition.",
      open: false,
    },
    {
      question: "How can I register for an account?",
      answer:
        "To register, click on the 'Sign Up' button on the home page. You'll need to provide a unique username, password, and basic profile information such as your name and email address. Once you've filled out the registration form, click 'Submit' to create your account.",
      open: false,
    },
    {
      question: "Can I track my workouts and nutrition?",
      answer:
        "Yes, the app allows you to track both workouts and nutrition. You can log your daily workouts, including exercise details like sets, reps, and weights, as well as your meals with nutritional information such as calories and macronutrients.",
      open: false,
    },
    {
      question: "How does the progress tracking feature work?",
      answer:
        "The progress tracking feature allows you to record and visualize your fitness journey. You can input your weight, body measurements, and performance metrics. The app generates graphs and charts to show your progress over time, helping you stay motivated and see the results of your efforts.",
      open: false,
    },
    {
      question: "Is the app compatible with mobile devices?",
      answer:
        "Yes, the app is designed to be responsive and works well on various devices, including smartphones and tablets. You can access all features and functionality from your mobile device, ensuring you stay on track with your fitness goals wherever you are.",
      open: false,
    },
    {
      question: "Can I export my fitness data?",
      answer:
        "Absolutely. The app allows you to generate reports of your fitness progress and nutrition data, which you can export in various formats such as PDF or CSV. This feature is useful for tracking long-term progress and sharing data with your healthcare provider or trainer.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <>
      <div className="homepage">
        {/* background video top */}
        <div>
          <Videobackground
            videoSrc="https://videos.pexels.com/video-files/8028193/8028193-uhd_2732_1440_25fps.mp4"
            overlayColor="rgba(0, 0, 0, 0.5)"
          >
            <div>
              <h1 style={{ fontWeight: 600, fontSize: "56px" }}>
                Welcome to Fitness Tracker
              </h1>
              <h5 style={{ color: "#e85c53" }}>
                Track Your Progress, Transform Your Life
              </h5>
              <p>
                The Fitness Tracker application is needed to help users track
                their fitness activities, such as workouts, nutrition, and
                progress over time.
              </p>
            </div>
          </Videobackground>
        </div>
        {/* cards  */}
        <div className="container-fluid homecard mt-5">
          <Homecard />
        </div>

        {/* slider for about us */}
        <div className="container-fluid pixel">
          <Pixel />
        </div>

        {/* Testimonials */}
        <div className="row text-center mt-4">
          <div className="col-md-12 col-lg-12 testimonials">
            <h2 style={{ color: "#e85c53", fontSize: "48px" }}>Testimonials</h2>
            <Testimonials />
          </div>
        </div>

        {/* Faq */}
       <div className="container-fluid mt-5">
       <div className="row text-center">
          <div className="col-md-12 col-lg-12 faqs">
            <h2 style={{ color: "#e85c53", fontSize: "48px" }}>
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </div>
       </div>


      </div>
    </>
  );
};

export default HomePage;
