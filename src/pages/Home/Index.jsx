import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link to={"/"}>
            <h1>AvtoHub</h1>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
