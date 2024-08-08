import React, { useState } from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={styles.toggleSwitch} onClick={handleToggle}>
      <div className={`${styles.switch} ${isOn ? styles.on : ""}`}></div>
    </div>
  );
};

export default ToggleSwitch;
