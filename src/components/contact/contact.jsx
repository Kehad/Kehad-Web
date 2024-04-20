import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
// import classes from './contact.module.css';
import SocialLinks from '../others/socialLinks';
// import Notify from './notification/notify';
// import ButtonType2 from '../layout/buttonType2';
// import ButtonSend from '../layout/buttonSend';
import { useNavigate } from 'react-router-dom';
import Button from '../others/button';
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_d447m7b',
        'template_nxsssjd',
        form.current,
        '0XzXxZ4oMFmfaKJ-D'
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
            setIsDisable(true);
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
    if (
      username.length > 3 &&
      message.length > 5 &&
      email.includes('@gmail.com')
    ) {
      setAuthenticated(true);
      setTimeout(() => {
        dontClick();
      }, 5000);
    } else {
      // alert("Authentication failed. Please check your username and password.")
      // { !authenticated && <p>ss</p> };
      setAuthenticatedError(true);
    }
  };

  setTimeout(() => {
    setAuthenticated(false);
    setAuthenticatedError(false);
  }, 5000);

  return (
    <div className="mt-0">
      <h1 className="font-judson text-primary text-7xl mb-4">Hello</h1>
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
        className="flex flex-col p-8 bg-sup rounded-3xl w-40rem"
      >
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="name"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-white font-judson w-full text-2xl outline-none"
            name="user_name"
            ref={nameInput}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="user_email"
            className="rounded-md border border-solid border-primary p-4 bg-transparent text-white font-judson w-full text-2xl outline-none"
            ref={emailInput}
            onChange={handleChange}
          />
        </div>
        <textarea
          placeholder="Message..."
          maxLength="500"
          className="resize-none h-20 bg-transparent rounded-md border border-solid border-primary p-4 outline-none text-2xl"
          name="message"
          ref={messageInput}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex justify-between items-center mt-8">
          <SocialLinks />
          <Button action={handleSubmit} to={'/home'} name={'send'} />
          {authenticated &&
            // <Notify
            //   head="Success"
            //   text="You have successfully sent the email"
            // />
            'kk'}
          {authenticatedError &&
            // <Not head="Failure" text="You failed to send your message" />
            'aa'}

          {/* {!disable && (
            <ButtonSend action={sendEmail} to={"/home"} name={"send"} />
          )}
          {disable && (
            <ButtonType2
              action={dontClick}
              newClass={"disabledLink"}
              to={"/home"}
              name={"send"}
              disable={disable}
            />
          )} */}
        </div>
      </form>
    </div>
  );
};

export default Contact;
