import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "../../CSS/home/Messages.css";

function MessagesComponent() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://sonipainting-backend.onrender.com/messages")
      .then((response) => {
        // Reverse the order of messages array
        const reversedMessages = response.data.contacts.reverse();
        setMessages(reversedMessages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact details:", error);
        setLoading(false);
        toast.error("Failed to fetch contact details");
      });
  }, []);

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="messages-main">
      {loading ? (
        <div className="loader-container">
          <ThreeDots
            color="red"
            height={100}
            width={100}
            visible={true}
            className="loader"
          />
        </div>
      ) : messages.length === 0 ? (
        <div className="no-messages">No messages found</div>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <div className="p-1 d-flex justify-content-between">
                <span>{message.fname}</span>
                <a href={`tel:${message.phone}`} onClick={(e) => e.stopPropagation()}>
                  <i className="fa-solid fa-phone"></i>
                </a>
              </div>
              <div className="p-1 text-secondary fs-6">{message.phone}</div>
              <div className="text-secondary">{message.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MessagesComponent;
