import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import styles from "./index.module.css";
import merc from "../../assets/images/merc.webp";
import '../../i18n.js';
import bmw from "../../assets/images/bmw.webp";
import defaultCarImage from "../../assets/images/defaultimg.png"; // merc bilan bmw da boshqa avtomobillar uchun default rasm
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { Toaster, toast } from "react-hot-toast";

function Home() {
  const { t, i18n } = useTranslation();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const priceRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); 

    if (!token) {
      navigate("/login");
    } else {
      const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");
      setCards(savedCards);
      setIsLoading(false);
      toast.success(t('welcomeMessage'), {
        duration: 3000,
        icon: '👋',
      });
    }
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [navigate, t, i18n]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cards");
    toast.success(t('logoutSuccess'));
    navigate("/login");
  }

  function handleSave(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const year = yearRef.current.value;
    const price = priceRef.current.value;
    const color = colorRef.current.value;

    if (!name || !year || !price || !color) {
      toast.error(t('fillAllFields'));
      return;
    }

    let imageUrl = defaultCarImage; // Default rasm belgilandi
    if (name.toLowerCase().includes("merc")) {
      imageUrl = merc;
    } else if (name.toLowerCase().includes("bmw")) {
      imageUrl = bmw;
    }

    const newCard = { name, year, price, color, imageUrl };
    const updatedCards = [newCard, ...cards]; // Yangi kartani ro'yxat boshiga qo'shish
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    nameRef.current.value = "";
    yearRef.current.value = "";
    priceRef.current.value = "";
    colorRef.current.value = "";

    toast.success(t('carAdded'));
  }

  function handleDelete(index) {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    toast.success(t('carDeleted'));
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    toast.success(t('languageChanged')); // Til o'zgartirilgani haqida bildirishnoma
  }

  if (isLoading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link to={"/"} className={styles.logoLink}>
            <h1 className={styles.logo}>AvtoHub</h1>
          </Link>
          <div className={styles.navbarRight}>
            <select 
              onChange={(e) => changeLanguage(e.target.value)} 
              className={styles.langSelect}
              value={i18n.language}
            >
              <option value="uz">O'zbek</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
            <button onClick={handleLogout} className={styles.logout}>
              {t('logout')}
            </button>
          </div>
        </div>
        <form onSubmit={handleSave} className={styles.form}>
          <label htmlFor="carname">{t('name')}*</label>
          <input ref={nameRef} type="text" id="carname" placeholder={t('enterCarName')} />
          <label htmlFor="caryear">{t('year')}*</label>
          <input ref={yearRef} type="text" id="caryear" placeholder={t('enterCarYear')} />
          <label htmlFor="carprice">{t('price')}*</label>
          <input ref={priceRef} type="number" id="carprice" placeholder={t('enterCarPrice')} />
          <label htmlFor="carcolor">{t('color')}*</label>
          <input ref={colorRef} type="text" id="carcolor" placeholder={t('enterCarColor')} />
          <button type="submit" className={styles.save}>{t('save')}</button>
        </form>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {card.imageUrl && <img src={card.imageUrl} alt={card.name} className={styles.cardImage} />}
              <h3>{t('name')}: <b>{card.name}</b></h3>
              <p>{t('year')}: {card.year}</p>
              <p>{t('price')}: {card.price}$</p>
              <p>{t('color')}: {card.color}</p>
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
