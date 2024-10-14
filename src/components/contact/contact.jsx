import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";


import SocialLinks from "../others/socialLinks";
import { useNavigate } from "react-router-dom";
import Button from "../others/button";
import Not from "./not";
import Notify from "./notify";
import TransitionMovement from "../others/transitionMovement.jsx";

const Contact = function () {
  const form = useRef();
  const [formData, setFormData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedError, setAuthenticatedError] = useState(false);

  const navigate = useNavigate();
  const nameInput = useRef();
  const emailInput = useRef();
  const messageInput = useRef();

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_d447m7b",
        "template_nxsssjd",
        form.current,
        "bQptP5N6peueuwXVE"
      )
      .then(
        (result) => {
          alert(" You have successfully sent the message")
        },
        (error) => {
          alert("Message not send due to " + error.message);
        }
      );
  };

  const dontClick = () => {
    navigate("/home");
  };


  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      username: nameInput.current.value,
      email: emailInput.current.value,
      message: messageInput.current.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can perform authentication here. For simplicity, we're comparing to hardcoded values.
    if (!formData) return;
    const { username, email, message } = formData;
    const words = message.trim().split(/\s+/);
    if (
      username.length >= 5 &&
      words.length >= 5 &&
      email.includes("@gmail.com")
    ) {
      setAuthenticated(true);
      sendEmail();
      setTimeout(() => {
        dontClick();
      }, 3000);
    } else {
      setAuthenticatedError(true);
    }
  };

  // to remove the notify or not modal from the dom
  setTimeout(() => {
    setAuthenticated(false);
    setAuthenticatedError(false);
  }, 7000);

  return (
    <TransitionMovement className="mt-0">
      <h1 className="font-judson text-primary  mb-4 text-3xl lg:text-5xl">
        Hello
      </h1>
      <p className="text-xl lg:text-[1.3rem] mb-6 font-bold">
        Looking to start a project and need that magical touch?
        <span>
          <a
            className="text-primary no-underline"
            href="mailto:keahnney01@gmail.com"
          >
            Reach out!!!
          </a>
        </span>
      </p>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="flex flex-col p-4 md:p-8 lg:p-8 bg-sup dark:bg-[#263328] rounded-3xl sm:w-full lg:w-35rem"
      >
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="name"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-xl text-primary w-full outline-none sm:text-lg sm:p-2"
            name="user_name"
            ref={nameInput}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="user_email"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-xl text-primary w-full outline-none sm:text-lg sm:p-2"
            ref={emailInput}
            onChange={handleChange}
          />
        </div>
        <textarea
          placeholder="message..."
          maxLength="500"
          className="rounded-md border border-solid border-primary p-4 bg-transparent text-xl outline-none text-primary sm:text-lg sm:p-2 resize-none h-20"
          name="message"
          ref={messageInput}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex justify-between items-center mt-8">
          <SocialLinks />
          <Button action={handleSubmit} to={"/home"} name={"send"} />
          {authenticated && (
            <Notify
              head="Success"
              text="You have successfully sent the email"
            />
          )}
          {authenticatedError && (
            <Not
              head="Failure"
              text="Your username/message must be at least 5 texts/words long and gmail must be a valid email address "
            />
          )}
         
         
          {/* {!disable && (
            <ButtonSend action={sendEmail} to={'/home'} name={'send'} />
          )}
          {disable && (
            <ButtonType2
              action={dontClick}
              newClass={'disabledLink'}
              to={'/home'}
              name={'send'}
              disable={disable}
            />
          )} */}
        </div>
      </form>
    </TransitionMovement>
  );
};

export default Contact;
