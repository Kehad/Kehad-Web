import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
// import classes from './contact.module.css';
import SocialLinks from '../others/socialLinks';
// import Notify from './notification/notify';
// import ButtonType2 from '../layout/buttonType2';
// import ButtonSend from '../layout/buttonSend';
import { useNavigate } from 'react-router-dom';
import Button from '../others/button';
import Not from './not';
import Notify from './notify';
// import Not from './notification/not';

const Contact = function (props) {
  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);
  // const [nameState, setNameState] = useState("");
  // const [emailState, setEmailState] = useState("");
  // const [messageState, setMessageState] = useState("");
  const [disable, setIsDisable] = useState(false);
  const [test, setTest] = useState(false);
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
        'service_d447m7b',
        'template_nxsssjd',
        form.current,
        'bQptP5N6peueuwXVE'
      )
      .then(
        (result) => {
          console.log(result);
          console.log(result.text);
          console.log('message sent');
          // (result && <Notify
          //   head={"Success"}
          //   text={"You have successfully sent the email"}
          // />)
          if (result.text === 'OK') {
            console.log('correct');
            setIsSuccess(true);
            setIsDisable(true); // 09139116045 -- ini
            // <Notify
            //   head="Success"
            //   text="You have successfully sent the email"
            // />;
            // const aa = <Notify
            //   head="Success"
            //   text="You have successfully sent the email"
            // />;
          }
          // return aa;
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const dontClick = () => {
    navigate('/home');
  };

  console.log(formData);

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
    console.log(words);
    console.log(username, username.length);
    if (
      username.length >= 5 &&
      words.length >= 5 &&
      email.includes('@gmail.com')
    ) {
      console.log('correct');
      setAuthenticated(true);
      console.log('correct');
      sendEmail();
      console.log('correct');
      setTimeout(() => {
        dontClick();
      }, 3000);
    } else {
      // alert("Authentication failed. Please check your username and password.")
      // { !authenticated && <p>ss</p> };
      setAuthenticatedError(true);
    }
  };

  setTimeout(() => {
    setAuthenticated(false);
    setAuthenticatedError(false);
  }, 7000);

  return (
    <div className="mt-0">
      <h1 className="font-judson text-primary  mb-4 text-3xl lg:text-7xl">
        Hello
      </h1>
      <p className="text-2xl mb-6 font-bold">
        Looking to start a project and need that magical touch?
        <span>
          <a
            className="text-primary no-underline "
            href="mailto:keahnney01@gmail.com"
          >
            Reach out!!!
          </a>
        </span>
      </p>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="flex flex-col p-4 md:p-8 lg:p-8 bg-sup dark:bg-sub rounded-3xl sm:w-full lg:w-40rem"
      >
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="name"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-white font-judson w-full text-xl outline-none sm:text-lg sm:p-2"
            name="user_name"
            ref={nameInput}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="user_email"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-white font-judson w-full text-xl outline-none sm:text-lg sm:p-2"
            ref={emailInput}
            onChange={handleChange}
          />
        </div>
        <textarea
          placeholder="Message..."
          maxLength="500"
          className="resize-none h-20 bg-transparent rounded-md border border-solid border-primary p-4 outline-none text-xl text-white font-judson sm:text-lg sm:p-2"
          name="message"
          ref={messageInput}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex justify-between items-center mt-8">
          <SocialLinks />
          <Button action={handleSubmit} to={'/home'} name={'send'} />
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
          {/* <Not /> */}
          {/* <Notify /> */}
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
    </div>
  );
};

export default Contact;
