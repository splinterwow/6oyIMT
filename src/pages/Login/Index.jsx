// // Login.js
// import React, { useRef } from "react";
// import rFoto from "../../assets/images/RegisterPhoto.png";
// import rLogo from "../../assets/images/RegisterSVG.svg";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./index.module.css";

// function Login() {
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   function validate() {
//     const email = emailRef.current.value;
//     if (!email.includes('@')) {
//       alert('Togri email kiriting');
//       emailRef.current.focus();
//       emailRef.current.style.outlineColor = 'red';
//       return false;
//     }
//     const password = passwordRef.current.value;
//     if (password.length < 4) {
//       alert('Parol 4 ta bolishi kerak');
//       passwordRef.current.focus();
//       passwordRef.current.style.outlineColor = 'red';
//       return false;
//     }
//     return true;
//   }

//   function handleLogin(event) {
//     event.preventDefault();

//     if (!validate()) {
//       return;
//     }
//     const logindata = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value
//     };

//     console.log("Login data:", logindata);

//     fetch("https://api.escuelajs.co/api/v1/auth/login", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(logindata)
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(error => {
//             throw new Error(error.message || 'Xato yuz berdi');
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         // console.log("Olingan malumot:", data);
//         if (data.access_token) {
//           localStorage.setItem('user', JSON.stringify(logindata));
//           localStorage.setItem('token', JSON.stringify(data.access_token));
//           // console.log("Navigating to home page");
//           navigate('/'); 
//         } else {
//           console.log('Login yoki parolda xato');
//         }
//       })
//       .catch(error => {
//         alert('email yoki parolda xato.');
//         console.error('Xato:', error);
//       });
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.left}>
//         <img className={styles.img} src={rFoto} alt="" />
//       </div>
//       <div className={styles.right}>
//         <div className={styles.header}>
//           <img className={styles.logo} src={rLogo} alt="UI Unicorn" />
//           <h2>UI Unicorn</h2>
//         </div>
//         <h2>Nice to see you again</h2>
//         <form onSubmit={handleLogin}>
//           <label htmlFor="email">Email*</label>
//           <input
//             ref={emailRef}
//             className={styles.input}
//             type="text"
//             placeholder="Enter email"
//           />
//           <label htmlFor="password">Password*</label>
//           <input
//             ref={passwordRef}
//             className={styles.input1}
//             type="password"
//             placeholder="Enter password"
//           />
//           <button type="submit" className={styles.signInButton}>
//             Login
//           </button>
//         </form>
//         <Link className={styles.linkk} to="/register">Register</Link>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useRef, useState } from 'react';
import rFoto from '../../assets/images/RegisterPhoto.png';
import rLogo from '../../assets/images/RegisterSVG.svg';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
// import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.includes('@')) {
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    }

    if (password.length < 4) {
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    const logindata = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logindata),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('user', JSON.stringify(logindata));
          localStorage.setItem('token', JSON.stringify(data.access_token));
          navigate('/');
        } else {
          toast.error('Invalid email or password');
        }
      })
      .catch(error => {
        toast.error('An error occurred during login');
        console.error(error);
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
        <form onSubmit={handleLogin}>
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
          <button type="submit" className={styles.signInButton} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <Link className={styles.linkk} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;