import React, { useRef, useEffect, useState } from "react";
import { getImage } from "../../assets/images";
import styles from "./Services.module.scss";

const Card = ({ imageSrc, header, description }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.card}>
      {/* Decorative: the card heading describes the service */}
      <img
        {...getImage(
          imageSrc,
          "(max-width: 700px) 90vw, (max-width: 900px) 45vw, 30vw"
        )}
        alt=""
        className={styles.cardImage}
        loading="lazy"
      />
      <div
        ref={ref}
        className={`${styles.cardContent} ${isVisible ? styles.visible : ""}`}
      >
        <h2 className={styles.cardHeader}>{header}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <div className={styles.heroSection}>
    <div className={styles.quoteContainer}>
      <h2 className={styles.quote}>
        “Crafting architectural marvels that stand the test of time. Your story
        is our canvas, let us paint it with innovation and vision.”
      </h2>
      <p className={styles.author}>— Envycube Architects</p>
    </div>
  </div>
);

const CardContainer = ({ cards }) => (
  <div className={styles.cardContainer}>
    <h1 className={styles.servicesHeading}>Services</h1>
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card
          key={card.header}
          imageSrc={card.imageSrc}
          header={card.header}
          description={card.description}
        />
      ))}
    </div>
    <HeroSection />
  </div>
);

export default CardContainer;
