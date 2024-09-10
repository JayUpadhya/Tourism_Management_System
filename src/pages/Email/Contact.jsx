import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import seaImage from '../../images/Ticket/ticket.jpg';

const Contact = () => {
  const form = useRef();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5zuf6jf",
        "template_ygqat9p",
        form.current,
        "C21HMoeYow4u-tL2_"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setIsEmailSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleContactButtonClick = () => {
    // Handle the action when the contact button is clicked
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    // Replace any non-alphabetic characters with an empty string
    const formattedInput = input.replace(/[^A-Za-z]/ig, '');
    // Update the state with the formatted input
    e.target.value = formattedInput;
  };

  
  

  return (
    <StyledContactContainer>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label className="title">Send Your Email For Us...</label>

          <label>Name</label>
          <input type="text" name="user_name" onChange={handleNameChange} />
          <label>Email</label>
          <input type="email" name="user_email"  />
          <label>Message</label>
          <textarea name="message" />
          <label className="or">or</label>
          <input type="submit" value="Send" />
          {isEmailSent && <p>Email sent successfully!</p>}
          <button className="contact-button" onClick={handleContactButtonClick}>
            Contact Us: 0312222777
          </button>
        </form>
      </StyledContactForm>
    </StyledContactContainer>
  );
};

export default Contact;

const StyledContactContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${seaImage});
  background-size: cover;
`;

const StyledContactForm = styled.div`
  width: 400px;

  form {
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    label {
      margin-top: 1rem;
      font-size: 24px;
    }

    label.title {
      font-weight: bold;
      font-size: 28px;
    }
    label.or {
      position: absolute;
      top: 80%;
      right: 379px;
    }

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: #000;
      color: white;
      border: none;
    }

    .contact-button {
      margin-top: 5rem;
      cursor: pointer;
      right: 500px;
      background: #000;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      outline: none;

      &:hover {
        background: #333;
      }
    }
  }
`;
