import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import merc from "../../assets/images/merc.webp";
import bmw from "../../assets/images/bmw.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { Toaster, toast } from "react-hot-toast";

function Home() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const priceRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");
      setCards(savedCards);
      setIsLoading(false);
      // Xush kelibsiz xabarini ko'rsatish
      toast.success("AvtoHub sahifasiga xush kelibsiz!", {
        duration: 3000,
        icon: '👋',
      });
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cards");
    toast.success("Muvaffaqiyatli chiqish amalga oshirildi");
    navigate("/login");
  }

  function handleSave(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const year = yearRef.current.value;
    const price = priceRef.current.value;
    const color = colorRef.current.value;

    if (!name || !year || !price || !color) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
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

    toast.success("Yangi avtomobil muvaffaqiyatli qo'shildi");
  }

  function handleDelete(index) {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    toast.success("Avtomobil muvaffaqiyatli o'chirildi");
  }

  if (isLoading) {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link to={"/"}>
            <h1>AvtoHub</h1>
          </Link>
          <button onClick={handleLogout} className={styles.logout}>
            Chiqish
          </button>
        </div>
        <form onSubmit={handleSave}>
          <label htmlFor="carname">Nomi*</label>
          <input ref={nameRef} type="text" id="carname" placeholder="Avtomobil nomini kiriting" />
          <label htmlFor="caryear">Yili*</label>
          <input ref={yearRef} type="text" id="caryear" placeholder="Avtomobil yilini kiriting" />
          <label htmlFor="carprice">Narxi*</label>
          <input ref={priceRef} type="number" id="carprice" placeholder="Avtomobil narxini kiriting" />
          <label htmlFor="carcolor">Rangi*</label>
          <input ref={colorRef} type="text" id="carcolor" placeholder="Avtomobil rangini kiriting" />
          <button type="submit" className={styles.save}>SAQLASH</button>
        </form>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {card.imageUrl && <img src={card.imageUrl} alt={card.name} className={styles.cardImage} />}
              <h3>Nomi: <b style={{fontWeight: "600"}}>{card.name}</b></h3>
              <p>Yili: {card.year}</p>
              <p>Narxi: {card.price}$</p>
              <p>Rangi: {card.color}</p>
              <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
                <FaTimes className={styles.deleteIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Home;