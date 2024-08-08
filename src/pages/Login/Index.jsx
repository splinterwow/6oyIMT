import React, { useRef, useState, useEffect } from "react";
import rFoto from "../../assets/images/RegisterPhoto.png";
import rLogo from "../../assets/images/RegisterSVG.svg";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ToggleSwitch from "../../components/ToggleSwitch";
import styles from "./index.module.css";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  function validate() {
    const email = emailRef.current.value;
    if (!email.includes("@")) {
      toast.error("To'g'ri email kiriting", { duration: 700 });
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }
    const password = passwordRef.current.value;
    if (password.length < 4) {
      toast.error("Parol kamida 4 ta belgidan iborat bo'lishi kerak", {
        duration: 700,
      });
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!validate()) {
    toast.error("Validatsiya muvaffaqiyatsiz", { duration: 700 });
      return;
    }

    setLoading(true);

    const logindata = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

  

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("user", JSON.stringify(logindata));
          localStorage.setItem("token", JSON.stringify(data.access_token));
          toast.success("Login muvaffaqiyatli!");
          navigate("/");
        } else {
          toast.error("Login yoki parolda xato");
        }
      })
      .catch((error) => {
        console.error("Login xatosi:", error);
        toast.error("Serverga ulanishda xatolik yuz berdi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.img} src={rFoto} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <img className={styles.logo} src={rLogo} alt="UI Unicorn" />
          <h2>UI Unicorn</h2>
        </div>
        <h2>Nice to see you again</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="email">Email*</label>
          <input
            ref={emailRef}
            className={styles.input}
            type="text"
            placeholder="Enter email"
          />
          <label htmlFor="password">Password*</label>
          <input
            ref={passwordRef}
            className={styles.input1}
            type="password"
            placeholder="Enter password"
          />
          <ToggleSwitch /> <p className={styles.parag}>Remember me</p>{" "}
          <Link to={"/forgot-password"}>
            <span className={styles.spann}>Forgot password?</span>
          </Link>
          <button
            type="submit"
            className={`${styles.signInButton} ${loading ? styles.disabled : ""}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <Link className={styles.linkk} to="/register">
            Register
          </Link>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;