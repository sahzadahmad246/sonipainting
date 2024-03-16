import React, { useState } from "react";
import axios from "axios";
import "../../CSS/home/Contact.css";
import profilePic from "../../images/profilepic.jpg";

function Contact() {
  const [formData, setFormData] = useState({
    fname: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Message sent successfully");
      setFormData({ fname: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="contact-main">
      <div className="call">
        <div className="call-top">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" />
          </div>
          <p>
            Hello, I'm Omprakah Gupta a professional painter and have 8 years
            of experience
          </p>
        </div>
        <div className="call-to-action">
          <a href="tel:+919022846640" className="bg-danger text-light">
            <i className="fa fa-solid fa-phone"></i> Call Me
          </a>
          <a
            href="whatsapp://send?phone=+919022846640"
            className="border border-danger text-danger"
          >
            <i className=" px-2 fa fa-solid fa-whatsapp"></i>WhatsApp
          </a>
        </div>
      </div>
      <div className="contact">
        <h3>Get in touch</h3>
        <p>Fill out this form, we'll try to contact you asap!</p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              name="fname"
              id="fname"
              onChange={handleFormChange}
              value={formData.fname}
              placeholder="Type your full name"
            />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-phone"></i>
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handleFormChange}
              value={formData.phone}
              placeholder="Enter your phone"
            />
          </div>
          <div className="input-field" style={{ border: "none" }}>
            <textarea
              className="border-none"
              name="message"
              onChange={handleFormChange}
              value={formData.message}
              id="message"
              placeholder="Type your lovely message here"
              style={{ height: "100px" }}
            ></textarea>
          </div>
          <button type="submit" className="bg-danger text-light">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
