// import React, { useRef } from "react";
// import rFoto from "../../assets/images/RegisterPhoto.png";
// import rLogo from "../../assets/images/RegisterSVG.svg";
// import toast, { Toaster } from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import ToggleSwitch from "../../components/ToggleSwitch";
// import styles from "./index.module.css";

// function Login() {
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   function validate() {
//     const email = emailRef.current.value;
//     if (!email.includes("@")) {
//       toast.error("Togri email kiriting", { duration: 700 });
//       emailRef.current.focus();
//       emailRef.current.style.outlineColor = "red";
//       return false;
//     }
//     const password = passwordRef.current.value;
//     if (password.length < 4) {
//       toast.error("Parol 4 ta bolishi kerak", { duration: 700 });
//       passwordRef.current.focus();
//       passwordRef.current.style.outlineColor = "red";
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
//       password: passwordRef.current.value,
//     };

//     fetch("https://api.escuelajs.co/api/v1/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(logindata),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.access_token) {
//           localStorage.setItem("user", JSON.stringify(logindata));
//           localStorage.setItem("token", JSON.stringify(data.access_token));
//           navigate("/");
//         } else {
//           console.log("Login yoki parolda xato");
//         }
//       })
//       .catch((error) => {
//         toast.error("Email yoki parolda xato.");
//         console.log(error);
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
//         <form className={styles.form} onSubmit={handleLogin}>
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
//           <ToggleSwitch /> <p className={styles.parag}>Remember me</p>{" "}
//           <Link to={"/register"}>
//             <span className={styles.spann}>Forgot password?</span>
//           </Link>
//           <button type="submit" className={styles.signInButton}>
//             Login
//           </button>
//           <Link className={styles.linkk} to="/register">
//             Register
//           </Link>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// }

// export default Login;




import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    // Sahifa yuklanganda token borligini tekshirish
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token mavjud, home page'ga yo'naltirilmoqda");
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
      toast.error("Parol kamida 4 ta belgidan iborat bo'lishi kerak", { duration: 700 });
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    console.log("Login jarayoni boshlandi");

    if (!validate()) {
      console.log("Validatsiya muvaffaqiyatsiz");
      return;
    }

    const logindata = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("Login ma'lumotlari:", logindata);

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    })
      .then((res) => {
        console.log("Server javobi:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Server ma'lumotlari:", data);
        if (data.access_token) {
          localStorage.setItem("user", JSON.stringify(logindata));
          localStorage.setItem("token", JSON.stringify(data.access_token));
          console.log("Login muvaffaqiyatli, home page'ga yo'naltirilmoqda");
          toast.success("Login muvaffaqiyatli!");
          navigate("/");
        } else {
          console.log("Login yoki parolda xato");
          toast.error("Login yoki parolda xato");
        }
      })
      .catch((error) => {
        console.error("Login xatosi:", error);
        toast.error("Serverga ulanishda xatolik yuz berdi.");
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
          <button type="submit" className={styles.signInButton}>
            Login
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