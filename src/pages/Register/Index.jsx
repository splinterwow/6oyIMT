


import React, { useRef } from "react";
import RegPhoto from "../../assets/images/registerphoto2.png";
import rLogo from "../../assets/images/RegisterSVG.svg";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Register() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const photourlRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const navigate = useNavigate();

  function validate() {
    const username = usernameRef.current.value;
    const photoUrl = photourlRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    let isValid = true;

    if (username.length < 4) {
      toast.error("Your username must be at least 4 characters long");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      isValid = false;
    } else {
      usernameRef.current.style.outlineColor = "";
    }

    if (!photoUrl.startsWith("http")) {
      toast.error("Enter a valid image link");
      photourlRef.current.focus();
      photourlRef.current.style.outlineColor = "red";
      isValid = false;
    } else {
      photourlRef.current.style.outlineColor = "";
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      isValid = false;
    } else {
      emailRef.current.style.outlineColor = "";
    }

    if (password.length < 4) {
      toast.error("Password must contain at least 4 characters");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      isValid = false;
    } else {
      passwordRef.current.style.outlineColor = "";
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      repeatPasswordRef.current.focus();
      repeatPasswordRef.current.style.outlineColor = "red";
      isValid = false;
    } else {
      repeatPasswordRef.current.style.outlineColor = "";
    }

    return isValid;
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const userData = {
      name: usernameRef.current.value,
      avatar: photourlRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(JSON.stringify(error));
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          toast.error(`Error: ${data.message}`);
        } else {
          toast.success("You have successfully registered!", { duration: 700 });
          setTimeout(() => {
            navigate("/login");
          }, 700);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred during registration. Please try again.");
      });
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.left}>
        <img className={styles.img} src={RegPhoto} alt="Register" />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <img className={styles.logo} src={rLogo} alt="UI Unicorn" />
          <h2>UI Unicorn</h2>
        </div>
        <h2>Registration Page</h2>

        <form className={styles.form} onSubmit={handleRegister}>
          <input
            className={styles.input}
            type="text"
            ref={usernameRef}
            placeholder="Enter Username"
          />
          <input
            className={styles.input}
            type="email"
            ref={emailRef}
            placeholder="Enter email"
          />
          <input
            className={styles.input}
            type="url"
            ref={photourlRef}
            placeholder="Enter photoURL"
          />
          <input
            className={styles.input}
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
          <input
            className={styles.input}
            type="password"
            ref={repeatPasswordRef}
            placeholder="Repeat password"
          />

          <button type="submit" className={styles.signInButton}>
            Register
          </button>

          <button className={styles.googleButton}>
            <FcGoogle className={styles.icon} /> Or sign in with Google
          </button>
          <p className={styles.signUp}>
            Don’t have an account?
            <Link to={"/login"} style={{ fontFamily: "sans-serif" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
