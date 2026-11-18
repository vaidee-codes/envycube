import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { getImage } from "../../assets/images";
import usePageMeta from "../../hooks/usePageMeta";
import withLoadGifScreen from "../../hoc/withLoadGifScreen";
import styles from "./Home.module.scss";

const slides = [
  { image: "bedroom/1", alt: "Bedroom interior by Envycube Architects", to: "/works/1" },
  { image: "bedroom/5", alt: "Bedroom interior with custom wardrobe", to: "/works/1" },
  { image: "dining room/2", alt: "Dining room interior", to: "/works/5" },
  { image: "kitchen/2", alt: "Modular kitchen interior", to: "/works/4" },
  { image: "living room/5", alt: "Living room interior", to: "/works/2" },
  { image: "utility areas/4", alt: "Utility area interior", to: "/works/6" },
];

const Home = () => {
  usePageMeta({
    title: "Architecture & Interior Design in Trichy",
    description:
      "Envycube Architects, Trichy: architecture, interior design, landscape, project management and turnkey construction, with over 7 years of experience.",
    path: "/",
  });

  return (
    <div className={styles.homeContainer}>
      <Carousel
        rootClassName={styles.carouselContainer}
        className={styles.carouselSlickList}
      >
        {slides.map(({ image, alt, to }, index) => (
          <Link key={image} className={styles.link} to={to}>
            <img
              {...getImage(image)}
              alt={alt}
              // The first slide is the largest thing on screen: load it right away.
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : undefined}
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default withLoadGifScreen(Home);
