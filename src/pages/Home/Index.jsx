import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import merc from "../../assets/images/merc.webp";
import bmw from "../../assets/images/bmw.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { Toaster } from "react-hot-toast";

function Home() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const nameRef = useRef("");
  const yearRef = useRef("");
  const priceRef = useRef("");
  const colorRef = useRef("");

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards"));
    if (savedCards) {
      setCards(savedCards);
    }
  }, []);

  function handleLogout() {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    navigate("/login")
    window.location.reload();
  }

  function handleSave(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const year = yearRef.current.value;
    const price = priceRef.current.value;
    const color = colorRef.current.value;

    if (!name || !year || !price || !color) {
      alert("Please fill out all fields.");
      return;
    }

    let imageUrl = "";
    if (name.toLowerCase().includes("merc")) {
      imageUrl = merc;
    } else if (name.toLowerCase().includes("bmw")) {
      imageUrl = bmw;
    }

    const newCard = { name, year, price, color, imageUrl };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    nameRef.current.value = "";
    yearRef.current.value = "";
    priceRef.current.value = "";
    colorRef.current.value = "";
  }

  function handleDelete(index) {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link to={"/"}>
            <h1>AvtoHub</h1>
          </Link>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </div>
        <form onSubmit={handleSave}>
          <label htmlFor="carname">Name*</label>
          <input ref={nameRef} type="text" id="carname" placeholder="Enter car name" />
          <label htmlFor="caryear">Year*</label>
          <input ref={yearRef} type="text" id="caryear" placeholder="Enter car year" />
          <label htmlFor="carprice">Price*</label>
          <input ref={priceRef} type="number" id="carprice" placeholder="Enter car price" />
          <label htmlFor="carcolor">Color*</label>
          <input ref={colorRef} type="text" id="carcolor" placeholder="Enter car color" />
          <button type="submit" className={styles.save}>SAVE</button>
        </form>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {card.imageUrl && <img src={card.imageUrl} alt={card.name} className={styles.cardImage} />}
              <h3>Carname: <b style={{fontWeight: "600"}}>{card.name}</b></h3>
              <p>Year: {card.year}</p>
              <p>Price: {card.price}$</p>
              <p>Color: {card.color}</p>
              <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
                <FaTimes className={styles.deleteIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Home;
